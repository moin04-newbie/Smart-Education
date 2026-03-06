"use client"

import { useMemo } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, CheckCircle, FolderOpen, ListChecks, Users } from "lucide-react"
import Link from "next/link"

const demoTasks: Record<
  string,
  { title: string; status: "todo" | "in-progress" | "done"; estimate: string }[]
> = {
  "react-ecommerce": [
    { title: "Set up product catalog schema", status: "done", estimate: "2h" },
    { title: "Implement cart page UI", status: "in-progress", estimate: "3h" },
    { title: "Integrate checkout API", status: "todo", estimate: "4h" },
  ],
  "ml-data-analysis": [
    { title: "Clean customer dataset", status: "done", estimate: "1.5h" },
    { title: "Train baseline model", status: "in-progress", estimate: "2h" },
    { title: "Prepare presentation notebook", status: "todo", estimate: "2h" },
  ],
  "mobile-app-design": [
    { title: "Create onboarding flow wireframes", status: "in-progress", estimate: "3h" },
    { title: "Design activity dashboard", status: "todo", estimate: "4h" },
    { title: "Handoff components to devs", status: "todo", estimate: "2h" },
  ],
}

export default function WorkspaceDetailPage() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()

  const id = params.id
  const name = searchParams.get("name") ?? "Workspace"
  const description = searchParams.get("description") ?? "Internal workspace view with demo data."
  const due = searchParams.get("due") ?? "TBD"
  const progress = Number(searchParams.get("progress") ?? "0")

  const tasks =
    demoTasks[id] ?? [
      { title: "Define project scope", status: "in-progress", estimate: "1h" },
      { title: "Break work into milestones", status: "todo", estimate: "2h" },
      { title: "Invite collaborators", status: "todo", estimate: "30m" },
    ]

  const completedCount = useMemo(() => tasks.filter((t) => t.status === "done").length, [tasks])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard/workspaces">
            <Button variant="ghost" size="icon" className="mr-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-5 h-5 text-purple-600" />
              <h1 className="text-2xl font-bold text-foreground">{name}</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Workspace overview with internal demo data</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          Active
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Overview</CardTitle>
              <CardDescription className="text-muted-foreground">{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Due {due}</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>{progress}% complete</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Overall progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ListChecks className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg font-semibold text-foreground">Tasks</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Demo task list for this workspace. In a real app, this would come from your backend.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/40 text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">{task.title}</p>
                    <p className="text-xs text-muted-foreground">Estimate: {task.estimate}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      task.status === "done"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {task.status === "done"
                      ? "Done"
                      : task.status === "in-progress"
                      ? "In Progress"
                      : "To Do"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Team snapshot</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                This project is using <span className="font-medium">demo members</span>. You can wire this to your real
                team data later.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>John Smith – Lead</li>
                <li>Sarah Kim – Developer</li>
                <li>Alice Miller – Reviewer</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Quick actions</CardTitle>
              <CardDescription className="text-muted-foreground">
                These are placeholders you can later connect to real flows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                View timeline
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                Manage tasks
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                Invite collaborators
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>
                Tasks completed: <span className="font-medium">{completedCount}</span> / {tasks.length}
              </p>
              <p>
                Current progress: <span className="font-medium">{progress}%</span>
              </p>
              <p>Due date: {due}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

