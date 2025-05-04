"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link  from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios ,{AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Lock, 
  Loader2, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle, 
  XCircle 
} from "lucide-react"


const SignUpPage = () => {

  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  //debounce - not making request to backend at every key press , reduing server load
  const debounced = useDebounceCallback(setUsername,500)
  
   //zod implementation
   const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
   })

   useEffect(() => {
    const checkUsernameUnique = async () => {
      if(username){
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
         const response = await axios.get(`/api/check-username-unique?username=${username}`)
         setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
        }
        finally{
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsernameUnique()
   },[username])


   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data)
      toast({
        title: "Success",
        description: response.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error signing up:", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message ?? "Error signing up"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
      setIsSubmitting(false)
    }
   }
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black overflow-hidden mt-10 px-2">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern z-0"></div>
      <div className="absolute top-20 -left-10 w-60 h-60 bg-mystery-700/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-mystery-500/10 rounded-full filter blur-3xl"></div>
      
      {/* Floating particles */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i} 
            className={`absolute rounded-full bg-mystery-${300 + i * 100}/20`}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10 + Math.random() * 20,
              ease: "easeInOut"
            }}
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
            }}
          ></motion.div>
        ))}
      </div> */}
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
              Join <span className="text-gradient">Mystery Message</span>
            </h1>
            <p className="text-gray-300 text-sm max-w-xs">
              Sign up to start your secret messaging adventure
            </p>
          </motion.div>
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                 <FormItem>
                 <FormLabel className="text-gray-200">Username</FormLabel>
                 <FormControl>
                 <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="Choose a unique username"
                            className="pl-10 bg-black/50 border-mystery-700/50 focus:border-mystery-500 text-white"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setUsername(e.target.value)
                            }}
                          />
                          {usernameMessage && (
                            <div className="absolute right-3 top-2.5">
                              {usernameMessage === "Username is available" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : usernameMessage !== "" ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : null}
                            </div>
                          )}
                        </div>
                 </FormControl>
                 {isCheckingUsername ? (
                        <div className="flex items-center mt-1 text-gray-400 text-xs">
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" /> Checking username...
                        </div>
                      ) : usernameMessage ? (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`text-xs mt-1 ${usernameMessage === "Username is available" ? "text-green-500" : "text-red-500"}`}
                        >
                          {usernameMessage}
                        </motion.p>
                      ) : null}
                 <FormMessage className="text-red-400"/>
                 </FormItem>
              )}
              />
              <FormField
              name="email"
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
               <FormMessage className="text-red-400"/>
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
               <FormMessage className="text-red-400"/>
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
                    disabled={isSubmitting}
                  > 
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Creating your account
                      </>
                    ) : (
                      <>
                        Create Account 
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </motion.div>
          </form>  
        </Form>
        <motion.div 
              className="text-center mt-6 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p>
                Already a member?{" "}
                <Link href="/sign-in" className="text-mystery-400 hover:text-mystery-300 transition-colors">
                  Sign in
                </Link>
              </p>
        </motion.div>
        </motion.div>
       </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage
