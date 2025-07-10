"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, LayoutDashboard, Activity, AlertTriangle, Wrench, FileText, Map, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const menuItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "monitoring", label: "Real-Time Monitoring", icon: Activity },
  { id: "anomalies", label: "Anomaly Detection", icon: AlertTriangle },
  { id: "maintenance", label: "Predictive Maintenance", icon: Wrench },
  { id: "map", label: "Map View", icon: Map },
  { id: "reports", label: "Reports & Settings", icon: FileText },
]

export function MobileSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: MobileSidebarProps) {
  const handleMenuClick = (tabId: string) => {
    setActiveTab(tabId)
    setIsOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/80 z-40 lg:hidden" onClick={() => setIsOpen(false)} />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DevCraft AI</h1>
                <p className="text-sm text-gray-500">Kaya Aydınlatma</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                        activeTab === item.id
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
