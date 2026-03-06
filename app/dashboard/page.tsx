 "use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, Users, Brain, BarChart3, Target, Send, X } from "lucide-react"
import { AIMentorService } from "@/lib/ai-mentor-service"
import { mockUserProgress } from "@/lib/mock-data"

export default function DashboardPage() {
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI mentor. How can I help you with your learning today?",
      timestamp: "Just now",
    },
  ])

  const aiMentorService = new AIMentorService()

  const userProgress = mockUserProgress

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        type: "user" as const,
        content: message,
        timestamp: "Just now",
      }
      
      setChatMessages(prev => [...prev, userMessage])
      setMessage("")
      setIsTyping(true)

      // Generate AI response using the service
      setTimeout(() => {
        const aiResponse = aiMentorService.analyzeInput(message)
        const aiMessage = {
          id: chatMessages.length + 2,
          type: "ai" as const,
          content: aiResponse.content,
          timestamp: "Just now",
        }
        
        setChatMessages(prev => [...prev, aiMessage])
        setIsTyping(false)
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Discovery Score Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">Discovery score</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    View how you rank and get detailed insights on how to boost your score.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Unlock with <span className="font-semibold ml-1">PRO</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/diverse-student-profiles.png" alt="Student" />
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-6xl font-bold text-foreground">85</div>
                  <div className="text-muted-foreground">pts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Learning Streak</p>
                  <p className="text-2xl font-bold text-foreground">{userProgress.currentStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {userProgress.completedCourses} courses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Start a Project Section */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">Start a project</CardTitle>
              <CardDescription className="text-muted-foreground">
                Start your first project with a few easy steps.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              More analytics with <span className="font-semibold ml-1">PRO</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">1</span>
                </div>
                <p className="text-sm text-muted-foreground">Choose a project template</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">2</span>
                </div>
                <p className="text-sm text-muted-foreground">Set up your workspace</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">3</span>
                </div>
                <p className="text-sm text-muted-foreground">Invite collaborators</p>
              </div>
              <Link href="/dashboard/workspaces">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Create Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-muted/30 rounded-lg p-6 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Progress visualization</p>
                <div className="mt-4 text-2xl font-bold text-purple-600">$20,000</div>
                <p className="text-xs text-muted-foreground">Potential earnings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/dashboard/workspaces">
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Workspaces</p>
                  <p className="text-sm text-muted-foreground">Manage projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/community">
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Community</p>
                  <p className="text-sm text-muted-foreground">Connect & learn</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ai-mentor">
          <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">AI Mentor</p>
                  <p className="text-sm text-muted-foreground">Get guidance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6">
        <Card className={`border-border shadow-lg transition-all duration-300 ${
          isAIMentorOpen ? 'w-96 h-[500px]' : 'w-80'
        }`}>
          {!isAIMentorOpen ? (
            // Collapsed Widget
            <CardContent className="p-4 cursor-pointer" onClick={() => setIsAIMentorOpen(true)}>
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/ai-assistant-concept.png" alt="AI" />
                  <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">SmartEd AI</p>
                  <Badge className="bg-purple-600 text-white text-xs">AI</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">What are you looking for today?</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => {
                  setIsAIMentorOpen(true)
                  setMessage("Can you analyze my learning progress and suggest what to focus on next?")
                }}
              >
                Ask AI Mentor
              </Button>
            </CardContent>
          ) : (
            // Expanded Chat Interface
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ai-assistant-concept.png" alt="AI" />
                      <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">SmartEd AI Mentor</p>
                      <p className="text-xs text-muted-foreground">Your personal learning assistant</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-xs">Online</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAIMentorOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`flex items-start space-x-2 ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <Avatar className="h-6 w-6">
                          {msg.type === "ai" ? (
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">AI</AvatarFallback>
                          ) : (
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">JS</AvatarFallback>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-2 text-xs ${
                            msg.type === "user" ? "bg-purple-600 text-white" : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-xs">{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.type === "user" ? "text-purple-100" : "text-muted-foreground"
                            }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 bg-muted rounded-lg p-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">AI</AvatarFallback>
                      </Avatar>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Ask your AI mentor..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 text-sm"
                  />
                  <Button onClick={handleSendMessage} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
