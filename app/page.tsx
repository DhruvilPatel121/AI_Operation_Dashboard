"use client"

import { useState } from "react"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Header } from "@/components/header"
import { DashboardOverview } from "@/components/dashboard-overview"
import { RealTimeMonitoring } from "@/components/real-time-monitoring"
import { AnomalyDetection } from "@/components/anomaly-detection"
import { PredictiveMaintenance } from "@/components/predictive-maintenance"
import { ReportsSettings } from "@/components/reports-settings"
import { MapView } from "@/components/map-view"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "monitoring":
        return <RealTimeMonitoring />
      case "anomalies":
        return <AnomalyDetection />
      case "maintenance":
        return <PredictiveMaintenance />
      case "reports":
        return <ReportsSettings />
      case "map":
        return <MapView />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <MobileSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="lg:ml-64">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="p-4 sm:p-6 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
