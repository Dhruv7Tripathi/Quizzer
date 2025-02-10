"use client"
import { useState, useEffect } from 'react';
import {
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAccountNav from "./userAccountNav";
import SignInButton from "./SignInButton";
import Image from 'next/image';
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const { data: session } = useSession();
  return (
    <div >
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-l font-bold">
              <Link href="/" className="flex items-center">
                <Image
                  src="/q.webp"
                  alt="logo"
                  className="h-10 w-10 mr-3 rounded-full border border-gray-200"
                  height={10}
                  width={10}
                />
                <span className="text-blue-600 dark:text-blue-400">Quizzer</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/createquiz" className="text-gray-600 hover:text-blue-600 transition">
                createquiz
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">
                About
              </Link>
              <div className="mt-6 flex flex-col gap-4">
                {session?.user ? (
                  <UserAccountNav user={session.user} />
                ) : (
                  <SignInButton text={"Sign In"} />
                )}
              </div>
            </div>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ?
                <X className="h-6 w-6" /> :
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                  Home
                </Link>
                <Link href="/createquiz" className="text-gray-600 hover:text-blue-600 transition">
                  createquiz
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">
                  About
                </Link>
                <div className="mt-6 flex flex-col gap-4">
                  {session?.user ? (
                    <UserAccountNav user={session.user} />
                  ) : (
                    <SignInButton text={"Sign In"} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
