"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Online Quiz Maker</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-1 md:space-x-4">
          <Link
            href="/quizzes"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/quizzes" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Browse
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/create"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/create"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Create
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/dashboard"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Dashboard
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-1">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
