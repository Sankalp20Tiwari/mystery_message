import { NextResponse , NextRequest } from "next/server";
import  dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import {z} from 'zod'
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username :usernameValidation
})

export async function GET(req: NextRequest) {
    
    //legacy code nextjs
 
    // if(req.method !== 'GET'){
    //     return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 })
    // }
    await dbConnect();
    try {
      const { searchParams} = new URL(req.url)
      const queryParam = {
        username: searchParams.get('username')
      }

      //validate with zod
      const result = UsernameQuerySchema.safeParse(queryParam)
      console.log(result) //todo : remove this

      if (!result.success) {
        const usernameErrors = result.error.format().username?._errors || [];
        return NextResponse.json({ 
            success: false,
            message: usernameErrors?.length >0
                     ? usernameErrors.join(', ')
                     : "Invalid query parameters"}, { status: 400 }) 
      }

      const {username} = result.data
       
       const existingVerifiedUser = await User.findOne({username , isVerified: true})

       if(existingVerifiedUser){
        return NextResponse.json({ success: false, message: "Username is already taken" }, { status: 400 })
       }

       return NextResponse.json({ success: true, message: "Username is available" }, { status: 200 })
          
     


    } catch (error) {
        console.log("Error checking username", error)
        return NextResponse.json({ success: false, message: "Error checking username" }, { status: 500 })
    }
} 