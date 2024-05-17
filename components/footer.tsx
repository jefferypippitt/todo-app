"use client";

import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  LinktreeLogo,
  SnapchatLogo,
  TiktokLogo,
  TwitchLogo,
  XLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="container">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <GithubLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <XLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <FacebookLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <TwitchLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <TiktokLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <InstagramLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <LinkedinLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <SnapchatLogo size={24} />
        </Link>
        <Link
          href="#"
          rel="noopener noreferrer"
          className="mx-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
        >
          <LinktreeLogo size={24} />
        </Link>
      </div>
    </footer>
  );
}
