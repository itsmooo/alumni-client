"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Download, BarChart3, Activity, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FinancialDashboardProps {
  data?: {
    totalRevenue?: number
    recentRevenue?: number
    monthlyRevenue?: Array<{ month: string; revenue: number; transactions: number }>
    byType?: Record<string, number>
    averageTransaction?: number
    refundRate?: number
  }
}

export function FinancialDashboard({ data }: FinancialDashboardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  // Use provided data with fallbacks
  const stats = {
    totalRevenue: data?.totalRevenue || 0,
    recentRevenue: data?.recentRevenue || 0,
    averageTransaction: data?.averageTransaction || 0,
    refundRate: data?.refundRate || 0,
    totalTransactions: Math.floor((data?.totalRevenue || 0) / Math.max(data?.averageTransaction || 1, 1)),
  }

  const financialCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      change: formatCurrency(stats.recentRevenue),
      changeLabel: "this month",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-600",
      changeColor: "text-green-600",
      description: "Total revenue generated",
      trend: "up"
    },
    {
      title: "Total Transactions",
      value: stats.totalTransactions.toLocaleString(),
      change: "Active",
      changeLabel: "transactions",
      icon: CreditCard,
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      changeColor: "text-slate-600",
      description: "Payment transactions processed",
      trend: "up"
    },
    {
      title: "Average Transaction",
      value: formatCurrency(stats.averageTransaction),
      change: "Per transaction",
      changeLabel: "average",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-600",
      changeColor: "text-slate-600",
      description: "Average transaction value",
      trend: "neutral"
    },
    {
      title: "Refund Rate",
      value: `${stats.refundRate.toFixed(1)}%`,
      change: "Of total",
      changeLabel: "transactions",
      icon: TrendingDown,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
      changeColor: "text-red-600",
      description: "Refund rate percentage",
      trend: "down"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Clean Header */}
      <Card className="border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Financial Dashboard
                </CardTitle>
                <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
                  Revenue analytics and payment insights
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <Button variant="outline" className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Clean Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {financialCards.map((card, index) => (
          <Card key={index} className="group relative overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:shadow-md">
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-lg ${card.iconBg} flex items-center justify-center transition-colors duration-200`}>
                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {card.value}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                <span className={card.changeColor}>
                  {card.trend === "up" && <TrendingUp className="inline h-3 w-3 mr-1" />}
                  {card.trend === "down" && <TrendingDown className="inline h-3 w-3 mr-1" />}
                  {card.change}
                </span> {card.changeLabel}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clean Financial Overview */}
      <Card className="border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                  Financial Overview
                </CardTitle>
                <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
                  Key financial metrics and insights
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              <Target className="h-3 w-3 mr-1" />
              Analytics
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {data?.monthlyRevenue && data.monthlyRevenue.length > 0 ? (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {formatCurrency(stats.totalRevenue)}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Total Revenue</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 uppercase tracking-wider font-medium">All time earnings</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stats.totalTransactions.toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Transactions</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 uppercase tracking-wider font-medium">Total processed</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {formatCurrency(stats.averageTransaction)}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">Average Amount</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 uppercase tracking-wider font-medium">Per transaction</p>
                </div>
              </div>
              
              {/* Additional Metrics */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Monthly Growth</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Revenue increase</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        +{formatCurrency(stats.recentRevenue)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">This month</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Refund Rate</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Return percentage</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {stats.refundRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Of transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">
                No Financial Data Available
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Financial data will be displayed here when available from your backend.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 