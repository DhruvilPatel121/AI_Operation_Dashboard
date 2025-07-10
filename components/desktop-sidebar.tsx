"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Activity, AlertTriangle, Wrench, FileText, Map, Lightbulb } from "lucide-react"

interface DesktopSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const menuItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "monitoring", label: "Real-Time Monitoring", icon: Activity },
  { id: "anomalies", label: "Anomaly Detection", icon: AlertTriangle },
  { id: "maintenance", label: "Predictive Maintenance", icon: Wrench },
  { id: "map", label: "Map View", icon: Map },
  { id: "reports", label: "Reports & Settings", icon: FileText },
]

export function DesktopSidebar({ activeTab, setActiveTab }: DesktopSidebarProps) {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-20">
      <div className="flex flex-col flex-grow bg-white shadow-lg border-r">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DevCraft AI</h1>
              <p className="text-sm text-gray-500">Monitor | Observe</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
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
  )
}
