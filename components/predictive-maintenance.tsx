"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Wrench,
  Calendar,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Download,
  FileText,
} from "lucide-react"

const predictions = [
  {
    id: "PRED_001",
    deviceId: "LAMP_023",
    location: "Site C - Building 3",
    component: "LED Driver",
    failureProbability: 87,
    daysToFailure: 7,
    confidence: 92,
    maintenanceWindow: "2024-01-22 to 2024-01-24",
    estimatedCost: 450,
    priority: "high",
    symptoms: ["Voltage fluctuations", "Temperature spikes", "Efficiency degradation"],
  },
  {
    id: "PRED_002",
    deviceId: "LAMP_045",
    location: "Site A - Parking Lot",
    component: "Ballast",
    failureProbability: 65,
    daysToFailure: 14,
    confidence: 78,
    maintenanceWindow: "2024-01-29 to 2024-01-31",
    estimatedCost: 320,
    priority: "medium",
    symptoms: ["Power consumption increase", "Flickering detected"],
  },
  {
    id: "PRED_003",
    deviceId: "LAMP_012",
    location: "Site B - Main Entrance",
    component: "Photocell Sensor",
    failureProbability: 45,
    daysToFailure: 28,
    confidence: 85,
    maintenanceWindow: "2024-02-12 to 2024-02-14",
    estimatedCost: 180,
    priority: "low",
    symptoms: ["Delayed activation", "Sensitivity issues"],
  },
]

const maintenanceHistory = [
  {
    date: "2024-01-10",
    device: "LAMP_018",
    action: "LED Module Replacement",
    cost: 380,
    status: "completed",
    technician: "John Smith",
  },
  {
    date: "2024-01-08",
    device: "LAMP_031",
    action: "Driver Circuit Repair",
    cost: 220,
    status: "completed",
    technician: "Sarah Johnson",
  },
  {
    date: "2024-01-15",
    device: "LAMP_007",
    action: "Scheduled Cleaning",
    cost: 50,
    status: "scheduled",
    technician: "Mike Wilson",
  },
]

export function PredictiveMaintenance() {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-red-600"
    if (probability >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const handleScheduleMaintenance = (predictionId: string) => {
    console.log(`Scheduling maintenance for ${predictionId}`)
    alert(`Maintenance scheduled for ${predictionId}`)
  }

  const handleCreateWorkOrder = (predictionId: string) => {
    console.log(`Creating work order for ${predictionId}`)
    alert(`Work order created for ${predictionId}`)
  }

  const handleExportReport = () => {
    console.log("Exporting maintenance report")
    alert("Maintenance report exported successfully")
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Predictive Maintenance</h1>
          <p className="text-gray-600">AI-powered failure prediction and maintenance scheduling</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleExportReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">3</p>
                <p className="text-xs sm:text-sm text-gray-600">Predictions Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">7</p>
                <p className="text-xs sm:text-sm text-gray-600">Days to Next Failure</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">23%</p>
                <p className="text-xs sm:text-sm text-gray-600">Cost Reduction</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              <div>
                <p className="text-xl sm:text-2xl font-bold">89%</p>
                <p className="text-xs sm:text-sm text-gray-600">Prediction Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Failure Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Failure Predictions</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            AI-powered predictive analysis for proactive maintenance scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="border rounded-lg p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold">{prediction.deviceId}</h3>
                      <Badge variant={getPriorityColor(prediction.priority)}>
                        {prediction.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{prediction.location}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Component: {prediction.component}</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <div
                      className={`text-2xl sm:text-3xl font-bold ${getProbabilityColor(prediction.failureProbability)}`}
                    >
                      {prediction.failureProbability}%
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">Failure Probability</p>
                  </div>
                </div>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle className="text-sm sm:text-base">
                    Predicted Failure in {prediction.daysToFailure} days
                  </AlertTitle>
                  <AlertDescription className="text-xs sm:text-sm">
                    Confidence Score: {prediction.confidence}% | Estimated Maintenance Cost: ${prediction.estimatedCost}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Recommended Maintenance Window</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{prediction.maintenanceWindow}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Observed Symptoms</h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                      {prediction.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Degradation Progress</span>
                    <span>{prediction.failureProbability}%</span>
                  </div>
                  <Progress value={prediction.failureProbability} className="h-2" />
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button size="sm" onClick={() => handleScheduleMaintenance(prediction.id)} className="text-xs">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCreateWorkOrder(prediction.id)}
                    className="text-xs bg-transparent"
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Create Work Order
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPrediction(prediction.id)}
                    className="text-xs bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-base sm:text-lg">Recent Maintenance Activity</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Track completed and scheduled maintenance operations
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View All History
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {maintenanceHistory.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-0"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`p-2 rounded-full ${item.status === "completed" ? "bg-green-100" : "bg-blue-100"}`}>
                    {item.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">{item.action}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{item.device}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs text-gray-500">
                      <span>{item.date}</span>
                      <span>Technician: {item.technician}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-semibold text-sm sm:text-base">${item.cost}</p>
                  <Badge variant={item.status === "completed" ? "secondary" : "default"} className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
