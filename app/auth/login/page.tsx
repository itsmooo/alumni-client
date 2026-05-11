"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { type RootState } from "@/lib/store"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect authenticated users based on role
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (user.role === "moderator") {
        router.push("/moderator/dashboard")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, user, router])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading while redirecting
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Redirecting...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_40%),_radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.05),_transparent_40%)] bg-slate-50 p-4 dark:bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_40%),_radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.08),_transparent_40%)] dark:bg-slate-950">
      <div className="absolute inset-0 bg-grid-slate-200/[0.05] dark:bg-grid-slate-700/[0.08] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl justify-end pb-2">
        {mounted && (
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-300/70 bg-white/80 p-1 text-sm shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`rounded-full px-3 py-1.5 transition ${
                theme === "light"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`rounded-full px-3 py-1.5 transition ${
                theme === "dark"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              Dark
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-2rem)] items-center justify-center">
        <div className="grid w-full max-w-5xl items-center gap-12 rounded-[2.5rem] border border-white/60 bg-white/40 p-6 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] backdrop-blur-2xl dark:border-slate-700/50 dark:bg-slate-900/35 dark:shadow-[0_32px_128px_-16px_rgba(2,6,23,0.75)] md:grid-cols-2 md:p-16">
          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left space-y-6">
            <div
              className="h-40 w-40 bg-contain bg-center bg-no-repeat md:h-56 md:w-56 drop-shadow-2xl rounded-full overflow-hidden bg-white dark:bg-slate-100"
              style={{ backgroundImage: "url('/mogadishu-university-logo.png')" }}
              aria-hidden="true"
            />
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
                Alumni <span className="text-blue-600">Network</span>
              </h1>
              <p className="max-w-sm text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Reignite connections, collaborate on new ventures, and grow within your elite community.
              </p>
            </div>
          </div>

          <div className="w-full max-w-sm justify-self-center md:justify-self-end">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Welcome back</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium italic">Please sign in to your account</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
