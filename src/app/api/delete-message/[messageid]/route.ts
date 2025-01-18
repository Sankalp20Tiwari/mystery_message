import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the params


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ messageid: string }> }) {
  // Safely access messageid from params
  //const messageid = context.params?.messageid;
  const messageid = (await params).messageid
  
  // Validate the messageid
  if (!messageid || typeof messageid !== "string") {
    return NextResponse.json(
      { error: "Invalid message ID" },
      { status: 400 }
    );
  }

  // Connect to the database
  await dbConnect();

  // Get the session of the logged-in user
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Check if the user is authenticated
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Attempt to delete the message from the user's document
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } }
    );

    // If no message was deleted, return a 404 error
    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    // Successfully deleted the message
    return NextResponse.json(
      { message: `Message ${messageid} deleted successfully` },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}









