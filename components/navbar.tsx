'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navItems } from '@/contants';
import AnchorNav from './anchor-nav';
import { useSession } from 'next-auth/react';
import UserAccountNav from './userAccountNav';
import SignInButton from './SignInButton';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="z-50 sticky top-0 w-full dark:bg-zinc-950/10 bg-white/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border-b border-primary/10 px-4 lg:px-8
">
      <div className="max-w-[88rem] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className='flex items-center space-x-12'>
            <Link href="/" className="flex items-center space-x-1">
              <Image src="/q.webp" width={30} height={30} priority={false} alt="Logo" unoptimized={true} className="rounded-xl" />
              <span className="text-2xl font-bold">Quizzer</span>
            </Link>

            <div
              className="hidden lg:flex items-center space-x-6 p-4 fixed right-0">
              {navItems.map((item) => (
                <AnchorNav
                  key={item.name + item.href}
                  activeClassName="text-black dark:text-white font-semibold"
                  absolute
                  href={item.href}
                >
                  {item.name}
                </AnchorNav>
              ))}
              <div className="hidden lg:flex items-center space-x-6">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text={"Sign In"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;