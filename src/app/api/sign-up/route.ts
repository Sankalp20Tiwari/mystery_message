import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { NextResponse , NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const {username,email,password} = await req.json();

        const existingUserVerifiedByUsername = await User.findOne({username,isVerified:true}); 

        if(existingUserVerifiedByUsername){
            return NextResponse.json({
                success: false,
                message: "Username is already taken",
            },{status:400});
        }

        const existingUserByEmail = await User.findOne({email});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if(existingUserByEmail){
           if(existingUserByEmail.isVerified){
            return NextResponse.json({
                success: false,
                message: "Email is already registered",
            },{status:400});
           }
           else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
            await existingUserByEmail.save();
           }
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new User({
                    username,
                    email,
                    password: hashedPassword,
                    verifyCode,
                    verifyCodeExpiry: expiryDate,
                    isVerified: false,
                    isAcceptingMessage: true,
                    messages: [],
             });
             await newUser.save();
            }

        const emailResponse = await sendVerificationEmail(email,username,verifyCode);

        if(!emailResponse.success){
            return NextResponse.json({
                success: false,
                message: emailResponse.message,
            },{status:500});
        }
        return NextResponse.json({
            success: true,
            message: "User registered successfully , please check your email for verification code",
        },{status:201});


        
    } catch (error) {
        console.error("Error registering user", error);
        return NextResponse.json({
            success: false,
            message: "Error registering user",
        },{status:500});
    }
}