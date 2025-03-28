'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Menu, X } from 'lucide-react';
import UserAccountNav from './userAccountNav';
import SignInButton from './SignInButton';

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      // icon: <Home className="h-6 w-6" />,
    },
    {
      name: 'Dashboard',
      href: '/quizzes',
      // icon: <PlusCircle className="h-6 w-6" />,
    },
    {
      name: 'Profile',
      href: '/profile',
      // icon: <Info className="h-6 w-6" />,
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="z-50 sticky top-0 w-full dark:bg-zinc-950/90 bg-white/95 shadow-lg shadow-neutral-600/5 backdrop-blur-xl border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 group"
            >
              <Image
                src="/q.webp"
                width={35}
                height={35}
                priority={true}
                alt="Quizzer Logo"
                className="rounded-xl group-hover:scale-110 transition-transform"
              />
              <span className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                Quizzer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors group"
              >
                {/* {item.icon} */}
                <span className="group-hover:underline">{item.name}</span>
              </Link>
            ))}

            {/* <Link
              href="https://github.com/Dhruv7Tripathi/Quizzer"
              target="_blank"
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
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
                className="group-hover:rotate-6 transition-transform"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span className="group-hover:underline">Star on GitHub</span>
            </Link> */}

            <div className="flex items-center">
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton text="Sign In" />
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-destructive" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-zinc-950/95 backdrop-blur-lg shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  {/* {item.icon} */}
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text="Sign In" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { useSession } from 'next-auth/react';
// import UserAccountNav from './userAccountNav';
// import SignInButton from './SignInButton';
// export default function LandingPage() {
//   const { data: session } = useSession();
//   return (
//     <div>
//       <header className="border-b bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center">
//               <Link href="/" className="flex items-center">
//                 <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//                   Quizzer
//                 </span>
//               </Link>
//             </div>
//             <nav className="hidden md:flex items-center space-x-4">
//               <Link
//                 href="/quizzes"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 Quizzes
//               </Link>
//               <Link
//                 href="/create"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 CreateQuiz
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 About
//               </Link>
//             </nav>
//             <div className="flex items-center space-x-4">
//               <Link
//                 href="/signin"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 Sign In

//               </Link>
//               <Button asChild>
//                 <Link href="/quizzes">Get Started</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }
