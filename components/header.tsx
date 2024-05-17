"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="py-4">
      <nav className="container flex items-center justify-between">
        <ul className="flex gap-6 items-center">
          <li>
            <Link
              className="text-gray-500 transition-all hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50"
              href="/"
            >
              home
            </Link>
          </li>
        </ul>
        <div className="flex items-center justify-between gap-6">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
