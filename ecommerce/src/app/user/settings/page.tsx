"use client"

import type React from "react"

import { useState } from "react"
import { Bell, CreditCard, Eye, EyeOff, Lock, Moon, Shield, Sun } from "lucide-react"

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [settings, setSettings] = useState({
    theme: "light",
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      promotions: true,
      newProducts: false,
    },
    privacy: {
      shareData: false,
      savePaymentInfo: true,
      twoFactorAuth: false,
    },
  })

  const handleThemeChange = (theme: string) => {
    setSettings((prev) => ({ ...prev, theme }))
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }))
  }

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [name]: checked,
      },
    }))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Appearance */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <Sun className="h-5 w-5 text-primary" />
              <h2 className="card-title ml-2">Appearance</h2>
            </div>
            <p className="card-description">Customize how the app looks</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div>
                <label className="form-label">Theme</label>
                <div className="mt-2 flex space-x-2">
                  <button
                    className={`flex items-center justify-center rounded-md border p-3 ${
                      settings.theme === "light" ? "border-primary bg-primary/10" : "border-input"
                    }`}
                    onClick={() => handleThemeChange("light")}
                  >
                    <Sun className="h-5 w-5" />
                    <span className="ml-2">Light</span>
                  </button>
                  <button
                    className={`flex items-center justify-center rounded-md border p-3 ${
                      settings.theme === "dark" ? "border-primary bg-primary/10" : "border-input"
                    }`}
                    onClick={() => handleThemeChange("dark")}
                  >
                    <Moon className="h-5 w-5" />
                    <span className="ml-2">Dark</span>
                  </button>
                  <button
                    className={`flex items-center justify-center rounded-md border p-3 ${
                      settings.theme === "system" ? "border-primary bg-primary/10" : "border-input"
                    }`}
                    onClick={() => handleThemeChange("system")}
                  >
                    <span>System</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="card-title ml-2">Notifications</h2>
            </div>
            <p className="card-description">Manage your notification preferences</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="email-notifications" className="form-label">
                    Email Notifications
                  </label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  id="email-notifications"
                  name="email"
                  checked={settings.notifications.email}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="push-notifications" className="form-label">
                    Push Notifications
                  </label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <input
                  type="checkbox"
                  id="push-notifications"
                  name="push"
                  checked={settings.notifications.push}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="sms-notifications" className="form-label">
                    SMS Notifications
                  </label>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                </div>
                <input
                  type="checkbox"
                  id="sms-notifications"
                  name="sms"
                  checked={settings.notifications.sms}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Notification Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="order-updates" className="text-sm">
                      Order Updates
                    </label>
                    <input
                      type="checkbox"
                      id="order-updates"
                      name="orderUpdates"
                      checked={settings.notifications.orderUpdates}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="promotions" className="text-sm">
                      Promotions & Discounts
                    </label>
                    <input
                      type="checkbox"
                      id="promotions"
                      name="promotions"
                      checked={settings.notifications.promotions}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="new-products" className="text-sm">
                      New Product Announcements
                    </label>
                    <input
                      type="checkbox"
                      id="new-products"
                      name="newProducts"
                      checked={settings.notifications.newProducts}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="card-title ml-2">Privacy & Security</h2>
            </div>
            <p className="card-description">Manage your privacy and security settings</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="share-data" className="form-label">
                    Share Usage Data
                  </label>
                  <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
                </div>
                <input
                  type="checkbox"
                  id="share-data"
                  name="shareData"
                  checked={settings.privacy.shareData}
                  onChange={handlePrivacyChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="save-payment" className="form-label">
                    Save Payment Information
                  </label>
                  <p className="text-sm text-muted-foreground">Securely save payment methods for faster checkout</p>
                </div>
                <input
                  type="checkbox"
                  id="save-payment"
                  name="savePaymentInfo"
                  checked={settings.privacy.savePaymentInfo}
                  onChange={handlePrivacyChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="two-factor" className="form-label">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <input
                  type="checkbox"
                  id="two-factor"
                  name="twoFactorAuth"
                  checked={settings.privacy.twoFactorAuth}
                  onChange={handlePrivacyChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-primary" />
              <h2 className="card-title ml-2">Payment Methods</h2>
            </div>
            <p className="card-description">Manage your payment methods</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="badge badge-outline mr-2">Default</span>
                    <button className="text-sm text-primary hover:underline">Edit</button>
                  </div>
                </div>
              </div>
              <button className="btn-outline w-full">Add Payment Method</button>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="card md:col-span-2">
          <div className="card-header">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="card-title ml-2">Change Password</h2>
            </div>
            <p className="card-description">Update your password</p>
          </div>
          <div className="card-content">
            <form className="space-y-4">
              <div className="form-item">
                <label htmlFor="current-password" className="form-label">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    className="input-field pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="new-password" className="form-label">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    className="input-field pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className="input-field pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
