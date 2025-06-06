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
const parseStringMessages = (messageString: string): string[] => messageString.split(specialChar);

const initialMessageString =
  "What's a secret talent you have?||If you could time travel, where would you go?||What's your biggest mystery about life?||What book or movie changed your life?||What's a dream you've never told anyone?||What inspires you to keep going?||What's something you're curious about but never asked?||What song feels like it understands you?||What's a risk you wish you took?||If you could meet your future self, what would you ask?";

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

  const form = useForm<z.infer<typeof messageSchema>>({ resolver: zodResolver(messageSchema) });
  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => form.setValue('content', message);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', { ...data, username });

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
    <div className="container mx-auto my-10 p-8 max-w-3xl rounded-3xl backdrop-blur-sm bg-gradient-to-br from-zinc-900 via-black to-zinc-900/80 border border-zinc-700 shadow-[0_0_40px_rgba(0,0,0,0.6)] text-white animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-3 text-center flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        <Sparkles className="w-7 h-7" /> Public Profile Link
      </h1>
      <p className="text-center text-gray-400 mb-8 text-lg">
        ✨ Leave an anonymous message for <span className="font-semibold text-white">@{username}</span>.<br />Your words might just make their day!
      </p>

      {!isAcceptingMessages ? (
        <div className="text-center text-red-400 text-lg mb-4 flex items-center justify-center gap-2 animate-pulse">
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
                  <FormLabel className="flex items-center gap-2 text-lg text-purple-400">
                    <MessageCircle className="w-5 h-5" /> Send Anonymous Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write something mysterious or heartfelt..."
                      className="resize-none text-white rounded-xl border-2 border-zinc-700 focus:ring-2 focus:ring-purple-500 bg-zinc-800/60 backdrop-blur-sm placeholder-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled className="bg-purple-600 text-white w-full md:w-auto">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !messageContent}
                  className="bg-purple-600 hover:bg-purple-700 transition shadow-lg shadow-purple-500/30 text-white w-full md:w-auto flex items-center gap-2 rounded-full px-6 py-2"
                >
                  <Send className="w-4 h-4" /> Send It
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}

      {/* Suggested Messages */}
      <div className="space-y-4 my-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-yellow-300">
            <Lightbulb className="w-6 h-6" /> Suggested Messages
          </h2>
          <Button
            onClick={fetchSuggestedMessages}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center gap-2 rounded-full px-4 py-2"
            disabled={isSuggestLoading}
          >
            <Sparkles className="w-4 h-4" /> Get Ideas
          </Button>
        </div>
        <Card className="bg-zinc-800/60 border border-zinc-700 rounded-2xl shadow-inner backdrop-blur-md">
          <CardContent className="flex flex-wrap gap-2 p-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="border border-zinc-600 text-white hover:bg-zinc-800 transition rounded-full px-4 py-1 text-sm flex items-center gap-1 backdrop-blur-sm bg-zinc-900/40"
                  onClick={() => handleMessageClick(message)}
                >
                  <Smile className="w-4 h-4 text-green-400" /> {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 bg-gray-700" />
      <div className="text-center">
        <p className="mb-4 text-gray-400">🚀 Want your own mysterious message board?</p>
        <Link href={'/sign-up'}>
          <Button className="bg-gradient-to-r from-mystery-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-black font-semibold rounded-full px-6 py-2">
            <MailPlus className="w-4 h-4 mr-1" /> Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
