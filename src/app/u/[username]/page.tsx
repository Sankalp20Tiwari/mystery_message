'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Sparkles, Send, MessageCircle, MailPlus, Lightbulb, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [isAcceptingMessages, setIsAcceptingMessages] = useState(true);

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      if (!response.data.success) {
        if (response.data.message === 'User is not accepting message') {
          setIsAcceptingMessages(false);
        } else {
          toast({ title: response.data.message, variant: 'default' });
        }
      } else {
        toast({ title: response.data.message, variant: 'default' });
        form.reset({ ...form.getValues(), content: '' });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message ?? 'Failed to fetch messages',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 rounded max-w-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-800 shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-2 text-center flex items-center justify-center gap-2">
        <Sparkles className="text-yellow-400 w-7 h-7" /> Public Profile Link
      </h1>
      <p className="text-center text-gray-400 mb-6">
        ✨ Leave an anonymous message for <span className="font-semibold text-white">@{username}</span>.  
        Your words might just make their day!
      </p>

      {!isAcceptingMessages ? (
        <div className="text-center text-red-400 text-lg mb-4 flex items-center justify-center gap-2">
          <MailPlus className="w-5 h-5" /> User is not accepting messages right now.
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-lg">
                    <MessageCircle className="w-5 h-5 text-blue-400" /> Send Anonymous Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write something thoughtful or fun..."
                      className="resize-none text-white rounded-lg border-2 border-zinc-700 focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled className="bg-blue-500 text-white w-full md:w-auto">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !messageContent}
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send It
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}

      {/* Suggested Messages Section */}
      <div className="space-y-4 my-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-300" /> Suggested Messages
          </h2>
          <Button
            onClick={fetchSuggestedMessages}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            disabled={isSuggestLoading}
          >
            <Sparkles className="w-4 h-4" /> Get Ideas
          </Button>
        </div>
        <Card className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-inner">
          <CardContent className="flex flex-wrap gap-2 p-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="border border-gray-600 text-white hover:bg-zinc-800 transition w-full md:w-auto text-sm flex items-center gap-1"
                  onClick={() => handleMessageClick(message)}
                >
                  <Smile className="w-4 h-4 text-green-400" /> {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6 bg-gray-700" />
      <div className="text-center">
        <p className="mb-4 text-gray-400">🚀 Want your own message board?</p>
        <Link href={'/sign-up'}>
          <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold w-full md:w-auto">
            <MailPlus className="w-4 h-4 mr-1" /> Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
