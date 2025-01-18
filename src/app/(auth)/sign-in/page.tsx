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


const SignInPage = () => {

  
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
      const result =  await signIn('credentials',{
          redirect: false,
          identifier: data.identifier,
          password: data.password
        })
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
    <div className="flex justify-center items-center min-h-screen bg-black">
       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                 <FormItem>
                 <FormLabel>Email</FormLabel>
                 <FormControl>
                  <Input placeholder="email"
                   {...field}
                   
                   />    
                 </FormControl>
                 </FormItem>
              )}
              />
              <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
               <FormItem>
               <FormLabel>Password</FormLabel>
               <FormControl>
                <Input placeholder="password" type="password"
                 {...field}
                 />
               </FormControl>
               <FormMessage />
               </FormItem>
               )}
               />
               
            <Button type="submit" > 
               Submit
            </Button>
          </form>  
        </Form>
        <div className="text-center mt-4">
            <p>
              Not a member? First time here{" "}
              <Link href="/sign-up" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
        </div> 
       </div>
    </div>
  )
}

export default SignInPage

