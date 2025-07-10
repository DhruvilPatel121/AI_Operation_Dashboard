"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Search, MapPin, Activity, AlertTriangle } from "lucide-react"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const searchData = [
  {
    id: 1,
    type: "device",
    title: "LAMP_001",
    description: "Site A - Building 1",
    status: "online",
    category: "Device",
  },
  {
    id: 2,
    type: "device",
    title: "LAMP_023",
    description: "Site C - Building 3",
    status: "warning",
    category: "Device",
  },
  {
    id: 3,
    type: "location",
    title: "Site A - Corporate Campus",
    description: "45 devices, 99.2% uptime",
    status: "online",
    category: "Location",
  },
  {
    id: 4,
    type: "alert",
    title: "Power Spike Alert",
    description: "High power consumption detected",
    status: "active",
    category: "Alert",
  },
  {
    id: 5,
    type: "device",
    title: "LAMP_045",
    description: "Site B - Parking Area",
    status: "offline",
    category: "Device",
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState(searchData)

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults(searchData)
    } else {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setResults(filtered)
    }
  }, [searchTerm])

  const getIcon = (type: string) => {
    switch (type) {
      case "device":
        return <Activity className="h-4 w-4 text-blue-500" />
      case "location":
        return <MapPin className="h-4 w-4 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "default"
      case "warning":
        return "destructive"
      case "offline":
        return "secondary"
      case "active":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="flex items-start justify-center min-h-screen pt-16 px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold">Search Dashboard</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search devices, locations, alerts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>

            <div className="max-h-96 overflow-y-auto">
              {results.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No results found for "{searchTerm}"</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border"
                      onClick={() => {
                        console.log(`Navigate to ${item.title}`)
                        onClose()
                      }}
                    >
                      {getIcon(item.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge variant={getStatusColor(item.status)} className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {searchTerm && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Showing {results.length} result{results.length !== 1 ? "s" : ""} for "{searchTerm}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
