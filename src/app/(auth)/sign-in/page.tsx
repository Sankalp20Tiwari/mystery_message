"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { MessageSquare, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    setLoading(false);

    if (result?.error) {
      toast({
        title: "Log In failed",
        description: "Incorrect email or password",
        variant: "destructive",
      });
    } else if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="relative grid min-h-screen grid-cols-1 md:grid-cols-2 bg-black text-white overflow-hidden ">

      <div className="absolute top-24 -left-32 w-96 h-96 bg-mystery-700/30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-mystery-500/20 rounded-full filter blur-3xl z-0" />


      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative hidden md:flex flex-col justify-center items-center text-center p-12  space-y-8 z-10"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold leading-tight "
          whileHover={{ scale: 1.05 }}
        >
          Unlock <span className="text-gradient">Secrets</span><br /> Connect Anonymously
        </motion.h2>
        <p className="text-gray-300 text-lg max-w-md">
          Dive into encrypted conversations. Share your thoughts freely. Your privacy, reimagined.
        </p>
        <motion.div
          whileHover={{ scale: 1.15, rotate: 4 }}
          className="p-4 rounded-full bg-mystery-700/40 border border-mystery-600/50 backdrop-blur-lg transition-all"
        >
          <MessageSquare className="w-12 h-12 text-mystery-400 animate-pulse" />
        </motion.div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center items-center p-6 sm:p-12"
      >
        <div className="w-full max-w-md backdrop-blur-2xl bg-black/40 p-8 rounded-3xl border border-mystery-700/30 shadow-2xl space-y-8 z-10">

          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-3 bg-mystery-700 rounded-lg mb-2 animate-pulse">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              Welcome to <span className="text-gradient">Mystery Message</span>
            </h1>
            <p className="text-gray-400 text-sm">Sign in to continue your secret conversations</p>
          </div>


          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="your@email.com"
                          className="pl-10 bg-black/50 border-mystery-700/50 focus:border-mystery-500 text-white"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 bg-black/50 border-mystery-700/50 focus:border-mystery-500 text-white"
                          autoComplete="current-password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-mystery-500 rounded"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-mystery-600 hover:bg-mystery-700 text-white gap-2 group py-6 transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2 animate-pulse">
                      Signing In...
                    </span>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <div className="text-center text-gray-400 text-sm">
            Not a member?{" "}
            <Link href="/sign-up" className="text-mystery-400 hover:text-mystery-300 underline underline-offset-4 transition-all">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
