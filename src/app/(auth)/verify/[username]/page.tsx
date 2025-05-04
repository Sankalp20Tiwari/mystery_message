"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { verifySchema } from "@/schemas/verifySchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { ShieldCheck, KeyRound, ArrowRight } from "lucide-react"

function VerifyAccount() {
  const router = useRouter()
  const params = useParams<{ username: string }>()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    }
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponse>("/api/verify-code", {
        username: params.username,
        code: data.code
      })
      toast({
        title: "Success",
        description: response.data.message
      })
      router.replace(`/dashboard`)
    } catch (error) {
      console.error("Error verifying account:", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message ?? "Error verifying account"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black overflow-hidden mt-10 px-2">
      {/* Background elements (same as SignInPage) */}
      <div className="absolute inset-0 bg-hero-pattern z-0"></div>
      <div className="absolute top-20 -left-10 w-60 h-60 bg-mystery-700/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-mystery-500/10 rounded-full filter blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-black/40 p-8 border border-mystery-700/30 rounded-2xl shadow-xl space-y-8">
          {/* Icon & Title */}
          <motion.div
            className="flex flex-col items-center text-center space-y-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-3 bg-mystery-700 rounded-lg mb-2">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Verify Your <span className="text-gradient">Account</span>
            </h1>
            <p className="text-gray-300 text-sm max-w-xs">
              Enter the verification code we sent to your email to activate your account.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Verification Code</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder="Enter your code"
                            className="pl-10 bg-black/50 border-mystery-700/50 focus:border-mystery-500 text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-mystery-600 hover:bg-mystery-700 text-white gap-2 group py-6"
                  >
                    Verify
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyAccount
