"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="container mx-auto px-4">
        {/* Grid container */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & info */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/ww.png"
                  width={30}
                  height={30}
                  alt="Logo"
                  className="rounded-xl"
                  unoptimized
                />
                <span className="text-xl font-extrabold text-white">Quizzer</span>
              </Link>
            </div>
            <p className="text-sm mt-2">
              Building in public at
              <a
                className="text-green-400 pl-1 font-medium"
                target="__blank"
                href="https://github.com/dhruv7tripathi"
              >
                @dhruv7tripathi
              </a>
            </p>
          </div>

          {/* All sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:col-span-3">
            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-300 hover:text-green-500">Home</Link></li>
                <li><Link href="/quizzes" className="text-gray-300 hover:text-green-500">Dashboard</Link></li>
                <li><Link href="/createquiz" className="text-gray-300 hover:text-green-500">Create Quiz</Link></li>
                <li><Link href="/profile" className="text-gray-300 hover:text-green-500">Profile</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Social</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/dhruv-tripathi"
                    target="_blank"
                    className="flex items-center space-x-2 text-gray-300 hover:text-green-500"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.76..." /></svg>
                    <span>LinkedIn</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/DhruvTripathi77"
                    target="_blank"
                    className="flex items-center space-x-2 text-gray-300 hover:text-green-500"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.55..." /></svg>
                    <span>Twitter</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Dhruv7Tripathi"
                    target="_blank"
                    className="flex items-center space-x-2 text-gray-300 hover:text-green-500"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.62..." /></svg>
                    <span>GitHub</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Others */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Others</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-300 hover:text-green-500">About Us</Link></li>
                <li><Link href="/privacypolicy" className="text-gray-300 hover:text-green-500">Privacy Policy</Link></li>
                <li><Link href="/termsandcondition" className="text-gray-300 hover:text-green-500">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 border-t border-green-500 pt-4 text-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Quizzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
