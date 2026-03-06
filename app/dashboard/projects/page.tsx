"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FolderOpen,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ProjectStatus = "active" | "planned" | "completed"

interface Project {
  id: string
  name: string
  course: string
  status: ProjectStatus
  due: string
  progress: number
  workspaceId: string
  type: "course" | "assignment" | "capstone"
}

const mockProjects: Project[] = [
  {
    id: "react-hooks-course",
    name: "React Hooks Mini‑Course",
    course: "Advanced React Patterns",
    status: "active",
    due: "Dec 12",
    progress: 75,
    workspaceId: "react-ecommerce",
    type: "course",
  },
  {
    id: "ml-linear-regression-assignment",
    name: "Linear Regression Lab",
    course: "Machine Learning Fundamentals",
    status: "active",
    due: "Dec 18",
    progress: 45,
    workspaceId: "ml-data-analysis",
    type: "assignment",
  },
  {
    id: "portfolio-capstone",
    name: "Full‑Stack Portfolio Project",
    course: "Capstone",
    status: "planned",
    due: "Jan 20",
    progress: 10,
    workspaceId: "mobile-app-design",
    type: "capstone",
  },
  {
    id: "js-fundamentals-quiz",
    name: "JavaScript Fundamentals Quiz Pack",
    course: "JavaScript Fundamentals",
    status: "completed",
    due: "Nov 30",
    progress: 100,
    workspaceId: "react-ecommerce",
    type: "assignment",
  },
]

