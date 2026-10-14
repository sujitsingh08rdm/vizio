// app/not-found.tsx (or wherever you want to place it)
'use client'

import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-800 px-4">
      <div className="text-center space-y-6 max-w-md text-white animate-fade-in">
        <div className="flex justify-center">
          <Ghost className="w-16 h-16 text-white/90 drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-white/80 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-white text-indigo-700 hover:bg-white/90 transition rounded-2xl shadow-xl">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
