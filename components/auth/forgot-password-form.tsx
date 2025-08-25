"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Building2, ArrowLeft, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 2000)
  }

  const handleBackToSignIn = () => {
    window.location.href = "/signin"
  }

  if (isSuccess) {
    return (
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gray-900">
              <Building2 className="h-6 w-6 text-gray-50" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">OneBoss</h1>
          </div>
        </div>

        {/* Success Card */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-gray-600">
              We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">What happens next?</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Click the link in your email to reset your password</li>
                    <li>• The link will expire in 24 hours for security</li>
                    <li>• If you don't see the email, check your spam folder</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleBackToSignIn}
                className="w-full bg-gray-900 text-gray-50 hover:bg-gray-800 border border-gray-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  setEmail("")
                }}
                className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Send to a different email
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                Still having trouble? Contact your system administrator
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gray-900 dark:bg-gray-50">
            <Building2 className="h-6 w-6 text-gray-50 dark:text-gray-900" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">OneBoss</h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Reset your password</h2>
        <p className="text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      {/* Forgot Password Form */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-gray-900">Forgot Password</CardTitle>
          <CardDescription className="text-gray-600">
            We'll send you a secure link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-200 bg-white text-gray-900 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gray-900 text-gray-50 hover:bg-gray-800 border border-gray-200"
              disabled={isLoading || !email}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#1F1F23]">
            <Button
              variant="ghost"
              onClick={handleBackToSignIn}
              className="w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-4">
            <p className="text-xs text-center text-gray-500">
              Remember your password?{" "}
              <button
                onClick={handleBackToSignIn}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 