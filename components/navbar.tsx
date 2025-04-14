'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Menu, X } from 'lucide-react';
import UserAccountNav from './userAccountNav';
import SignInButton from './SignInButton';

import { BrainCircuit } from "lucide-react";
import { Button } from "./ui/button";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     {
//       name: 'Home',
//       href: '/',
//     },
//     {
//       name: 'Dashboard',
//       href: '/quizzes',
//     },
//     {
//       name: 'Profile',
//       href: '/profile',
//     },
//   ];

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="z-50 sticky top-0 w-full dark:bg-zinc-950/90 bg-white/95 shadow-lg shadow-neutral-600/5 backdrop-blur-xl border-b border-primary/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <Link
//               href="/"
//               className="flex items-center space-x-2 group"
//             >
//               <Image
//                 src="/q.webp"
//                 width={35}
//                 height={35}
//                 priority={true}
//                 alt="Quizzer Logo"
//                 className="rounded-xl group-hover:scale-110 transition-transform"
//               />
//               <span className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
//                 Quizzer
//               </span>
//             </Link>
//           </div>

//           <div className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="flex items-center text-muted-foreground hover:text-foreground transition-colors group"
//               >
//                 <span className="group-hover:underline">{item.name}</span>
//               </Link>
//             ))}
//             <div className="flex items-center">
//               {session?.user ? (
//                 <UserAccountNav user={session.user} />
//               ) : (
//                 <SignInButton text="Sign In" />
//               )}
//             </div>
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? (
//                 <X className="h-6 w-6 text-destructive" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="md:hidden absolute left-0 right-0 bg-white dark:bg-zinc-950/95 backdrop-blur-lg shadow-lg">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <div className="px-3 py-2">
//                 {session?.user ? (
//                   <UserAccountNav user={session.user} />
//                 ) : (
//                   <SignInButton text="Sign In" />
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">Quizzer</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;