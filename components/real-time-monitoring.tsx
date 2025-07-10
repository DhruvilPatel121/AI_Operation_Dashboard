"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, Thermometer, Zap, Lightbulb, RefreshCw } from "lucide-react"

export function RealTimeMonitoring() {
  const [isLive, setIsLive] = useState(true)
  const [data, setData] = useState([
    { time: "10:00", power: 245, temperature: 24, luminosity: 850, voltage: 220 },
    { time: "10:05", power: 252, temperature: 24.5, luminosity: 860, voltage: 218 },
    { time: "10:10", power: 248, temperature: 25, luminosity: 855, voltage: 222 },
    { time: "10:15", power: 255, temperature: 25.2, luminosity: 870, voltage: 219 },
    { time: "10:20", power: 250, temperature: 24.8, luminosity: 865, voltage: 221 },
  ])

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`

      setData((prev) => {
        const newData = [
          ...prev.slice(-4),
          {
            time: timeStr,
            power: 240 + Math.random() * 30,
            temperature: 24 + Math.random() * 3,
            luminosity: 840 + Math.random() * 40,
            voltage: 215 + Math.random() * 10,
          },
        ]
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const sensorData = [
    {
      id: "LAMP_001",
      location: "Site A - Building 1",
      status: "online",
      power: 248,
      temperature: 24.5,
      luminosity: 865,
      voltage: 220,
      lastUpdate: "2 sec ago",
    },
    {
      id: "LAMP_002",
      location: "Site A - Building 2",
      status: "online",
      power: 252,
      temperature: 25.1,
      luminosity: 870,
      voltage: 218,
      lastUpdate: "1 sec ago",
    },
    {
      id: "LAMP_003",
      location: "Site B - Entrance",
      status: "warning",
      power: 285,
      temperature: 27.2,
      luminosity: 820,
      voltage: 215,
      lastUpdate: "3 sec ago",
    },
    {
      id: "LAMP_004",
      location: "Site C - Parking",
      status: "offline",
      power: 0,
      temperature: 22.1,
      luminosity: 0,
      voltage: 0,
      lastUpdate: "5 min ago",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-base sm:text-lg">Real-Time Data Ingestion</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Live IoT sensor feeds from all installations
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isLive ? "default" : "secondary"} className="flex items-center space-x-1">
                <Activity className="h-3 w-3" />
                <span>{isLive ? "Live" : "Paused"}</span>
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {isLive ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Live Charts */}
      <Tabs defaultValue="power" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="power" className="text-xs sm:text-sm">
            Power
          </TabsTrigger>
          <TabsTrigger value="temperature" className="text-xs sm:text-sm">
            Temp
          </TabsTrigger>
          <TabsTrigger value="luminosity" className="text-xs sm:text-sm">
            Light
          </TabsTrigger>
          <TabsTrigger value="voltage" className="text-xs sm:text-sm">
            Voltage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="power">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Power Consumption (Watts)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="power" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Thermometer className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Temperature (°C)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="luminosity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Luminosity (Lux)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="luminosity"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voltage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Voltage (V)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="voltage" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sensor Status Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Connected Sensors</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Real-time status of all IoT devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-3">
                {sensorData.map((sensor) => (
                  <div key={sensor.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold">{sensor.id}</span>
                      <Badge
                        variant={
                          sensor.status === "online"
                            ? "default"
                            : sensor.status === "warning"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {sensor.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{sensor.location}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Power: {sensor.power.toFixed(1)}W</div>
                      <div>Temp: {sensor.temperature.toFixed(1)}°C</div>
                      <div>Lux: {sensor.luminosity}</div>
                      <div>Voltage: {sensor.voltage}V</div>
                    </div>
                    <p className="text-xs text-gray-500">{sensor.lastUpdate}</p>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="hidden sm:table w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-xs sm:text-sm">Device ID</th>
                    <th className="text-left p-2 text-xs sm:text-sm">Location</th>
                    <th className="text-left p-2 text-xs sm:text-sm">Status</th>
                    <th className="text-left p-2 text-xs sm:text-sm">Power (W)</th>
                    <th className="text-left p-2 text-xs sm:text-sm">Temp (°C)</th>
                    <th className="text-left p-2 text-xs sm:text-sm">Lux</th>
                    <th className="text-left p-2 text-xs sm:text-sm">Voltage (V)</th>
                    <th className="text-left p-2 text-xs sm:text-sm">Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map((sensor) => (
                    <tr key={sensor.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-mono text-xs sm:text-sm">{sensor.id}</td>
                      <td className="p-2 text-xs sm:text-sm">{sensor.location}</td>
                      <td className="p-2">
                        <Badge
                          variant={
                            sensor.status === "online"
                              ? "default"
                              : sensor.status === "warning"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {sensor.status}
                        </Badge>
                      </td>
                      <td className="p-2 text-xs sm:text-sm">{sensor.power.toFixed(1)}</td>
                      <td className="p-2 text-xs sm:text-sm">{sensor.temperature.toFixed(1)}</td>
                      <td className="p-2 text-xs sm:text-sm">{sensor.luminosity}</td>
                      <td className="p-2 text-xs sm:text-sm">{sensor.voltage}</td>
                      <td className="p-2 text-xs text-gray-500">{sensor.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
