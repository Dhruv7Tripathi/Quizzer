'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import UserAccountNav from './userAccountNav';
import SignInButton from './SignInButton';

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-10 border-b border-border shadow-sm">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center space-x-2 group">
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

        <div className="flex items-center space-x-4">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
