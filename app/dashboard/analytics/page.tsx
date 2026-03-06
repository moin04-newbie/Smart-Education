"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, TrendingDown, Target, Clock, Award, Brain, BookOpen, Users, Download, Filter } from "lucide-react"

const weeklyData = [
  { name: "Mon", hours: 2.5, completed: 3 },
  { name: "Tue", hours: 3.2, completed: 4 },
  { name: "Wed", hours: 1.8, completed: 2 },
  { name: "Thu", hours: 4.1, completed: 5 },
  { name: "Fri", hours: 3.7, completed: 4 },
  { name: "Sat", hours: 2.9, completed: 3 },
  { name: "Sun", hours: 1.5, completed: 1 },
]

const skillsData = [
  { name: "JavaScript", value: 85 },
  { name: "React", value: 78 },
  { name: "Python", value: 65 },
  { name: "CSS", value: 82 },
  { name: "Node.js", value: 58 },
]

const progressData = [
  { subject: "Frontend", A: 85, fullMark: 100 },
  { subject: "Backend", A: 65, fullMark: 100 },
  { subject: "Database", A: 72, fullMark: 100 },
  { subject: "DevOps", A: 45, fullMark: 100 },
  { subject: "Testing", A: 58, fullMark: 100 },
  { subject: "Design", A: 78, fullMark: 100 },
]

const COLORS = ["#131313", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your learning progress and performance insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                <p className="text-2xl font-bold text-foreground">156.5</p>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">+12% this week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">+5% this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                <p className="text-2xl font-bold text-foreground">24</p>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">+3 this month</span>
                </div>
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
                <p className="text-sm font-medium text-muted-foreground">Streak Days</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingDown className="w-3 h-3 text-red-600" />
                  <span className="text-red-600">-2 from best</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Activity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Weekly Activity</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your study hours and completed tasks this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#131313" name="Study Hours" />
                    <Bar dataKey="completed" fill="#06b6d4" name="Completed Tasks" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Learning Streak</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your daily learning consistency over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#131313" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Achievements */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Recent Achievements</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your latest milestones and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-gray-800" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">React Master</h3>
                    <p className="text-sm text-muted-foreground">Completed advanced React course with 95% score</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <Badge className="bg-gray-800 text-white">New</Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Consistency Champion</h3>
                    <p className="text-sm text-muted-foreground">Maintained 10-day learning streak</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Earned
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Community Helper</h3>
                    <p className="text-sm text-muted-foreground">Helped 5 students with their questions</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Earned
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Skills Breakdown */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Skills Breakdown</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your proficiency levels across different technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Distribution */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Skills Distribution</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Visual representation of your skill levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Learning Progress Radar */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Learning Progress</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your progress across different learning areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={progressData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Progress" dataKey="A" stroke="#131313" fill="#131313" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Strengths & Areas to Improve</CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-powered insights on your learning performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                    Strengths
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Frontend Development
                      </Badge>
                      <span className="text-sm text-muted-foreground">85% proficiency</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        CSS & Styling
                      </Badge>
                      <span className="text-sm text-muted-foreground">82% proficiency</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <TrendingDown className="w-4 h-4 text-orange-600 mr-2" />
                    Areas to Improve
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        DevOps
                      </Badge>
                      <span className="text-sm text-muted-foreground">45% proficiency</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        Testing
                      </Badge>
                      <span className="text-sm text-muted-foreground">58% proficiency</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-4 h-4 text-gray-800" />
                    <span className="font-medium text-gray-900">AI Recommendation</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Focus on DevOps fundamentals next. Your strong frontend skills will complement well with deployment
                    knowledge.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
