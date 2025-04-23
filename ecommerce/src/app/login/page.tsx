"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        const user = data.user

        // Redirect based on user email or role
        if (user.email === "admin@example.com") {
          router.push("/admin/dashboard")
        } else {
          router.push("/user/dashboard")
        }
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4 dark:from-gray-900 dark:to-black">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-purple-600" />
          <h1 className="ml-2 text-3xl font-bold text-gray-900 dark:text-white">Luxe Market</h1>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 text-sm shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-purple-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>Demo credentials:</p>
          <p>User: user@example.com / user123</p>
          <p>Admin: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  )
}
