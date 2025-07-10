"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, AlertTriangle, CheckCircle, Info, Clock } from "lucide-react"

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "High Power Consumption Detected",
    message: "Site C - Lamp #23 is consuming 320W, exceeding the 280W threshold",
    timestamp: "2 minutes ago",
    read: false,
    severity: "high",
  },
  {
    id: 2,
    type: "maintenance",
    title: "Scheduled Maintenance Reminder",
    message: "Site A requires routine maintenance within the next 3 days",
    timestamp: "15 minutes ago",
    read: false,
    severity: "medium",
  },
  {
    id: 3,
    type: "success",
    title: "System Update Completed",
    message: "All devices have been successfully updated to firmware v2.1.3",
    timestamp: "1 hour ago",
    read: true,
    severity: "low",
  },
  {
    id: 4,
    type: "info",
    title: "Energy Efficiency Improved",
    message: "Overall system efficiency has increased by 3% this week",
    timestamp: "2 hours ago",
    read: true,
    severity: "low",
  },
  {
    id: 5,
    type: "alert",
    title: "Device Offline",
    message: "LAMP_045 at Site B has been offline for 10 minutes",
    timestamp: "3 hours ago",
    read: false,
    severity: "high",
  },
]

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getIcon = (type: string, severity: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className={`h-4 w-4 ${severity === "high" ? "text-red-500" : "text-yellow-500"}`} />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "maintenance":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile backdrop */}
      <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={onClose} />

      {/* Notification panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl lg:absolute lg:right-4 lg:top-16 lg:h-auto lg:max-h-96 lg:rounded-lg lg:border">
        <Card className="h-full lg:h-auto border-0 lg:border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {notificationList.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : (
                notificationList.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {getIcon(notification.type, notification.severity)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                          {!notification.read && <Badge variant="default" className="ml-2 h-2 w-2 p-0 rounded-full" />}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
