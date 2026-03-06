 "use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Edit,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  Github,
  Linkedin,
  Globe,
  Star,
  Trophy,
  Target,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Your student portfolio and achievements</p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() =>
            toast({
              title: "Edit profile",
              description: "Profile editing is handled from the Settings page in this demo.",
            })
          }
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border">
            <CardContent className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/diverse-student-profiles.png" alt="John Smith" />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">JS</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-foreground mb-1">John Smith</h2>
              <p className="text-muted-foreground mb-2">Full-Stack Developer Student</p>
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>Joined March 2024</span>
              </div>
              <div className="flex justify-center space-x-2">
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">Courses Completed</span>
                </div>
                <span className="font-semibold text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Certificates</span>
                </div>
                <span className="font-semibold text-foreground">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Study Groups</span>
                </div>
                <span className="font-semibold text-foreground">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-muted-foreground">Learning Streak</span>
                </div>
                <span className="font-semibold text-foreground">12 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">JavaScript</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">React</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">CSS</span>
                  <span className="text-sm text-muted-foreground">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Python</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Bio */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Passionate full-stack developer student with a strong foundation in modern web technologies.
                    Currently focusing on React, Node.js, and cloud technologies. I enjoy building user-friendly
                    applications and contributing to open-source projects. Always eager to learn new technologies and
                    collaborate with fellow developers.
                  </p>
                </CardContent>
              </Card>

              {/* Current Learning Path */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Current Learning Path</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your active learning journey and progress
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">Advanced React Development</h3>
                      <p className="text-sm text-muted-foreground">
                        Master React hooks, context, and performance optimization
                      </p>
                      <Progress value={75} className="mt-2 h-2" />
                      <p className="text-xs text-muted-foreground mt-1">75% complete • 3 weeks remaining</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">Node.js & Express</h3>
                      <p className="text-sm text-muted-foreground">Build scalable backend applications</p>
                      <Progress value={45} className="mt-2 h-2" />
                      <p className="text-xs text-muted-foreground mt-1">45% complete • 5 weeks remaining</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Featured Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">E-commerce React App</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Completed
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-muted-foreground">4.8</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user
                      authentication, product catalog, shopping cart, and payment integration.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        React
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Node.js
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        MongoDB
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Stripe
                      </Badge>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">Task Management Dashboard</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          In Progress
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-muted-foreground">4.5</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Collaborative task management application with real-time updates, drag-and-drop functionality, and
                      team collaboration features.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        React
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Socket.io
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        PostgreSQL
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Badges & Certificates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Trophy className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-medium text-foreground text-sm">React Master</h3>
                      <p className="text-xs text-muted-foreground">Completed advanced React course</p>
                    </div>

                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Award className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-medium text-foreground text-sm">JavaScript Pro</h3>
                      <p className="text-xs text-muted-foreground">Advanced JavaScript certification</p>
                    </div>

                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-foreground text-sm">Goal Achiever</h3>
                      <p className="text-xs text-muted-foreground">Completed 10 learning goals</p>
                    </div>

                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="font-medium text-foreground text-sm">Team Player</h3>
                      <p className="text-xs text-muted-foreground">Active in 5+ study groups</p>
                    </div>

                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="w-8 h-8 text-pink-600" />
                      </div>
                      <h3 className="font-medium text-foreground text-sm">Top Contributor</h3>
                      <p className="text-xs text-muted-foreground">50+ helpful community answers</p>
                    </div>

                    <div className="text-center p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="w-8 h-8 text-teal-600" />
                      </div>
                      <h3 className="font-medium text-foreground text-sm">Knowledge Seeker</h3>
                      <p className="text-xs text-muted-foreground">Completed 20+ courses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border-l-4 border-l-purple-600 bg-muted/30">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Earned "React Master" badge</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border-l-4 border-l-green-600 bg-muted/30">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Completed "Advanced React Patterns" course</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border-l-4 border-l-blue-600 bg-muted/30">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Joined "Web Dev Bootcamp" study group</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border-l-4 border-l-orange-600 bg-muted/30">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Achieved 10-day learning streak</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
