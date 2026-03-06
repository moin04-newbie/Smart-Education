 "use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  FolderOpen,
  Calendar,
  MoreHorizontal,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WorkspacesPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")

  type WorkspaceStatus = "active" | "in-review" | "planning" | "completed" | "archived"

  interface Workspace {
    id: string
    name: string
    description: string
    status: WorkspaceStatus
    due: string
    progress: number
    members: number
  }

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: "react-ecommerce",
      name: "React E-commerce App",
      description: "Building a full-stack e-commerce platform with React and Node.js",
      status: "active",
      due: "Dec 15",
      progress: 75,
      members: 3,
    },
    {
      id: "ml-data-analysis",
      name: "ML Data Analysis",
      description: "Analyzing customer behavior data using Python and scikit-learn",
      status: "in-review",
      due: "Dec 20",
      progress: 90,
      members: 2,
    },
    {
      id: "mobile-app-design",
      name: "Mobile App Design",
      description: "UI/UX design for a fitness tracking mobile application",
      status: "planning",
      due: "Jan 10",
      progress: 25,
      members: 5,
    },
  ])

  const filteredWorkspaces = useMemo(() => {
    const term = search.toLowerCase().trim()
    if (!term) return workspaces
    return workspaces.filter(
      (w) =>
        w.name.toLowerCase().includes(term) ||
        w.description.toLowerCase().includes(term) ||
        w.status.toLowerCase().includes(term),
    )
  }, [search, workspaces])

  const activeWorkspaces = filteredWorkspaces.filter((w) => w.status === "active" || w.status === "planning" || w.status === "in-review")
  const completedWorkspaces = filteredWorkspaces.filter((w) => w.status === "completed")
  const archivedWorkspaces = filteredWorkspaces.filter((w) => w.status === "archived")

  const handleCreateWorkspace = () => {
    if (!newName.trim()) {
      toast({
        title: "Workspace name required",
        description: "Please enter a name for your new workspace.",
        variant: "destructive",
      })
      return
    }

    const workspace: Workspace = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      description: newDescription.trim() || "New custom workspace",
      status: "active",
      due: "TBD",
      progress: 0,
      members: 1,
    }

    setWorkspaces((prev) => [workspace, ...prev])
    setNewName("")
    setNewDescription("")
    setIsNewOpen(false)

    toast({
      title: "Workspace created",
      description: `"${workspace.name}" has been added to your active projects.`,
    })
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workspaces</h1>
          <p className="text-muted-foreground">Create and manage your collaborative projects</p>
        </div>
        <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new workspace</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Name</Label>
                <Input
                  id="workspace-name"
                  placeholder="e.g. Portfolio Website"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workspace-description">Description</Label>
                <Textarea
                  id="workspace-description"
                  placeholder="Short description of what you’re building"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsNewOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateWorkspace}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search workspaces..."
            className="pl-10 border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast({
              title: "Demo filter",
              description: "Filtering is simulated in this demo. Wire this up to your backend query.",
            })
          }
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Active Projects */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Active Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeWorkspaces.length === 0 && (
                <div className="col-span-full text-sm text-muted-foreground">
                  No active workspaces match “{search}”. Try a different search or create a new workspace.
                </div>
              )}
              {/* Render workspaces from state */}
              {activeWorkspaces.map((workspace) => (
                <Card key={workspace.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-4 h-4 text-purple-600" />
                      </div>
                        <Badge
                          variant="secondary"
                          className={
                            workspace.status === "active"
                              ? "bg-green-100 text-green-700"
                              : workspace.status === "in-review"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {workspace.status === "in-review"
                            ? "In Review"
                            : workspace.status === "planning"
                            ? "Planning"
                            : "Active"}
                        </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                    <CardTitle className="text-lg">{workspace.name}</CardTitle>
                    <CardDescription>{workspace.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">JS</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">AM</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="bg-green-100 text-green-600 text-xs">SK</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-sm text-muted-foreground">3 members</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                        <span>Due {workspace.due}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                        <span>{workspace.progress}% complete</span>
                    </div>
                  </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/workspaces/${workspace.id}?name=${encodeURIComponent(
                          workspace.name,
                        )}&description=${encodeURIComponent(workspace.description)}&due=${encodeURIComponent(
                          workspace.due,
                        )}&progress=${workspace.progress}`}
                      >
                        <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                          Open Project
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">John Smith</span> updated the task board in{" "}
                        <span className="font-medium">React E-commerce App</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">AM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Alice Miller</span> completed the authentication module in{" "}
                        <span className="font-medium">React E-commerce App</span>
                      </p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-600 text-xs">SK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Sarah Kim</span> shared new resources in{" "}
                        <span className="font-medium">ML Data Analysis</span>
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">MK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Mike Johnson</span> created a new workspace{" "}
                        <span className="font-medium">Mobile App Design</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Project Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Web Development</h3>
                  <p className="text-xs text-muted-foreground">Full-stack web projects</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Data Science</h3>
                  <p className="text-xs text-muted-foreground">ML and analytics projects</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Mobile Apps</h3>
                  <p className="text-xs text-muted-foreground">iOS and Android development</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Design</h3>
                  <p className="text-xs text-muted-foreground">UI/UX and graphic design</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {activeWorkspaces.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground text-sm">
                You don’t have any active workspaces yet. Create one from the top-right button.
              </div>
            ) : (
              activeWorkspaces.map((workspace) => (
                <Card key={workspace.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FolderOpen className="w-4 h-4 text-purple-600" />
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            workspace.status === "active"
                              ? "bg-green-100 text-green-700"
                              : workspace.status === "in-review"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {workspace.status === "in-review"
                            ? "In Review"
                            : workspace.status === "planning"
                            ? "Planning"
                            : "Active"}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{workspace.name}</CardTitle>
                    <CardDescription>{workspace.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Due {workspace.due}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>{workspace.progress}% complete</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/workspaces/${workspace.id}?name=${encodeURIComponent(
                          workspace.name,
                        )}&description=${encodeURIComponent(workspace.description)}&due=${encodeURIComponent(
                          workspace.due,
                        )}&progress=${workspace.progress}`}
                      >
                        <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                          Open Project
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-12">
            {completedWorkspaces.length === 0 ? (
              <>
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Completed Projects</h3>
                <p className="text-muted-foreground">Your finished workspaces will appear here.</p>
              </>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedWorkspaces.map((workspace) => (
                  <Card key={workspace.id} className="border-border hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-4 h-4 text-green-600" />
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{workspace.name}</CardTitle>
                      <CardDescription>{workspace.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="text-center py-12">
            {archivedWorkspaces.length === 0 ? (
              <>
                <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Archived Projects</h3>
                <p className="text-muted-foreground">Your archived workspaces will appear here.</p>
              </>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {archivedWorkspaces.map((workspace) => (
                  <Card key={workspace.id} className="border-border hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-4 h-4 text-gray-600" />
                          </div>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            Archived
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{workspace.name}</CardTitle>
                      <CardDescription>{workspace.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
