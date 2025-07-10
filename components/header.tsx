"use client"

import { useState } from "react"
import { Bell, Search, User, Settings, Menu, Download, FileText, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationPanel } from "@/components/notification-panel"
import { SearchModal } from "@/components/search-modal"

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const handleExport = (format: string) => {
    console.log(`Exporting data as ${format}`)
    // Simulate export functionality
    const data = {
      timestamp: new Date().toISOString(),
      format: format,
      data: "Sample dashboard data",
    }

    if (format === "pdf") {
      // Simulate PDF generation
      alert("PDF export started. Download will begin shortly.")
    } else if (format === "excel") {
      // Simulate Excel export
      alert("Excel export started. Download will begin shortly.")
    } else if (format === "csv") {
      // Simulate CSV export
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Device,Status,Power,Temperature\n" +
        "LAMP_001,Online,248W,24.5°C\n" +
        "LAMP_002,Online,252W,25.1°C\n"
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "dashboard_data.csv")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b px-4 sm:px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">AI Operations Dashboard</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800 hidden sm:inline-flex">
                Live
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Export/Print Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search installations..."
                className="pl-10 w-48 lg:w-64"
                onClick={() => setShowSearch(true)}
              />
            </div>

            {/* Mobile Search Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </div>

            {/* Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard Settings</DropdownMenuItem>
                <DropdownMenuItem>Alert Preferences</DropdownMenuItem>
                <DropdownMenuItem>Data Refresh Rate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Account Preferences</DropdownMenuItem>
                <DropdownMenuItem>Billing & Usage</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      )}

      {/* Search Modal */}
      {showSearch && <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />}
    </>
  )
}
