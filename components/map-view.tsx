"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Zap, AlertTriangle, CheckCircle, Eye, Download, Filter } from "lucide-react"

const installations = [
  {
    id: "SITE_A",
    name: "Site A - Corporate Campus",
    coordinates: { lat: 41.0082, lng: 28.9784 },
    status: "online",
    devices: 45,
    energyConsumption: 2847,
    uptime: 99.2,
    alerts: 0,
    lastMaintenance: "2024-01-10",
  },
  {
    id: "SITE_B",
    name: "Site B - Manufacturing Plant",
    coordinates: { lat: 41.0122, lng: 28.9834 },
    status: "warning",
    devices: 32,
    energyConsumption: 3245,
    uptime: 97.8,
    alerts: 2,
    lastMaintenance: "2024-01-08",
  },
  {
    id: "SITE_C",
    name: "Site C - Warehouse Complex",
    coordinates: { lat: 41.0052, lng: 28.9734 },
    status: "critical",
    devices: 28,
    energyConsumption: 1923,
    uptime: 94.5,
    alerts: 3,
    lastMaintenance: "2024-01-12",
  },
  {
    id: "SITE_D",
    name: "Site D - Retail Center",
    coordinates: { lat: 41.0142, lng: 28.9884 },
    status: "online",
    devices: 52,
    energyConsumption: 4156,
    uptime: 99.8,
    alerts: 0,
    lastMaintenance: "2024-01-09",
  },
]

export function MapView() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return "default"
      case "warning":
        return "destructive"
      case "critical":
        return "destructive"
      case "offline":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const filteredInstallations = installations.filter((site) => {
    if (filter === "all") return true
    return site.status === filter
  })

  const handleExportMap = () => {
    console.log("Exporting map data")
    alert("Map data exported successfully")
  }

  const handleViewDetails = (siteId: string) => {
    console.log(`Viewing details for ${siteId}`)
    alert(`Opening detailed view for ${siteId}`)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geographic Installation Map</h1>
          <p className="text-gray-600">Real-time status and monitoring of all lighting installations</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" onClick={handleExportMap}>
            <Download className="h-4 w-4 mr-2" />
            Export Map
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Map Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-base sm:text-lg">Installation Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Interactive map with real-time status indicators
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList className="grid grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="all" className="text-xs">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="online" className="text-xs">
                    Online
                  </TabsTrigger>
                  <TabsTrigger value="warning" className="text-xs">
                    Warning
                  </TabsTrigger>
                  <TabsTrigger value="critical" className="text-xs">
                    Critical
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Map Visualization */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Installation Locations</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Interactive map with real-time status indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simulated Map View */}
              <div className="relative bg-gray-100 rounded-lg h-64 sm:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  {/* Map Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Installation Markers */}
                  {filteredInstallations.map((site, index) => (
                    <div
                      key={site.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 ${
                        selectedSite === site.id ? "scale-125 z-10" : ""
                      }`}
                      style={{
                        left: `${20 + index * 20}%`,
                        top: `${30 + index * 15}%`,
                      }}
                      onClick={() => setSelectedSite(site.id)}
                    >
                      <div className="relative">
                        <div
                          className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full ${getStatusColor(site.status)} border-2 border-white shadow-lg`}
                        />
                        {site.alerts > 0 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{site.alerts}</span>
                          </div>
                        )}
                        <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                          {site.name.split(" - ")[1]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                  <h4 className="text-xs sm:text-sm font-semibold mb-2">Status Legend</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Online</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Warning</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Critical</span>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button size="sm" variant="outline" className="bg-white">
                    +
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white">
                    -
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Site Details */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Site Details</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {selectedSite ? "Detailed information for selected site" : "Click on a site marker to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSite ? (
                (() => {
                  const site = installations.find((s) => s.id === selectedSite)
                  if (!site) return null

                  return (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold">{site.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge variant={getStatusBadge(site.status)}>{site.status.toUpperCase()}</Badge>
                          {site.alerts > 0 && (
                            <Badge variant="destructive">
                              {site.alerts} Alert{site.alerts > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <span className="text-xs sm:text-sm font-medium">Devices</span>
                          </div>
                          <p className="text-lg sm:text-xl font-bold">{site.devices}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                            <span className="text-xs sm:text-sm font-medium">Energy</span>
                          </div>
                          <p className="text-lg sm:text-xl font-bold">{site.energyConsumption}</p>
                          <p className="text-xs text-gray-500">kWh</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                          <span className="text-xs sm:text-sm font-medium">Uptime</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold">{site.uptime}%</p>
                        <p className="text-xs text-gray-500">Last 30 days</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">Recent Activity</h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span>Last Maintenance:</span>
                            <span className="text-gray-600">{site.lastMaintenance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Coordinates:</span>
                            <span className="text-gray-600">
                              {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button size="sm" className="flex-1 text-xs" onClick={() => handleViewDetails(site.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })()
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MapPin className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-xs sm:text-sm">Select a site from the map to view detailed information</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Site List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">All Installations</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Quick overview of all sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredInstallations.map((site) => (
                  <div
                    key={site.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedSite === site.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedSite(site.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-xs sm:text-sm">{site.name.split(" - ")[1]}</h4>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(site.status)}`} />
                        {site.alerts > 0 && (
                          <Badge variant="destructive" className="text-xs px-1">
                            {site.alerts}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                      <div>{site.devices} devices</div>
                      <div>{site.uptime}% uptime</div>
                      <div>{site.energyConsumption} kWh</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
