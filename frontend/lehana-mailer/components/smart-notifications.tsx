"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, AlertTriangle, CheckCircle, Info, Zap } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "urgent"
  title: string
  message: string
  timestamp: Date
  autoClose?: boolean
  duration?: number
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    title: "High Priority Email",
    message: "New urgent email from VIP customer requires immediate attention",
    timestamp: new Date(),
    autoClose: false,
  },
  {
    id: "2",
    type: "success",
    title: "AI Response Sent",
    message: "Successfully sent AI-generated response to Sarah Johnson",
    timestamp: new Date(Date.now() - 30000),
    autoClose: true,
    duration: 5000,
  },
  {
    id: "3",
    type: "info",
    title: "Daily Summary",
    message: "You've resolved 12 emails today with 4.8★ average satisfaction",
    timestamp: new Date(Date.now() - 120000),
    autoClose: true,
    duration: 8000,
  },
]

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [progress, setProgress] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Simulate receiving notifications
    const timer = setTimeout(() => {
      setNotifications(mockNotifications)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.autoClose && notification.duration) {
        const startTime = Date.now()
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime
          const progressPercent = (elapsed / notification.duration!) * 100

          if (progressPercent >= 100) {
            removeNotification(notification.id)
            clearInterval(interval)
          } else {
            setProgress((prev) => ({ ...prev, [notification.id]: progressPercent }))
          }
        }, 100)

        return () => clearInterval(interval)
      }
    })
  }, [notifications])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[id]
      return newProgress
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "urgent":
        return <Zap className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getNotificationColors = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50/90"
      case "warning":
        return "border-yellow-200 bg-yellow-50/90"
      case "urgent":
        return "border-red-200 bg-red-50/90"
      default:
        return "border-blue-200 bg-blue-50/90"
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`${getNotificationColors(
            notification.type,
          )} backdrop-blur-sm shadow-lg border-2 animate-in slide-in-from-right duration-300`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
                <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notification.timestamp.toLocaleTimeString()}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeNotification(notification.id)}
                className="h-6 w-6 p-0 hover:bg-white/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {notification.autoClose && (
              <div className="mt-3">
                <Progress value={progress[notification.id] || 0} className="h-1" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
