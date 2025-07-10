"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, MapPin, TrendingUp, Eye } from "lucide-react"

const anomalies = [
  {
    id: "ANM_001",
    type: "power_spike",
    severity: "high",
    location: "Site C - Lamp #23",
    metric: "Power Draw",
    value: 320,
    threshold: 280,
    timestamp: "2024-01-15 14:23:45",
    description: "Sudden power consumption increase detected",
    suggestedAction: "Inspect lamp for potential electrical issues",
    status: "active",
  },
  {
    id: "ANM_002",
    type: "temperature_high",
    severity: "medium",
    location: "Site A - Building 2",
    metric: "Temperature",
    value: 32.5,
    threshold: 30.0,
    timestamp: "2024-01-15 14:18:12",
    description: "Operating temperature above normal range",
    suggestedAction: "Check ventilation and cooling systems",
    status: "investigating",
  },
  {
    id: "ANM_003",
    type: "efficiency_drop",
    severity: "low",
    location: "Site B - Entrance",
    metric: "Luminosity",
    value: 720,
    threshold: 800,
    timestamp: "2024-01-15 13:45:30",
    description: "Light output below expected levels",
    suggestedAction: "Schedule cleaning or lamp replacement",
    status: "resolved",
  },
  {
    id: "ANM_004",
    type: "voltage_fluctuation",
    severity: "high",
    location: "Site D - Parking Area",
    metric: "Voltage",
    value: 195,
    threshold: 210,
    timestamp: "2024-01-15 13:30:15",
    description: "Voltage drop detected in electrical supply",
    suggestedAction: "Contact electrical maintenance team immediately",
    status: "active",
  },
]

export function AnomalyDetection() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const filteredAnomalies = anomalies.filter((anomaly) => {
    if (filter === "all") return true
    if (filter === "active") return anomaly.status === "active"
    if (filter === "resolved") return anomaly.status === "resolved"
    return anomaly.severity === filter
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive"
      case "investigating":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">2</p>
                <p className="text-xs sm:text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">1</p>
                <p className="text-xs sm:text-sm text-gray-600">Medium Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">1</p>
                <p className="text-xs sm:text-sm text-gray-600">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">95.2%</p>
                <p className="text-xs sm:text-sm text-gray-600">Detection Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs sm:text-sm">
            Active
          </TabsTrigger>
          <TabsTrigger value="high" className="text-xs sm:text-sm">
            High
          </TabsTrigger>
          <TabsTrigger value="resolved" className="text-xs sm:text-sm">
            Resolved
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {/* Anomaly List */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Detected Anomalies</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Real-time anomaly detection with AI-powered analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {filteredAnomalies.map((anomaly) => (
                    <div
                      key={anomaly.id}
                      className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedAnomaly === anomaly.id ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedAnomaly(anomaly.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={getSeverityColor(anomaly.severity)}>{anomaly.severity.toUpperCase()}</Badge>
                          <Badge variant={getStatusColor(anomaly.status)}>{anomaly.status}</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>

                      <h4 className="font-semibold mb-1 text-sm sm:text-base">{anomaly.description}</h4>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{anomaly.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(anomaly.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm">
                        <span className="font-medium">{anomaly.metric}:</span>
                        <span
                          className={`ml-1 ${anomaly.value > anomaly.threshold ? "text-red-600" : "text-blue-600"}`}
                        >
                          {anomaly.value}{" "}
                          {anomaly.metric === "Temperature"
                            ? "°C"
                            : anomaly.metric === "Power Draw"
                              ? "W"
                              : anomaly.metric === "Voltage"
                                ? "V"
                                : "lux"}
                        </span>
                        <span className="text-gray-500 ml-1">(threshold: {anomaly.threshold})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Anomaly Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Anomaly Details</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {selectedAnomaly ? "Detailed analysis and recommended actions" : "Select an anomaly to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAnomaly ? (
                  (() => {
                    const anomaly = anomalies.find((a) => a.id === selectedAnomaly)
                    if (!anomaly) return null

                    return (
                      <div className="space-y-4">
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle className="text-sm sm:text-base">Anomaly ID: {anomaly.id}</AlertTitle>
                          <AlertDescription className="text-xs sm:text-sm">{anomaly.description}</AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Location</h4>
                            <p className="text-xs sm:text-sm text-gray-600">{anomaly.location}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-sm sm:text-base">Detected At</h4>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {new Date(anomaly.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">Metric Analysis</h4>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs sm:text-sm font-medium">{anomaly.metric}</span>
                              <Badge className={getSeverityColor(anomaly.severity)}>{anomaly.severity}</Badge>
                            </div>
                            <div className="text-xl sm:text-2xl font-bold mb-1">
                              {anomaly.value}
                              <span className="text-sm font-normal text-gray-500 ml-1">
                                {anomaly.metric === "Temperature"
                                  ? "°C"
                                  : anomaly.metric === "Power Draw"
                                    ? "W"
                                    : anomaly.metric === "Voltage"
                                      ? "V"
                                      : "lux"}
                              </span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              Threshold: {anomaly.threshold} | Deviation:{" "}
                              {Math.abs(anomaly.value - anomaly.threshold).toFixed(1)}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">Recommended Action</h4>
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-xs sm:text-sm">
                              {anomaly.suggestedAction}
                            </AlertDescription>
                          </Alert>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Button size="sm" className="text-xs">
                            Mark as Investigating
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs bg-transparent">
                            Create Ticket
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs bg-transparent">
                            Acknowledge
                          </Button>
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <AlertTriangle className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-xs sm:text-sm">Select an anomaly from the list to view detailed analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
