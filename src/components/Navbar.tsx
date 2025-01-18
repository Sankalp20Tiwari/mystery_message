"use client"
import React from 'react'
import Link from 'next/link'
import { useSession  , signOut} from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'



function Navbar() {
    
    const { data : session} = useSession()
    
    const user: User = session?.user as User
    
  return (
    <nav className='p-4 md:p-6 shadow-md bg-black'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
            <a href="#" className='text-2xl text-white font-bold mb-4 md:mb-0'>Mystery Message</a>
            {
                session ? (
                    <>
                    <span className='mr-4 text-white text-2xl'> Welcome , {user?.username || user?.email}</span>
                    <Button className='w-full md:w-auto bg-white  text-black hover:bg-gray-200' onClick={() => signOut()}> Logout</Button>
                    </>
                ) :  (
                    <Link href="/sign-in">
                        <Button className='w-full md:w-auto bg-white text-black hover:bg-gray-200'> Login</Button>
                    </Link>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar
