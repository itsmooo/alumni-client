"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  Users,
  Calendar,
  Megaphone,
  Briefcase,
  Settings,
  CreditCard,
  Shield,
  LogOut,
  Menu,
  Home,
  Database,
  UserCheck,
  TrendingUp,
  Mail,
  ChevronRight,
  Crown,
} from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/store"
import { logout } from "@/lib/slices/authSlice"
import { UserForm } from "@/components/admin/user-form"
import { Badge } from "@/components/ui/badge"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: SidebarItem[]
  isAction?: boolean
  gradient?: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart3,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
    gradient: "from-green-500 to-emerald-600",
    children: [
      {
        title: "All Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Create User",
        href: "/admin/users?addUser=1",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Event Management",
    href: "/admin/events",
    icon: Calendar,
    gradient: "from-orange-500 to-red-600",
    children: [
      {
        title: "All Events",
        href: "/admin/events",
        icon: Calendar,
      },
      {
        title: "Create Event",
        href: "/admin/events?addEvent=1",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Announcements",
    href: "/admin/announcements",
    icon: Megaphone,
    gradient: "from-purple-500 to-pink-600",
    children: [
      {
        title: "All Announcements",
        href: "/admin/announcements",
        icon: Megaphone,
      },
      {
        title: "Create Announcement",
        href: "/admin/announcements/create",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "Job Management",
    href: "/admin/jobs",
    icon: Briefcase,
    gradient: "from-indigo-500 to-blue-600",
    children: [
      {
        title: "All Jobs",
        href: "/admin/jobs",
        icon: Briefcase,
      },
      {
        title: "Create Job",
        href: "/admin/jobs?addJob=1",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Send Email",
    href: "/admin/send-email",
    icon: Mail,
    gradient: "from-rose-500 to-pink-600",
  },

]

interface AdminSidebarProps {
  className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800">
      {/* Clean Header */}
      <div className="flex h-20 items-center border-b border-slate-100 dark:border-slate-800 px-6 bg-white dark:bg-slate-950">
        <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
          <div 
            className="h-12 w-12 rounded-full overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/mogadishu-university-logo.png')" }}
            aria-hidden="true"
          />
          <div>
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Admin Panel
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Control Center</p>
          </div>
        </Link>
      </div>


      {/* Enhanced Navigation */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-6">
          {sidebarItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between h-12 group relative transition-all duration-200",
                    pathname.startsWith(item.href) 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-semibold" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                  onClick={() => toggleExpanded(item.href)}
                >
                  {pathname.startsWith(item.href) && (
                    <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                  )}
                  <div className="flex items-center">
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-200",
                      pathname.startsWith(item.href) 
                        ? "bg-blue-100 dark:bg-blue-900/40" 
                        : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                    )}>
                      <item.icon className={cn(
                        "h-4 w-4 transition-all duration-200",
                        pathname.startsWith(item.href) 
                          ? "text-blue-700 dark:text-blue-400" 
                          : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                      )} />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    expandedItems.includes(item.href) && "rotate-90"
                  )} />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 group relative transition-all duration-200",
                    pathname === item.href 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-semibold" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                  asChild
                >
                  <Link href={item.href} className="flex items-center w-full">
                    {pathname === item.href && (
                      <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300",
                      pathname === item.href 
                        ? "bg-white/20" 
                        : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                    )}>
                      <item.icon className={cn(
                        "h-4 w-4 transition-all duration-300",
                        pathname === item.href 
                          ? "text-white" 
                          : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                      )} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )}

              {/* Enhanced Submenu */}
              {item.children && expandedItems.includes(item.href) && (
                <div className="ml-4 mt-2 space-y-1 pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                  {item.children.map((child) => (
                    child.isAction ? (
                      <Button
                        key={child.title}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <child.icon className="mr-3 h-4 w-4" />
                        <span className="text-sm">{child.title}</span>
                      </Button>
                    ) : (
                      <Button
                        key={child.href}
                        variant={pathname === child.href ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "w-full justify-start h-10 transition-all duration-200",
                          pathname === child.href 
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" 
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                        asChild
                      >
                        <Link href={child.href}>
                          <child.icon className="mr-3 h-4 w-4" />
                          <span className="text-sm">{child.title}</span>
                        </Link>
                      </Button>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Enhanced Footer */}
      <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-4 bg-white dark:bg-slate-950">
        <div className="flex items-center px-2 space-x-3">
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold truncate">
              {user?.role}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block w-72", className)}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40 shadow-lg">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
} 