export default function ProjectsPage() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectStatus>("all")
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [newCourse, setNewCourse] = useState("")
  const [newType, setNewType] = useState<Project["type"]>("assignment")
  const [newDue, setNewDue] = useState("TBD")

  const filteredProjects = useMemo(() => {
    const term = search.toLowerCase().trim()
    return projects.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.course.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term)
      return matchesStatus && matchesSearch
    })
  }, [projects, search, statusFilter])

  const active = filteredProjects.filter((p) => p.status === "active")
  const planned = filteredProjects.filter((p) => p.status === "planned")
  const completed = filteredProjects.filter((p) => p.status === "completed")

  const statusBadge = (status: ProjectStatus) => {
    if (status === "active") return "bg-green-100 text-green-700"
    if (status === "planned") return "bg-blue-100 text-blue-700"
    return "bg-purple-100 text-purple-700"
  }

  const handleCreateProject = () => {
    if (!newName.trim()) {
      toast({
        title: "Project name required",
        description: "Please give your project or assignment a clear name.",
        variant: "destructive",
      })
      return
    }

    const project: Project = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      course: newCourse.trim() || "Custom course",
      status: "active",
      due: newDue.trim() || "TBD",
      progress: 0,
      workspaceId: "react-ecommerce",
      type: newType,
    }

    setProjects((prev) => [project, ...prev])
    setIsNewOpen(false)
    setNewName("")
    setNewCourse("")
    setNewType("assignment")
    setNewDue("TBD")

    toast({
      title: "Project created (demo)",
      description: `"${project.name}" has been added to your active projects.`,
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects & assignments</h1>
          <p className="text-muted-foreground">
            Track all of your course projects, labs, and capstones in one place.
          </p>
        </div>
        <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <FolderOpen className="w-4 h-4 mr-2" />
              New project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new project (demo)</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="project-name" className="text-sm font-medium text-foreground">
                  Project name
                </label>
                <Input
                  id="project-name"
                  placeholder="e.g. Authentication module refactor"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="project-course" className="text-sm font-medium text-foreground">
                  Course / context
                </label>
                <Input
                  id="project-course"
                  placeholder="e.g. Advanced React Patterns"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="project-type" className="text-sm font-medium text-foreground">
                  Type
                </label>
                <select
                  id="project-type"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as Project["type"])}
                >
                  <option value="course">Course project</option>
                  <option value="assignment">Assignment</option>
                  <option value="capstone">Capstone</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="project-due" className="text-sm font-medium text-foreground">
                  Due (optional)
                </label>
                <Input
                  id="project-due"
                  placeholder="e.g. Jan 10"
                  value={newDue}
                  onChange={(e) => setNewDue(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsNewOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreateProject}>
                Save project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search / filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by project, course, or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() =>
            setStatusFilter((prev) => (prev === "all" ? "active" : prev === "active" ? "planned" : "all"))
          }
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">
            {statusFilter === "all"
              ? "All statuses"
              : statusFilter === "active"
              ? "Active only"
              : statusFilter === "planned"
              ? "Planned only"
              : "Completed only"}
          </span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main project list */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-3">
              {active.length === 0 ? (
                <Card>
                  <CardContent className="p-4 text-sm text-muted-foreground">
                    No active projects match your filters. Try adjusting the search term or status.
                  </CardContent>
                </Card>
              ) : (
                active.map((project) => (
                  <Card key={project.id} className="border-border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={statusBadge(project.status)}>
                            {project.status === "active" ? "In progress" : "Planned"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {project.type === "course"
                              ? "Course project"
                              : project.type === "assignment"
                              ? "Assignment"
                              : "Capstone"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Due {project.due}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base mt-2">{project.name}</CardTitle>
                      <CardDescription className="text-xs flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {project.course}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>Team workspace</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {project.progress >= 75
                              ? "Almost done"
                              : project.progress >= 40
                              ? "On track"
                              : "Just started"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/workspaces/${project.workspaceId}`} className="flex-1">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                            Open workspace
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toast({
                              title: "Checklist (demo)",
                              description:
                                "In a real app this could show remaining tasks or rubric items for this project.",
                            })
                          }
                        >
                          <Target className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="planned" className="space-y-3">
              {planned.length === 0 ? (
                <Card>
                  <CardContent className="p-4 text-sm text-muted-foreground">
                    You don&apos;t have any planned projects yet. Turn upcoming assignments into projects from your
                    courses.
                  </CardContent>
                </Card>
              ) : (
                planned.map((project) => (
                  <Card key={project.id} className="border-border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={statusBadge(project.status)}>
                          Planned
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Due {project.due}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base mt-2">{project.name}</CardTitle>
                      <CardDescription className="text-xs flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {project.course}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <p className="text-xs text-muted-foreground">
                        Kick off this project from your workspace once you&apos;re ready to start.
                      </p>
                      <Link href={`/dashboard/workspaces/${project.workspaceId}`}>
                        <Button size="sm" variant="outline" className="w-full">
                          Plan in workspace
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {completed.length === 0 ? (
                <Card>
                  <CardContent className="p-4 text-sm text-muted-foreground">
                    Completed projects will show here once you finish them.
                  </CardContent>
                </Card>
              ) : (
                completed.map((project) => (
                  <Card key={project.id} className="border-border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={statusBadge(project.status)}>
                          Completed
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Submitted {project.due}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base mt-2">{project.name}</CardTitle>
                      <CardDescription className="text-xs flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {project.course}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>Graded • great job keeping a consistent streak!</span>
                      </div>
                      <Link href={`/dashboard/workspaces/${project.workspaceId}`}>
                        <Button size="sm" variant="outline" className="w-full">
                          Review work
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar summary */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Project overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Active projects</span>
                <span className="font-semibold text-foreground">{active.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Planned</span>
                <span className="font-semibold text-foreground">{planned.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Completed</span>
                <span className="font-semibold text-foreground">{completed.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Streak insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>
                You&apos;ve touched at least one project on{" "}
                <span className="font-semibold text-foreground">4 of the last 5 days</span>.
              </p>
              <p>
                Keeping small but consistent progress sessions (25–45 minutes) is one of the best predictors of
                finishing capstones.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                Suggested next step
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p>
                Spend 30 minutes today on <span className="font-semibold text-foreground">Linear Regression Lab</span>{" "}
                to stay ahead of the deadline.
              </p>
              <Link href="/dashboard/workspaces/ml-data-analysis">
                <Button size="sm" variant="outline" className="w-full mt-1">
                  Jump to workspace
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

