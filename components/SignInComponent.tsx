'use client'

import { signIn } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { MdPostAdd } from 'react-icons/md';
import { BiCustomize } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

export default function SignInPage() {
  return (

    <div className='min-h screen'>
      <div className="flex min-h-screen bg-background">
        <div className="hidden md:flex md:w-1/2 bg-emerald-600 items-center justify-center p-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Create Impactful Posts</h1>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-white">
                <MdPostAdd className="h-8 w-8" />
                <span className="text-xl">Generate engaging content</span>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <BiCustomize className="h-8 w-8" />
                <span className="text-xl">Customize tone & style</span>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <FaUsers className="h-8 w-8" />
                <span className="text-xl">Enhance your online presence</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div>

              <Image src="/q.webp" width={500} height={500} alt="logo" className='h-12 w-12' />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">See what&apos;s happening</h2>
              <p className="mt-2 text-sm text-muted-foreground">Join SnipAI today.</p>
            </div>
            <div className="space-y-4">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 w-full"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
              >
                Create Account
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted">
                  </span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-foreground border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 w-full"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
              >
                Sign in
              </button>
            </div>
            <p className="text-sm text-muted-foreground text-center">By signing up, you agree to the <Link className='underline' href="/termsofservice">Terms of Service</Link> and <Link className='underline' href="/privacypolicy">Privacy Policy.</Link></p>
          </div>
        </div>
      </div>
    </div>

  )
}