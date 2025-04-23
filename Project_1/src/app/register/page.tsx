// app/register/page.tsx or pages/register.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const { name, email, password, confirmPassword } = formData

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields")
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            setLoading(false)
            return
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Registration failed")
            } else {
                router.push("/login")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
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
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Create an account</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign up to get started</p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/30">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 text-sm shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-purple-600 focus:ring focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                                I agree to the{" "}
                                <a href="#" className="font-medium text-purple-600 hover:underline">Terms of Service</a>{" "}
                                and{" "}
                                <a href="#" className="font-medium text-purple-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-purple-600 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}