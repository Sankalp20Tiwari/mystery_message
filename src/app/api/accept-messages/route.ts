import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(req: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user : User =session?.user as User

    if(!session || !session.user) {
        return Response.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const userId = user._id;
    const {acceptingMessage} = await req.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId ,
            { isAcceptingMessage: acceptingMessage },
            { new: true });

        if (!updatedUser) {
            return Response.json({ success: false, message: "User not found" }, { status: 401 })
        }

        return Response.json({ success: true, message: "User status accepting message updated successfully" ,updatedUser}, { status: 200 })    
    } catch (error) {
        console.log("failed to update user status accepting message",error)
        return Response.json({ success: false, message: "Failed to update user status accepting message" }, { status: 500 })
    }



}

export async function GET(req: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user : User =session?.user as User

    if(!session || !session.user) {
        return Response.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);
    
        if (!foundUser) {
            return Response.json({ success: false, message: "User not found" }, { status: 401 })
        }
    
        return Response.json({ 
             success: true, 
             isAcceptingMessage: foundUser.isAcceptingMessage, }, 
             { status: 200 })
    } catch (error) {
        console.log("failed to get user status accepting message",error)
        return Response.json({ success: false, message: "Failed to get user status accepting message" }, { status: 500 })
    }
}


