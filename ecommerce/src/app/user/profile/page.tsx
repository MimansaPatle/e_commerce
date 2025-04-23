"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Mail, MapPin, Phone, User } from "lucide-react"

export default function ProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    bio: "Passionate about technology and design. Avid online shopper with a keen eye for quality products.",
    avatar: "/placeholder.svg?height=200&width=200",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...user })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <div className="card p-6 md:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full bg-primary/10">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-lg">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" />
              {user.email}
            </div>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <Phone className="mr-2 h-4 w-4" />
              {user.phone}
            </div>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="text-center">{user.address}</span>
            </div>
            <div className="mt-6 w-full">
              <button className="btn-primary w-full" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details / Edit Form */}
        <div className="card p-6 md:col-span-2">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <div className="space-y-4">
                <div className="form-item">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="input-field"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="input-field"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-item">
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className="input-field"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      setFormData({ ...user })
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-primary" />
                <h2 className="ml-2 text-xl font-bold">About Me</h2>
              </div>
              <p className="mt-4 text-muted-foreground">{user.bio}</p>

              <div className="mt-8">
                <h3 className="text-lg font-medium">Account Information</h3>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p>{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p>{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium">Account Statistics</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-center">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Orders</p>
                  </div>
                  <div className="rounded-lg bg-secondary/10 p-3 text-center">
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-muted-foreground">Wishlist</p>
                  </div>
                  <div className="rounded-lg bg-accent/10 p-3 text-center">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3 text-center">
                    <p className="text-2xl font-bold">$1,248</p>
                    <p className="text-sm text-muted-foreground">Spent</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
