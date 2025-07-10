"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Mail, Settings, Bell, Clock, Printer, Save } from "lucide-react"

const scheduledReports = [
  {
    id: "RPT_001",
    name: "Daily Energy Consumption",
    type: "PDF",
    frequency: "Daily",
    recipients: ["admin@kayaaydinlatma.com", "ops@kayaaydinlatma.com"],
    lastGenerated: "2024-01-15 08:00",
    status: "active",
  },
  {
    id: "RPT_002",
    name: "Weekly Maintenance Summary",
    type: "Excel",
    frequency: "Weekly",
    recipients: ["maintenance@kayaaydinlatma.com"],
    lastGenerated: "2024-01-14 09:00",
    status: "active",
  },
  {
    id: "RPT_003",
    name: "Monthly Performance Analysis",
    type: "PDF",
    frequency: "Monthly",
    recipients: ["management@kayaaydinlatma.com"],
    lastGenerated: "2024-01-01 10:00",
    status: "paused",
  },
]

const alertRules = [
  {
    id: "RULE_001",
    name: "High Power Consumption",
    condition: "Power > 300W for 5 minutes",
    severity: "high",
    enabled: true,
    notifications: ["email", "sms"],
  },
  {
    id: "RULE_002",
    name: "Temperature Alert",
    condition: "Temperature > 35°C",
    severity: "medium",
    enabled: true,
    notifications: ["email"],
  },
  {
    id: "RULE_003",
    name: "Device Offline",
    condition: "No data received for 10 minutes",
    severity: "high",
    enabled: true,
    notifications: ["email", "sms", "push"],
  },
]

