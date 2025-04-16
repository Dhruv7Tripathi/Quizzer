'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Menu, X } from 'lucide-react';
import UserAccountNav from '../auth/userAccountNav';
import SignInButton from '../auth/SignInButton';
const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="z-50 sticky top-0 w-full bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border-b border-primary/10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 group"
            >
              <Image
                src="/ww.png"
                width={35}
                height={35}
                priority={true}
                alt="Quizzer Logo"
                className="rounded-xl group-hover:scale-110 transition-transform"
              />
              <span className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                Quizzer
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
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
