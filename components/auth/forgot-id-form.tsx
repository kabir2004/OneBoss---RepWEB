"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Building2, ArrowLeft, Check, AlertCircle, User } from "lucide-react"
import Link from "next/link"

export default function ForgotIdForm() {
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
              We've sent your User ID to <span className="font-medium text-gray-900">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">What happens next?</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Check your email for your User ID</li>
                    <li>• Use your User ID to sign in to your account</li>
                    <li>• If you don't see the email, check your spam folder</li>
                    <li>• Keep your User ID secure and don't share it</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleBackToSignIn}
                className="w-full bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 border border-gray-200 dark:border-[#1F1F23]"
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
                className="w-full border-gray-200 dark:border-[#1F1F23] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
              >
                Send to a different email
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-[#1F1F23]">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Forgot your User ID?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you your User ID
        </p>
      </div>

      {/* Forgot ID Form */}
      <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12] shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recover User ID</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            We'll send your User ID to your registered email address
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
              <Label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 border border-gray-200 dark:border-[#1F1F23]"
              disabled={isLoading || !email}
            >
              {isLoading ? "Sending..." : "Send User ID"}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#1F1F23]">
            <Button
              variant="ghost"
              onClick={handleBackToSignIn}
              className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-4">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Remember your User ID?{" "}
              <button
                onClick={handleBackToSignIn}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
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