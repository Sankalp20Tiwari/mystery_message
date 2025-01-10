import { NextResponse , NextRequest } from "next/server";
import  dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import { decode } from "punycode";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const {username, code }= await req.json();
        const decodedUsername = decodeURIComponent(username)
        
        const user = await User.findOne({ username: decodedUsername });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();
            return NextResponse.json({ success: true, message: "User verified successfully" }, { status: 200 })
        }
        else if (!isCodeValid) {
            return NextResponse.json({ success: false, message: "Invalid verification code" }, { status: 400 })
        }
        else if (!isCodeNotExpired) {
            return NextResponse.json({ success: false, message: "Verification code has expired Please sign up again to get a new code" }, { status: 400 })
        }
    } catch (error) {
        console.log("Error verifying user", error)
        return NextResponse.json({ success: false, message: "Error verifying user" }, { status: 500 })
    }
}
