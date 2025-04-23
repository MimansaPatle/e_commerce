"use client"

import type React from "react"

import { useState, Suspense } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingBag, Home, ShoppingCart, Heart, User, Settings, LogOut, Menu, X, Bell, Search } from "lucide-react"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: "Dashboard", href: "/user/dashboard", icon: Home },
    { name: "Orders", href: "/user/orders", icon: ShoppingCart },
    { name: "Wishlist", href: "/user/wishlist", icon: Heart },
    { name: "Profile", href: "/user/profile", icon: User },
    { name: "Settings", href: "/user/settings", icon: Settings },
  ]

  const handleLogout = () => {
    // Clear user session or token (if applicable)
    // Example: localStorage.removeItem("authToken")

    // Redirect to the login page
    router.push("/login")
  }

  return (
    
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center lg:hidden">
              <button
                className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-end">
              <div className="mr-4 hidden w-full max-w-xs lg:block">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input type="text" placeholder="Search products..." className="input-field w-full pl-10" />
                </div>
              </div>

              <div className="flex items-center">
                <button className="relative rounded-full p-1 text-muted-foreground hover:bg-muted">
                  <Bell className="h-6 w-6" />
                  <span className="absolute right-0 top-0 flex h-2 w-2 rounded-full bg-secondary"></span>
                </button>

                <div className="ml-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">MP</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-foreground">Mimansa P</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
