"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Briefcase, MessageSquare, Settings, Bell, DollarSign, Loader2 } from "lucide-react"
import { RouteGuard } from "@/components/auth/route-guard"
import { UserSidebar } from "@/components/user/user-sidebar"
import { UserNotifications } from "@/components/user/user-notifications"
import { EventCard } from "@/components/events/event-card"
import { useSelector } from "react-redux"
import { type RootState } from "@/lib/store"
import { useGetEventsQuery } from "@/lib/api/eventsApi"
import { useGetMyPaymentsQuery } from "@/lib/api/paymentsApi"
import { format } from "date-fns"
import Link from "next/link"

function DashboardContent() {
  const { user } = useSelector((state: RootState) => state.auth)

  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
  } = useGetEventsQuery({ page: 1, limit: 6, upcoming: true })

  const {
    data: paymentsData,
    isLoading: paymentsLoading,
    error: paymentsError,
  } = useGetMyPaymentsQuery({ page: 1, limit: 5 })

  const events = eventsData?.data || []
  const payments = paymentsData?.data || []
  const completedPayments = payments.filter((p) => p.status === "completed")
  const pendingPayments = payments.filter(
    (p) => p.status === "pending" || p.status === "processing",
  )
  const upcomingCount = events.length

  const formatCurrency = (amount: number, currency = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <UserSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                        Welcome back, {user?.firstName}!
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Here&apos;s what&apos;s happening in your alumni network
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingCount}</div>
                  <p className="text-xs text-muted-foreground">available to join</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium">My Payments</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedPayments.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {pendingPayments.length} pending · {paymentsData?.total ?? payments.length} total
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">—</div>
                  <p className="text-xs text-muted-foreground">
                    <Link href="/jobs" className="underline">Browse jobs</Link>
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">—</div>
                  <p className="text-xs text-muted-foreground">coming soon</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full max-w-2xl grid-cols-5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-lg">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="jobs">Job Board</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <UserNotifications />

                  <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Recent Payments</CardTitle>
                        <CardDescription>Your latest transactions</CardDescription>
                      </div>
                      <p className="text-xs text-muted-foreground">See Payments tab</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {paymentsLoading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading payments...
                        </div>
                      ) : paymentsError ? (
                        <p className="text-sm text-destructive">Could not load payments.</p>
                      ) : payments.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No payments yet.</p>
                      ) : (
                        payments.slice(0, 3).map((payment) => (
                          <div key={payment._id} className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {payment.purpose || payment.type || "Payment"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {payment.createdAt &&
                                  format(new Date(payment.createdAt), "MMM d, yyyy")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">
                                {formatCurrency(payment.amount, payment.currency)}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Events you can register for</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/events">View all</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {eventsLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading events...
                      </div>
                    ) : eventsError ? (
                      <p className="text-sm text-destructive">Could not load events.</p>
                    ) : events.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No upcoming events right now.</p>
                    ) : (
                      events.slice(0, 3).map((event) => (
                        <div key={event._id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date?.start &&
                                format(new Date(event.date.start), "MMM d, yyyy · h:mm a")}
                            </p>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                {eventsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : eventsError ? (
                  <Card>
                    <CardContent className="py-8 text-center text-destructive">
                      Failed to load events. Please try again later.
                    </CardContent>
                  </Card>
                ) : events.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No upcoming events available.
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                      <EventCard key={event._id} event={event} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="payments">
                <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Your donations, memberships, and event fees</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {paymentsLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading payments...
                      </div>
                    ) : paymentsError ? (
                      <p className="text-sm text-destructive">Could not load payments.</p>
                    ) : payments.length === 0 ? (
                      <p className="text-muted-foreground">No payments yet.</p>
                    ) : (
                      payments.map((payment) => (
                        <div
                          key={payment._id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {payment.purpose || payment.type || "Payment"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {payment.paymentMethod} ·{" "}
                              {payment.createdAt &&
                                format(new Date(payment.createdAt), "MMM d, yyyy h:mm a")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {formatCurrency(payment.amount, payment.currency)}
                            </p>
                            <Badge variant="secondary">{payment.status}</Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connections">
                <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Your Network</CardTitle>
                    <CardDescription>Connect with fellow alumni</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Connections content coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jobs">
                <Card className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Job Opportunities</CardTitle>
                    <CardDescription>Find your next career opportunity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/jobs">Browse job board</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <RouteGuard>
      <DashboardContent />
    </RouteGuard>
  )
}
