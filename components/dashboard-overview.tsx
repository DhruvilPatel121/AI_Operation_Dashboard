"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap, AlertTriangle, CheckCircle, MapPin } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const energyData = [
  { time: "00:00", consumption: 120 },
  { time: "04:00", consumption: 80 },
  { time: "08:00", consumption: 200 },
  { time: "12:00", consumption: 250 },
  { time: "16:00", consumption: 280 },
  { time: "20:00", consumption: 320 },
  { time: "24:00", consumption: 180 },
]

const siteData = [
  { site: "Site A", uptime: 98.5, devices: 45 },
  { site: "Site B", uptime: 99.2, devices: 32 },
  { site: "Site C", uptime: 97.8, devices: 28 },
  { site: "Site D", uptime: 99.8, devices: 52 },
]

export function DashboardOverview() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Installations</CardTitle>
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">157</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Energy Consumption</CardTitle>
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">2,847 kWh</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5.2%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">System Uptime</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.3%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 high priority, 1 medium</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Energy Consumption (24h)</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Real-time energy usage across all installations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Site Performance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Uptime percentage by installation site</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={siteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="site" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="uptime" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Recent Alerts</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Latest system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {[
                { type: "high", message: "Power spike detected at Site C - Lamp #23", time: "2 min ago" },
                { type: "medium", message: "Scheduled maintenance due for Site A", time: "15 min ago" },
                { type: "low", message: "Energy efficiency improved by 3%", time: "1 hour ago" },
              ].map((alert, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      alert.type === "high" ? "bg-red-500" : alert.type === "medium" ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">System Health</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Overall system performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span>CPU Usage</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span>Memory Usage</span>
                  <span>62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span>Network Load</span>
                  <span>28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span>Storage Usage</span>
                  <span>73%</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
