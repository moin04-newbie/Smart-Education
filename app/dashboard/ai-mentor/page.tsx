"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Send,
  Lightbulb,
  Target,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Sparkles,
  Play,
  CheckCircle,
  Clock,
  Award,
  Users,
  BarChart3,
  Star,
  ExternalLink,
} from "lucide-react"
import { AIMentorService } from "@/lib/ai-mentor-service"
import { mockUserProgress, mockStudyPlans, mockInsights, mockSuggestions } from "@/lib/mock-data"

export default function AIMentorPage() {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI mentor. I've analyzed your learning progress and I'm here to help you achieve your goals. What would you like to work on today?",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      type: "user",
      content: "I'm struggling with understanding React hooks. Can you help me create a study plan?",
      timestamp: "1 minute ago",
    },
    {
      id: 3,
      type: "ai",
      content:
        "Based on your current progress, I recommend starting with useState and useEffect. I've created a personalized 5-day study plan for you. Would you like me to break it down day by day?",
      timestamp: "30 seconds ago",
    },
  ])

  const aiMentorService = new AIMentorService()
  const userProgress = mockUserProgress
  const studyPlans = mockStudyPlans
  const insights = mockInsights
  const suggestions = mockSuggestions

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

  const handleQuickAction = (action: string) => {
    const actionMessages: { [key: string]: string } = {
      'createStudyPlan': 'Can you help me create a personalized study plan?',
      'analyzeProgress': 'Can you analyze my learning progress and give me insights?',
      'getRecommendations': 'What learning resources do you recommend for me?',
      'findResources': 'Help me find some good learning resources'
    }
    
    const message = actionMessages[action] || 'Help me with my learning'
    setMessage(message)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center">
            <Brain className="w-8 h-8 text-purple-600 mr-3" />
            AI Mentor
          </h1>
          <p className="text-muted-foreground">Get personalized learning guidance and adaptive study plans</p>
        </div>
        <Badge className="bg-purple-600 text-white">
          <Sparkles className="w-4 h-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content with Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="study-plans">Study Plans</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat">
              <Card className="border-border h-[600px] flex flex-col">
                <CardHeader className="border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/ai-assistant-concept.png" alt="AI Mentor" />
                      <AvatarFallback className="bg-purple-100 text-purple-600">AI</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">SmartEd AI Mentor</CardTitle>
                      <CardDescription className="text-muted-foreground">Your personal learning assistant</CardDescription>
                    </div>
                    <div className="ml-auto">
                      <div className="flex items-center space-x-1 text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-xs">Online</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                        <div
                          className={`flex items-start space-x-2 ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <Avatar className="h-8 w-8">
                            {msg.type === "ai" ? (
                              <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">AI</AvatarFallback>
                            ) : (
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">JS</AvatarFallback>
                            )}
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              msg.type === "user" ? "bg-purple-600 text-white" : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
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
                      <div className="flex items-center space-x-2 bg-muted rounded-lg p-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">AI</AvatarFallback>
                        </Avatar>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <div className="border-t border-border p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Ask your AI mentor anything..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 border-border"
                    />
                    <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Study Plans Tab */}
            <TabsContent value="study-plans">
              <div className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Available Study Plans</CardTitle>
                    <CardDescription>Choose from personalized learning paths</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studyPlans.map((plan) => (
                      <div key={plan.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground mb-2">{plan.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{plan.duration}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {plan.difficulty}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{plan.topics.length} topics</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{plan.progress}%</span>
                              </div>
                              <Progress value={plan.progress} className="h-2" />
                            </div>
                          </div>
                          <Button size="sm" className="ml-4">
                            {plan.progress > 0 ? 'Continue' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{userProgress.totalHours}</p>
                          <p className="text-sm text-muted-foreground">Total Hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{userProgress.completedCourses}</p>
                          <p className="text-sm text-muted-foreground">Courses Completed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{userProgress.currentStreak}</p>
                          <p className="text-sm text-muted-foreground">Day Streak</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">Skill Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userProgress.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{skill.category}</span>
                          <span>Last practiced: {skill.lastPracticed}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent" 
                size="sm"
                onClick={() => handleQuickAction('createStudyPlan')}
              >
                <Target className="w-4 h-4 mr-2" />
                Create Study Plan
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent" 
                size="sm"
                onClick={() => handleQuickAction('analyzeProgress')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analyze Progress
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent" 
                size="sm"
                onClick={() => handleQuickAction('getRecommendations')}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Get Recommendations
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent" 
                size="sm"
                onClick={() => handleQuickAction('findResources')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Find Resources
              </Button>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">AI Insights</CardTitle>
              <CardDescription className="text-muted-foreground">
                Personalized recommendations based on your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.id} className={`p-3 bg-gradient-to-r from-${insight.color}-50 to-${insight.color}-100 rounded-lg`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-4 h-4 text-${insight.color}-600`}>
                      {insight.icon === 'Lightbulb' && <Lightbulb className="w-4 h-4" />}
                      {insight.icon === 'Target' && <Target className="w-4 h-4" />}
                      {insight.icon === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                      {insight.icon === 'BookOpen' && <BookOpen className="w-4 h-4" />}
                    </div>
                    <span className={`font-medium text-${insight.color}-900 text-sm`}>{insight.title}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        insight.priority === 'high' ? 'border-red-200 text-red-700' :
                        insight.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                        'border-green-200 text-green-700'
                      }`}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className={`text-xs text-${insight.color}-700`}>
                    {insight.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Suggestions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Recent Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                  <div className={`w-8 h-8 ${
                    suggestion.type === 'tutorial' ? 'bg-purple-100' :
                    suggestion.type === 'practice' ? 'bg-blue-100' :
                    'bg-green-100'
                  } rounded-lg flex items-center justify-center`}>
                    {suggestion.type === 'tutorial' && <BookOpen className="w-4 h-4 text-purple-600" />}
                    {suggestion.type === 'practice' && <Play className="w-4 h-4 text-blue-600" />}
                    {suggestion.type === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">{suggestion.recommendedAt}</span>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.difficulty}
                      </Badge>
                      {suggestion.duration && (
                        <span className="text-xs text-muted-foreground">{suggestion.duration}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Goal Progress */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Weekly Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Study Hours</span>
                  <span className="font-medium">{userProgress.weeklyProgress}/{userProgress.weeklyGoal} hours</span>
                </div>
                <Progress 
                  value={(userProgress.weeklyProgress / userProgress.weeklyGoal) * 100} 
                  className="h-2" 
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Goal: {userProgress.weeklyGoal} hours</span>
                  <span>{Math.round((userProgress.weeklyProgress / userProgress.weeklyGoal) * 100)}% complete</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Smart Study Plans</h3>
            <p className="text-xs text-muted-foreground">AI-generated personalized learning paths</p>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Progress Analysis</h3>
            <p className="text-xs text-muted-foreground">Deep insights into your learning patterns</p>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Smart Recommendations</h3>
            <p className="text-xs text-muted-foreground">Adaptive content suggestions</p>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-medium text-foreground mb-1">24/7 Support</h3>
            <p className="text-xs text-muted-foreground">Always available learning assistant</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
