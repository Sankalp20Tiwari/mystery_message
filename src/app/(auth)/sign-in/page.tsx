"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link  from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"
import { MessageSquare, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"


const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  
  const { toast } = useToast()
  const router = useRouter()
  
  
   //zod implementation
   const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    }
   })

   
    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
      console.log('Submitted credentials:', data);
      const result =  await signIn('credentials',{
          redirect: false,
          identifier: data.identifier,
          password: data.password
        })
        console.log('Identifier:', data.identifier);
        console.log('Password:', data.password);
      if(result?.error){
        toast({
          title: "Log In failed",
          description: "Incorrect email or password",
          variant: "destructive"
        })
      }
      if(result?.url){
        router.replace("/dashboard")
      }

    }
  
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black overflow-hidden mt-10 px-2">
      {/* Background elements */}
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
          {/* Logo & Title */}
          <motion.div 
            className="flex flex-col items-center text-center space-y-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-3 bg-mystery-700 rounded-lg mb-2">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Welcome to <span className="text-gradient">Mystery Message</span>
            </h1>
            <p className="text-gray-300 text-sm max-w-xs">
              Sign in to continue your secret conversations
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
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                {/* Password Field */}
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
                            className="pl-10 bg-black/50 border-mystery-700/50 focus:border-mystery-500 text-white"
                            {...field}
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-mystery-600 hover:bg-mystery-700 text-white gap-2 group py-6"
                  > 
                    Sign In
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </form>  
            </Form>
            
            {/* Sign up link */}
            <motion.div 
              className="text-center mt-6 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p>
                Not a member? First time here{" "}
                <Link href="/sign-up" className="text-mystery-400 hover:text-mystery-300 transition-colors">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignInPage