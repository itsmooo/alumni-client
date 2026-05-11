"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useLoginMutation } from "@/lib/api/authApi"
import { setAuthFromStorage } from "@/lib/slices/authSlice"
import { type RootState } from "@/lib/store"

export function LoginForm() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading, error }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter()
  
  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (user.role === "moderator") {
        router.push("/moderator/dashboard")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await login({ identifier, password }).unwrap()
      
      // Save to localStorage
      localStorage.setItem("token", result.token)
      localStorage.setItem("user", JSON.stringify(result.user))
      
      // Update Redux store
      dispatch(setAuthFromStorage({ user: result.user, token: result.token }))

      // Redirect based on user role
      if (result.user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (result.user.role === "moderator") {
        router.push("/moderator/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      // Error is handled by RTK Query
      console.error("Login failed:", err)
    }
  }

  // Show loading state if already authenticated (redirecting)
  if (isAuthenticated) {
    return (
      <div>
        <Card className="w-full max-w-md mx-auto border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-slate-900/75">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span className="text-gray-600 dark:text-slate-300">Redirecting...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-white/40 bg-white/40 p-1 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/35">
        <div className="rounded-[14px] bg-white/60 p-6 dark:bg-slate-900/65 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div>
                <Alert variant="destructive" className="border-red-200 bg-red-50/50 backdrop-blur-sm dark:border-red-900/50 dark:bg-red-950/40">
                  <AlertDescription className="text-red-700">
                    {typeof error === "string" ? error : "Login failed. Please try again."}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="identifier" className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email or phone
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600 dark:text-slate-500" />
                </div>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="you@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="h-12 w-full rounded-xl border-slate-200 bg-white pl-11 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Password
                </Label>
                <button type="button" className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600 dark:text-slate-500" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border-slate-200 bg-white pl-11 pr-11 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            <div className="pt-2">
              <p className="text-center text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Authorized Access Only
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
