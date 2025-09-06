"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Sparkles, Lightbulb, Zap } from "lucide-react"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const quickActions = [
    { icon: Sparkles, label: "Generate Response", color: "bg-purple-100 text-purple-700" },
    { icon: Lightbulb, label: "Get Suggestions", color: "bg-yellow-100 text-yellow-700" },
    { icon: Zap, label: "Quick Actions", color: "bg-blue-100 text-blue-700" },
  ]

  const handleSend = () => {
    if (message.trim()) {
      console.log("AI Assistant message:", message)
      setMessage("")
    }
  }

  return (
    <>
      {/* FAB Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* AI Assistant Popup */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-purple-200 animate-in slide-in-from-bottom duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>AI Assistant</span>
              <Badge className="bg-green-100 text-green-700 text-xs">Online</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Quick Actions</p>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`justify-start h-auto p-3 ${action.color} hover:opacity-80`}
                  >
                    <action.icon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Ask AI Assistant</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="How can I help you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Keyboard Shortcut Hint */}
            <div className="text-xs text-gray-500 text-center pt-2 border-t">
              Press{" "}
              <Badge variant="outline" className="text-xs px-1">
                ⌘K
              </Badge>{" "}
              for command palette
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
