import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";





export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                identifier: { label: "Identifier", type: "text", placeholder: "email or username" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any): Promise<any> {
                await dbConnect();
                try {
                    const user = await User.findOne({$or:[
                        {email:credentials.identifier},
                        {username:credentials.identifier}
                    ]});
                    if(!user){
                        throw new Error("User not found");
                    }
                    if(!user.isVerified){
                        throw new Error("User is not verified");
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password,user.password);
                    //console.log('Password:', credentials.password);
                    //console.log('Stored Password Hash:', user.password);
                    if(!isPasswordValid){
                        console.error('Invalid password');
                        throw new Error("Invalid password");
                    }
                    return user;

                } catch (error:any) {
                    throw new Error(error)
                }
              }
        })
    ],
    callbacks:{

        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
            }
            return token
          },

        async session({ session,  token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.username = token.username
            }
            return session
          },
          
    },
    pages:{
        signIn:"/sign-in",

    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}