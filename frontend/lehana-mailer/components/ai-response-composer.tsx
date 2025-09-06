"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  Send,
  Calendar,
  Save,
  RefreshCw,
  Eye,
  Wand2,
  BarChart3,
  Smile,
  Clock,
  Target,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

const toneOptions = [
  { id: "professional", label: "Professional", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "friendly", label: "Friendly", color: "bg-green-100 text-green-700 border-green-200" },
  { id: "empathetic", label: "Empathetic", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { id: "technical", label: "Technical", color: "bg-gray-100 text-gray-700 border-gray-200" },
  { id: "apologetic", label: "Apologetic", color: "bg-red-100 text-red-700 border-red-200" },
  { id: "enthusiastic", label: "Enthusiastic", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
]

const templates = [
  {
    id: "password-reset",
    title: "Password Reset Assistance",
    category: "Account Issues",
    preview: "I understand the frustration with password reset issues. I've generated a fresh reset link...",
    tone: "empathetic",
    estimatedTime: "2 min",
  },
  {
    id: "billing-inquiry",
    title: "Billing Inquiry Response",
    category: "Billing",
    preview: "Thank you for bringing this billing discrepancy to our attention. I've reviewed your account...",
    tone: "professional",
    estimatedTime: "3 min",
  },
  {
    id: "feature-request",
    title: "Feature Request Acknowledgment",
    category: "Product",
    preview: "We appreciate your feature suggestion! Dark mode is indeed a popular request...",
    tone: "enthusiastic",
    estimatedTime: "2 min",
  },
  {
    id: "technical-issue",
    title: "Technical Issue Resolution",
    category: "Technical",
    preview: "I've identified the root cause of the integration issue. Here's what happened and how we've fixed it...",
    tone: "technical",
    estimatedTime: "4 min",
  },
]

export function AIResponseComposer() {
  const [selectedTone, setSelectedTone] = useState("friendly")
  const [aiEnhanced, setAiEnhanced] = useState(true)
  const [responseText, setResponseText] = useState(`Hi Sarah,

I understand how frustrating this must be. I can see that your password reset token has expired, which is why you're unable to access your account.

I've generated a fresh password reset link for you that will be valid for the next 24 hours. Please check your email (sarah.j@company.com) in the next few minutes.

If you continue to experience issues, please don't hesitate to reach out.

Best regards,
Support Team`)
  const [readabilityScore, setReadabilityScore] = useState(85)
  const [satisfactionScore, setSatisfactionScore] = useState(4.7)
  const [activeTab, setActiveTab] = useState("compose")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleTemplateSelect = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template.id)
    setSelectedTone(template.tone)
    // In a real app, this would load the full template content
    setResponseText(`Template: ${template.title}\n\n${template.preview}...`)
  }

  const handleAIEnhance = () => {
    // Simulate AI enhancement
    setResponseText((prev) => prev + "\n\n[AI Enhancement: Added personalized greeting and clearer next steps]")
    setReadabilityScore(Math.min(100, readabilityScore + 5))
    setSatisfactionScore(Math.min(5, satisfactionScore + 0.1))
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>AI Response Composer</span>
          <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700">
            Beta
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4">
            {/* Tone Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Response Tone</label>
              <div className="flex flex-wrap gap-2">
                {toneOptions.map((tone) => (
                  <Button
                    key={tone.id}
                    variant={selectedTone === tone.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTone(tone.id)}
                    className={selectedTone === tone.id ? tone.color : ""}
                  >
                    {tone.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* AI Enhancement Controls */}
            <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wand2 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">AI Enhancement</span>
                </div>
                <Switch checked={aiEnhanced} onCheckedChange={setAiEnhanced} />
              </div>

              {aiEnhanced && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-700">Formality Level</span>
                    <span className="text-purple-900 font-medium">Professional</span>
                  </div>
                  <Slider defaultValue={[70]} max={100} step={1} className="w-full" />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-700">Empathy Level</span>
                    <span className="text-purple-900 font-medium">High</span>
                  </div>
                  <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                </div>
              )}
            </div>

            {/* Response Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Response Content</label>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={handleAIEnhance}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    Enhance
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Regenerate
                  </Button>
                </div>
              </div>
              <Textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="min-h-48 resize-none font-mono text-sm"
                placeholder="AI will generate a response here..."
              />
            </div>

            {/* Quality Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Readability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${readabilityScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-600">{readabilityScore}</span>
                </div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Smile className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-3 h-3 rounded-full ${
                          star <= Math.floor(satisfactionScore) ? "bg-yellow-400" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-blue-600">{satisfactionScore.toFixed(1)}</span>
                </div>
              </Card>
            </div>

            {/* AI Suggestions */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">AI Suggestions</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm text-gray-700">Add customer's name for personalization</span>
                    <Button size="sm" variant="ghost">
                      <Zap className="w-3 h-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="text-sm text-gray-700">Include estimated resolution time</span>
                    <Button size="sm" variant="ghost">
                      <Zap className="w-3 h-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Response Templates</h3>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedTemplate === template.id ? "ring-2 ring-purple-500 bg-purple-50" : ""
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.title}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{template.estimatedTime}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.preview}</p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge className={toneOptions.find((t) => t.id === template.tone)?.color}>
                        {toneOptions.find((t) => t.id === template.tone)?.label}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Copy className="w-3 h-3 mr-1" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Customer View</span>
            </div>

            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/support-avatar.png" />
                    <AvatarFallback className="bg-blue-500 text-white text-xs">ST</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Support Team</span>
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">support@company.com</span>
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <div className="prose prose-sm max-w-none">
                    {responseText.split("\n").map((line, index) => (
                      <p key={index} className="mb-2 last:mb-0">
                        {line || "\u00A0"}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50">
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      Not Helpful
                    </Button>
                  </div>
                  <span className="text-xs text-gray-500">Estimated reading time: 30 seconds</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t">
          <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Send Response
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
