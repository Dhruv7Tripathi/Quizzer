"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Footer = () => {
  const [stars, setStars] = useState(0)

  useEffect(() => {
    const fetchGitHubStars = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/Dhruv7Tripathi/Quizzer'
        )
        const data = await response.json()
        setStars(data.stargazers_count)
      } catch (error) {
        console.error('Failed to fetch GitHub stars', error)
      }
    }

    fetchGitHubStars()
  }, [])

  return (
    <div className='bg-white'>
      <footer className="bg-muted py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="font-semibold text-lg">Quizzer</h3>
                <Link
                  href="https://github.com/Dhruv7Tripathi/QuizMaster"
                  target="_blank"
                  className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>Star On GitHub</span>
                  <span className="bg-gray-200 px-1.5 rounded-md">{stars}</span>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Create, share, and analyze interactive quizzes for education and engagement.
              </p>
            </div>

            {/* Features Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/quizzes" className="text-muted-foreground hover:text-foreground transition-colors">
                    Quizzes
                  </Link>
                </li>
                <li>
                  <Link href="/createquiz" className="text-muted-foreground hover:text-foreground transition-colors">
                    Create Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Social</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/dhruv-tripathi"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/DhruvTripathi77"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    <span>Twitter</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Dhruv7Tripathi"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Others Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Others</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacypolicy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/termsandcondition" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} QuizMaster. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <Link
                href="https://github.com/Dhruv7Tripathi/Quizzer"
                target="_blank"
                className="text-sm font-medium hover:text-foreground transition-colors"
              >
                QuizMaster
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
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