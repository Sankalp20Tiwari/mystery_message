"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { CalendarDays, MessageSquareText, Trash2 } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import dayjs from "dayjs";


type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCards = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
    });
    onMessageDelete(message._id as string);
  };

  return (
    <Card className="relative border border-gray-800 bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white shadow-lg transition-transform hover:scale-[1.015] hover:shadow-xl rounded-2xl">


      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold">
            <MessageSquareText className="h-5 w-5 text-blue-400 animate-pulse" />
            <span>{message.content}</span>
          </CardTitle>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="h-8 w-8 p-0 hover:scale-110 transition-transform"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border border-gray-700 text-white rounded-xl shadow-2xl">
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-red-500">
                    Are you absolutely sure?
                </AlertDialogTitle>

                <p className="text-gray-300 text-sm mt-2">
                    This action <span className="text-red-400 font-medium">cannot be undone</span>.  
                    Your message will be permanently deleted from the board.
                </p>
                </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-500 text-white"
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <CardDescription className="flex items-center gap-1 text-sm text-gray-400 mt-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </CardDescription>
      </CardHeader>

    </Card>
  );
};

export default MessageCards;
