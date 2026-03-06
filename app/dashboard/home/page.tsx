 "use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Clock,
  TrendingUp,
  Target,
  Calendar,
  Award,
  Users,
  Brain,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const jsResources = [
  {
    title: "Closures & Lexical Scope",
    description: "Understand how inner functions remember variables from outer scopes.",
    level: "Intermediate",
  },
  {
    title: "Promises & Async/Await",
    description: "Learn how JavaScript handles asynchronous code with promises and async/await.",
    level: "Intermediate",
  },
  {
    title: "The Event Loop",
    description: "See how the call stack, queue, and microtasks work together.",
    level: "Conceptual",
  },
  {
    title: "Hoisting, var / let / const",
    description: "Clarify how different declarations behave at runtime.",
    level: "Fundamentals",
  },
]

export default function HomePage() {
  const { toast } = useToast()
  const [showJsResources, setShowJsResources] = useState(false)
  const [showReactDetails, setShowReactDetails] = useState(false)
  const [showMlDetails, setShowMlDetails] = useState(false)
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, John!</h1>
          <p className="text-muted-foreground">Ready to continue your learning journey?</p>
        </div>
        <Badge className="bg-purple-600 text-white">BETA</Badge>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                <p className="text-2xl font-bold text-foreground">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours Studied</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Continue Learning</CardTitle>
              <CardDescription className="text-muted-foreground">Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">Advanced React Patterns</h3>
                  <p className="text-sm text-muted-foreground">Chapter 4: Custom Hooks</p>
                  <Progress value={75} className="mt-2 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">75% complete</p>
                </div>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => setShowReactDetails((prev) => !prev)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {showReactDetails ? "Hide Details" : "Continue"}
                </Button>
              </div>
              {showReactDetails && (
                <div className="mt-3 space-y-2 text-xs bg-muted/40 rounded-lg p-3">
                  <p className="font-semibold text-foreground mb-1">Next up in this module</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Quiz: Identify when to extract logic into a custom hook.</li>
                    <li>Exercise: Refactor a form to use a `useForm` custom hook.</li>
                    <li>Concept check: Rules of hooks and dependency arrays.</li>
                  </ul>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    This is demo content. Connect it to your real React course player and quiz engine.
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">Machine Learning Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">Module 2: Linear Regression</p>
                  <Progress value={45} className="mt-2 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">45% complete</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowMlDetails((prev) => !prev)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {showMlDetails ? "Hide Details" : "Resume"}
                </Button>
              </div>
              {showMlDetails && (
                <div className="mt-3 space-y-2 text-xs bg-muted/40 rounded-lg p-3">
                  <p className="font-semibold text-foreground mb-1">Coming up in this module</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Concept: Cost function and gradient descent intuition.</li>
                    <li>Quiz: Interpret weights and bias in a trained linear model.</li>
                    <li>Notebook: Implement linear regression with scikit‑learn on a small dataset.</li>
                  </ul>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    These are demo learning items. Later you can link to real notebooks, datasets, and quizzes.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Learning Tips */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg font-semibold text-foreground">AI Learning Tips</CardTitle>
                <Badge className="bg-purple-600 text-white text-xs">AI</Badge>
              </div>
              <CardDescription className="text-muted-foreground">
                Personalized recommendations based on your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Focus on JavaScript Fundamentals</h3>
                <p className="text-sm text-purple-700 mb-3">
                  Your recent quiz results suggest strengthening your understanding of closures and async/await
                  patterns.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                  onClick={() => setShowJsResources((prev) => !prev)}
                >
                  {showJsResources ? "Hide Resources" : "View Resources"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {showJsResources && (
                  <div className="mt-4 space-y-2">
                    {jsResources.map((resource) => (
                      <div
                        key={resource.title}
                        className="flex items-start justify-between rounded-md bg-white/70 px-3 py-2 text-xs"
                      >
                        <div className="pr-2">
                          <p className="font-semibold text-purple-900">{resource.title}</p>
                          <p className="text-[11px] text-purple-700">{resource.description}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] border-purple-200 text-purple-700">
                          {resource.level}
                        </Badge>
                      </div>
                    ))}
                    <p className="mt-1 text-[11px] text-purple-700">
                      These are demo resources. In a real app, link them to your JavaScript course, docs, or videos.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Practice Data Structures</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Based on your learning path, practicing arrays and objects will help with upcoming modules.
                </p>
                <Link href="/dashboard/workspaces">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    Start Practice
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">React Study Session</p>
                  <p className="text-xs text-muted-foreground">2:00 PM - 3:30 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Team Project Meeting</p>
                  <p className="text-xs text-muted-foreground">4:00 PM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg opacity-60">
                <div className="w-2 h-8 bg-gray-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Algorithm Practice</p>
                  <p className="text-xs text-muted-foreground">6:00 PM - 7:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/diverse-student-profiles.png" alt="Student" />
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">JS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Completed "React Hooks" quiz</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  95%
                </Badge>
              </div>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-foreground">AI suggested new learning path</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  New
                </Badge>
              </div>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">TC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Joined "Web Dev Bootcamp" group</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
                onClick={() =>
                  toast({
                    title: "Course catalog coming soon",
                    description: "Use the Repository tab for now to explore learning materials.",
                  })
                }
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
              <Link href="/dashboard/community">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Study Groups
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Progress Report
                </Button>
              </Link>
              <Link href="/dashboard/ai-mentor">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Mentor Chat
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
