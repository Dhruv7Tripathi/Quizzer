"use client"
import Link from 'next/link'
import React from 'react'

const Footer = () => {

  return (
    // <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-black">
    //   <div className="max-w-[87rem] mx-auto text-sm px-4 text-gray-400 flex sm:flex-row flex-col justify-between items-start ">
    //     <div>
    //       <div className="mb-4 flex">
    //         <Link href="/" className="flex items-center space-x-1">
    //           <Image src="/q.webp" width={30} height={30} priority={false} alt="Logo" unoptimized={true} className="rounded-xl" />
    //           <span className="text-2xl font-extrabold text-black dark:text-white ">Quizzer</span>
    //         </Link>
    //       </div>
    //       <div className="mt-2">
    //         Building in public at
    //         <a className="dark:text-emerald-500 pl-1 font-medium text-neutral-600" target="__blank" href="https://github.com/dhruv7tripathi">@dhruv7tripathi</a>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
    //       <div className="flex justify-center space-y-4 flex-col mt-4">
    //         <Link href='/'>
    //           <p className="hover:text-foreground/80 text-foreground/60">Home</p>
    //         </Link>
    //         <Link href='/quizzes'>
    //           <p className="hover:text-foreground/80 text-foreground/60">quizzes</p>
    //         </Link>
    //         <Link href='/'>
    //           <p className="hover:text-foreground/80 text-foreground/60">Contact</p>
    //         </Link>
    //         <Link href='/about'>
    //           <p className="hover:text-foreground/80 text-foreground/60">About</p>
    //         </Link>
    //         <Link href='/profile'>
    //           <p className="hover:text-foreground/80 text-foreground/60">profile</p>
    //         </Link>
    //       </div>
    //       <div className="flex justify-center space-y-4 flex-col mt-4">
    //         <Link href='https://twitter.com/dhruvtripathi' target="_blank">
    //           <p className="hover:text-foreground/80 text-foreground/60">Twitter</p>
    //         </Link>
    //         <Link href='https://www.linkedin.com/in/dhruv-tripathi' target='_blank'>
    //           <p className="hover:text-foreground/80 text-foreground/60">LinkedIn</p>
    //         </Link>
    //       </div>
    //       <div className="flex justify-center space-y-4 flex-col mt-4">
    //         <p className="hover:text-foreground/80 text-foreground/60"><a href='/termsandcondition' target='_blank'>Terms of Service</a></p>
    //         <p className="hover:text-foreground/80 text-foreground/60"><a href='/privacypolicy' target='_blank'>Privacy Policy</a></p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='bg-white'>
      <footer className="bg-muted py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">QuizMaster</h3>
              <p className="text-sm text-muted-foreground">
                Create, share, and analyze interactive quizzes for education and engagement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/quizzes" className="text-muted-foreground hover:text-foreground transition-colors">
                    quizzes
                  </Link>
                </li>
                <li>
                  <Link href="/createquiz" className="text-muted-foreground hover:text-foreground transition-colors">
                    createquiz
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                    profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Social</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/https://www.linkedin.com/in/dhruv-tripathi" className="text-muted-foreground hover:text-foreground transition-colors">
                    Linkdin
                  </Link>
                </li>
                <li>
                  <Link href="/https://x.com/DhruvTripathi77" className="text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/https://github.com/Dhruv7Tripathi" className="text-muted-foreground hover:text-foreground transition-colors">
                    Github
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} QuizMaster. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer