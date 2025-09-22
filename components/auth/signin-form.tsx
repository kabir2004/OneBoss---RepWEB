"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User, Building2 } from "lucide-react"


export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, redirect to dashboard
      window.location.href = "/dashboard"
    }, 1000)
  }

  const handleForgotPassword = () => {
    window.location.href = "/forgot-password"
  }

  const handleForgotId = () => {
    window.location.href = "/forgot-id"
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-card-foreground">OneBoss</h1>
        </div>
        <h2 className="text-xl font-semibold text-card-foreground">Sign in to your account</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your dashboard
        </p>
      </div>



      {/* Sign In Form */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-card-foreground">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your user ID and password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* User ID Field */}
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-sm font-medium text-card-foreground">
                User ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground0" />
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your user ID"
                  className="pl-10 border-gray-200 bg-white text-card-foreground placeholder:text-primary-foreground0"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground0" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 border-gray-200 bg-white text-card-foreground placeholder:text-primary-foreground0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground0 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-gray-800 border border-gray-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Forgot Password and ID Links */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleForgotPassword}
                className="text-sm text-muted-foreground hover:text-card-foreground hover:bg-gray-50"
              >
                Forgot your password?
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleForgotId}
                className="text-sm text-muted-foreground hover:text-card-foreground hover:bg-gray-50"
              >
                Forgot your ID?
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-primary-foreground0">
              Need help? Contact your system administrator
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 