export function ReportsSettings() {
  const [newRule, setNewRule] = useState({
    name: "",
    metric: "",
    operator: "",
    value: "",
    duration: "",
    severity: "medium",
  })

  const handleQuickExport = (type: string) => {
    console.log(`Exporting ${type} report`)
    alert(`${type} report generation started. Download will begin shortly.`)
  }

  const handlePrintReport = () => {
    window.print()
  }

  const handleSaveSettings = () => {
    console.log("Saving settings")
    alert("Settings saved successfully!")
  }

  const handleCreateReport = () => {
    console.log("Creating new report")
    alert("New report created successfully!")
  }

  const handleCreateAlertRule = () => {
    if (!newRule.name || !newRule.metric || !newRule.operator || !newRule.value) {
      alert("Please fill in all required fields")
      return
    }
    console.log("Creating new alert rule:", newRule)
    alert("New alert rule created successfully!")
    setNewRule({
      name: "",
      metric: "",
      operator: "",
      value: "",
      duration: "",
      severity: "medium",
    })
  }

  const handleTestRule = () => {
    console.log("Testing alert rule")
    alert("Alert rule test completed successfully!")
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Settings</h1>
          <p className="text-gray-600">Configure reports, alerts, and system preferences</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports" className="text-xs sm:text-sm">
            Reports & Export
          </TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs sm:text-sm">
            Custom Alerts
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm">
            System Settings
          </TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4 sm:space-y-6">
          {/* Quick Export */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Export</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Generate instant reports for current data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleQuickExport("Energy Report")}
                >
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">Energy Report (PDF)</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  onClick={() => handleQuickExport("Device Status")}
                >
                  <Download className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">Device Status (Excel)</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  onClick={handlePrintReport}
                >
                  <Printer className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">Print Dashboard</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Reports */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <CardTitle className="text-base sm:text-lg">Scheduled Reports</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Automated report generation and distribution
                  </CardDescription>
                </div>
                <Button onClick={handleCreateReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-3">
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">{report.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {report.type} • {report.frequency} • Last: {report.lastGenerated}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={report.status === "active" ? "default" : "secondary"}>{report.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>
                          {report.recipients.length} recipient{report.recipients.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Next: Tomorrow 08:00</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Report Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Custom Report Builder</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Create tailored reports with specific metrics and timeframes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-name" className="text-xs sm:text-sm">
                      Report Name
                    </Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>
                  <div>
                    <Label htmlFor="date-range" className="text-xs sm:text-sm">
                      Date Range
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 days</SelectItem>
                        <SelectItem value="last-3-months">Last 3 months</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sites" className="text-xs sm:text-sm">
                      Sites
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sites" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All sites</SelectItem>
                        <SelectItem value="site-a">Site A</SelectItem>
                        <SelectItem value="site-b">Site B</SelectItem>
                        <SelectItem value="site-c">Site C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs sm:text-sm">Metrics to Include</Label>
                    <div className="space-y-2 mt-2">
                      {[
                        "Energy Consumption",
                        "Device Uptime",
                        "Maintenance Events",
                        "Anomaly Detection",
                        "Cost Analysis",
                      ].map((metric) => (
                        <div key={metric} className="flex items-center space-x-2">
                          <Switch id={metric} />
                          <Label htmlFor={metric} className="text-xs sm:text-sm">
                            {metric}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
                <Button onClick={() => handleQuickExport("Custom Report")}>Generate Report</Button>
                <Button variant="outline" className="bg-transparent">
                  Save Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4 sm:space-y-6">
          {/* Alert Rules */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <CardTitle className="text-base sm:text-lg">Alert Rules</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Configure custom alert conditions and notifications
                  </CardDescription>
                </div>
                <Button>
                  <Bell className="h-4 w-4 mr-2" />
                  New Alert Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-2">
                      <div className="flex items-center space-x-3">
                        <Switch checked={rule.enabled} />
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base">{rule.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{rule.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={rule.severity === "high" ? "destructive" : "default"}>{rule.severity}</Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                      <span>Notifications:</span>
                      {rule.notifications.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* New Alert Rule Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Create New Alert Rule</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Define conditions that trigger notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rule-name" className="text-xs sm:text-sm">
                      Rule Name
                    </Label>
                    <Input
                      id="rule-name"
                      placeholder="Enter rule name"
                      value={newRule.name}
                      onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metric" className="text-xs sm:text-sm">
                      Metric
                    </Label>
                    <Select value={newRule.metric} onValueChange={(value) => setNewRule({ ...newRule, metric: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power">Power Consumption</SelectItem>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="voltage">Voltage</SelectItem>
                        <SelectItem value="luminosity">Luminosity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="operator" className="text-xs sm:text-sm">
                        Operator
                      </Label>
                      <Select
                        value={newRule.operator}
                        onValueChange={(value) => setNewRule({ ...newRule, operator: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder=">" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gt">Greater than</SelectItem>
                          <SelectItem value="lt">Less than</SelectItem>
                          <SelectItem value="eq">Equal to</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="value" className="text-xs sm:text-sm">
                        Value
                      </Label>
                      <Input
                        id="value"
                        placeholder="0"
                        value={newRule.value}
                        onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="duration" className="text-xs sm:text-sm">
                      Duration
                    </Label>
                    <Select
                      value={newRule.duration}
                      onValueChange={(value) => setNewRule({ ...newRule, duration: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">1 minute</SelectItem>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="severity" className="text-xs sm:text-sm">
                      Severity
                    </Label>
                    <Select
                      value={newRule.severity}
                      onValueChange={(value) => setNewRule({ ...newRule, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm">Notification Methods</Label>
                    <div className="space-y-2 mt-2">
                      {["Email", "SMS", "Push Notification"].map((method) => (
                        <div key={method} className="flex items-center space-x-2">
                          <Switch id={method} />
                          <Label htmlFor={method} className="text-xs sm:text-sm">
                            {method}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
                <Button onClick={handleCreateAlertRule}>Create Alert Rule</Button>
                <Button variant="outline" onClick={handleTestRule} className="bg-transparent">
                  Test Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4 sm:space-y-6">
          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">System Configuration</CardTitle>
              <CardDescription className="text-xs sm:text-sm">General system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="refresh-interval" className="text-xs sm:text-sm">
                        Data Refresh Interval
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="5 seconds" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1s">1 second</SelectItem>
                          <SelectItem value="5s">5 seconds</SelectItem>
                          <SelectItem value="10s">10 seconds</SelectItem>
                          <SelectItem value="30s">30 seconds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone" className="text-xs sm:text-sm">
                        Timezone
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Europe/Istanbul" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="europe/istanbul">Europe/Istanbul</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="europe/london">Europe/London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode" className="text-xs sm:text-sm">
                          Dark Mode
                        </Label>
                        <p className="text-xs text-gray-600">Enable dark theme</p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-refresh" className="text-xs sm:text-sm">
                          Auto Refresh
                        </Label>
                        <p className="text-xs text-gray-600">Automatically refresh data</p>
                      </div>
                      <Switch id="auto-refresh" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sound-alerts" className="text-xs sm:text-sm">
                          Sound Alerts
                        </Label>
                        <p className="text-xs text-gray-600">Play sound for alerts</p>
                      </div>
                      <Switch id="sound-alerts" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Data Retention</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Configure how long data is stored in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="real-time-data" className="text-xs sm:text-sm">
                    Real-time Data
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="7 days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">1 day</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="historical-data" className="text-xs sm:text-sm">
                    Historical Data
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="1 year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6m">6 months</SelectItem>
                      <SelectItem value="1y">1 year</SelectItem>
                      <SelectItem value="2y">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alert-logs" className="text-xs sm:text-sm">
                    Alert Logs
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="6 months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">3 months</SelectItem>
                      <SelectItem value="6m">6 months</SelectItem>
                      <SelectItem value="1y">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">API Configuration</CardTitle>
              <CardDescription className="text-xs sm:text-sm">External integrations and API settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-endpoint" className="text-xs sm:text-sm">
                    API Endpoint
                  </Label>
                  <Input id="api-endpoint" value="https://api.kayaaydinlatma.com/v1" readOnly />
                </div>
                <div>
                  <Label htmlFor="api-key" className="text-xs sm:text-sm">
                    API Key
                  </Label>
                  <div className="flex space-x-2">
                    <Input id="api-key" value="••••••••••••••••" type="password" readOnly />
                    <Button variant="outline" className="bg-transparent">
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-logging" className="text-xs sm:text-sm">
                      API Request Logging
                    </Label>
                    <p className="text-xs text-gray-600">Log all API requests for debugging</p>
                  </div>
                  <Switch id="api-logging" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
