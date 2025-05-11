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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
  XCircle, 
  Sparkles
} from "lucide-react"

const SignUpPage = () => {
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const debounced = useDebounceCallback(setUsername, 500)

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
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data)
      toast({
        title: "Success",
        description: response.data.message
      })
      router.replace(`/verify/${username}`)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message ?? "Error signing up"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-mystery-700/50 via-black to-mystery-900/70 p-12 space-y-6 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-mystery-700 text-white px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium text-sm">Mystery Message</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white">
            Craft <span className="text-gradient">Secret Stories</span>
          </h2>
          <p className="text-gray-300 max-w-md mx-auto text-lg">
            Share messages anonymously, make connections secretly, and enjoy the thrill of mystery.
          </p>
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center px-6 py-16 relative z-10"
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="p-3 bg-mystery-700 rounded-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Create your account</h1>
            <p className="text-gray-300 text-sm max-w-xs">
              Sign up to start your secret messaging adventure
            </p>
          </motion.div>

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
                            debounced(e.target.value)
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
                    <FormMessage className="text-red-400" />
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

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
        </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage
