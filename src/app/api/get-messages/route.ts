import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(req: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user as User;

    if (!session || !_user) {
        return Response.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(_user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } }
        ]);

        // Check if the user was found and if they have messages
        if (!user || user.length === 0 || !user[0].messages || user[0].messages.length === 0) {
            return Response.json({ success: false, message: "No messages found for this user" }, { status: 404 });
        }

        const userDoc = await UserModel.findById(userId);
        if (!userDoc || !userDoc.isAcceptingMessage) {
            return Response.json({ success: false, message: "User is not accepting messages" }, { status: 403 });
        }

        return Response.json({
            success: true,
            messages: user[0].messages
        }, { status: 200 });
    } catch (error) {
        console.log("failed to get messages", error);
        return Response.json({ success: false, message: "Failed to get messages" }, { status: 500 });
    }
}
