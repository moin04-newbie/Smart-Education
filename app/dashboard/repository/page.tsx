 "use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  BookOpen,
  FileText,
  Code,
  Github,
  Star,
  Download,
  Eye,
  Heart,
  MessageCircle,
  Tag,
  Upload,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ResourceType = "tutorial" | "code" | "docs"

interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  author: string
  authorInitials: string
  meta: string
  views: string
  likes: string
  extraStatLabel: string
  extraStatValue: string
  content: string[]
}

export default function RepositoryPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadType, setUploadType] = useState<ResourceType>("tutorial")
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const [resources, setResources] = useState<Resource[]>([
    {
      id: "react-hooks-guide",
      title: "React Hooks Complete Guide",
      description: "Comprehensive tutorial covering all React hooks with examples",
      type: "tutorial",
      author: "John Smith",
      authorInitials: "JS",
      meta: "2 days ago",
      views: "1.2k",
      likes: "89",
      extraStatLabel: "Downloads",
      extraStatValue: "234",
      content: [
        "Deep dive into useState, useEffect, and useContext with practical examples.",
        "Quiz sections after each chapter to check your understanding.",
        "Hands-on project: build a small dashboard using custom hooks.",
      ],
    },
    {
      id: "auth-boilerplate",
      title: "Authentication Boilerplate",
      description: "Ready-to-use authentication system with JWT and bcrypt",
      type: "code",
      author: "Alice Miller",
      authorInitials: "AM",
      meta: "1 week ago",
      views: "856",
      likes: "67",
      extraStatLabel: "Forks",
      extraStatValue: "45",
      content: [
        "Express + JWT authentication with refresh tokens.",
        "Role-based access control demo middleware.",
        "Postman collection with example requests.",
      ],
    },
    {
      id: "api-design-best-practices",
      title: "API Design Best Practices",
      description: "Comprehensive guide to designing RESTful APIs",
      type: "docs",
      author: "Sarah Kim",
      authorInitials: "SK",
      meta: "3 days ago",
      views: "2.1k",
      likes: "156",
      extraStatLabel: "Comments",
      extraStatValue: "23",
      content: [
        "Guidelines for resource naming, versioning, and error handling.",
        "Examples of pagination, filtering, and sorting patterns.",
        "Checklist you can use when reviewing a new API design.",
      ],
    },
  ])

  const filteredResources = useMemo(() => {
    const term = search.toLowerCase().trim()
    if (!term) return resources
    return resources.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term),
    )
  }, [resources, search])

  const recentUploads = useMemo(() => {
    return [...resources].slice(-3).reverse()
  }, [resources])

  const handleUpload = () => {
    if (!uploadTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please give your resource a descriptive title.",
        variant: "destructive",
      })
      return
    }

    const newResource: Resource = {
      id: `upload-${Date.now()}`,
      title: uploadTitle.trim(),
      description: uploadDescription.trim() || "User-uploaded learning resource.",
      type: uploadType,
      author: "You",
      authorInitials: "YO",
      meta: "Just now",
      views: "0",
      likes: "0",
      extraStatLabel: uploadType === "code" ? "Forks" : "Downloads",
      extraStatValue: "0",
      content: [
        "This is demo content for your uploaded resource.",
        "In a real app, you would render the actual file, code, or documentation here.",
      ],
    }

    setResources((prev) => [newResource, ...prev])
    setUploadTitle("")
    setUploadDescription("")
    setUploadType("tutorial")
    setIsUploadOpen(false)

    toast({
      title: "Resource uploaded (demo)",
      description: `"${newResource.title}" has been added to Featured Resources.`,
    })
  }

  const openViewer = (resource: Resource) => {
    setSelectedResource(resource)
    setViewerOpen(true)
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Repository</h1>
          <p className="text-muted-foreground">Central knowledge hub with docs, tutorials, and resources</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload demo resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resource-title">Title</Label>
                <Input
                  id="resource-title"
                  placeholder="e.g. Async JavaScript Cheatsheet"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resource-type">Type</Label>
                <select
                  id="resource-type"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as ResourceType)}
                >
                  <option value="tutorial">Tutorial</option>
                  <option value="code">Code</option>
                  <option value="docs">Docs</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resource-description">Short description</Label>
                <Textarea
                  id="resource-description"
                  placeholder="Describe what this resource helps a student learn..."
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleUpload}>
                Save to repository
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
            placeholder="Search resources..."
            className="pl-10 border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Featured Resources */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Featured Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.length === 0 && (
                <div className="col-span-full text-sm text-muted-foreground">
                  No resources match “{search}”. Try a different search or upload a new resource.
                </div>
              )}
              {filteredResources.map((resource) => {
                const isTutorial = resource.type === "tutorial"
                const isCode = resource.type === "code"
                return (
                  <Card key={resource.id} className="border-border hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isTutorial
                                ? "bg-purple-100"
                                : isCode
                                ? "bg-blue-100"
                                : "bg-green-100"
                            }`}
                          >
                            {isTutorial && <BookOpen className="w-4 h-4 text-purple-600" />}
                            {isCode && <Code className="w-4 h-4 text-blue-600" />}
                            {!isTutorial && !isCode && <FileText className="w-4 h-4 text-green-600" />}
                          </div>
                          <Badge
                            variant="secondary"
                            className={
                              isTutorial
                                ? "bg-purple-100 text-purple-700"
                                : isCode
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {isTutorial ? "Tutorial" : isCode ? "Code" : "Documentation"}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{resource.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{resource.likes} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {isCode ? <Github className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                          <span>{resource.extraStatValue}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback
                            className={
                              isTutorial
                                ? "bg-purple-100 text-purple-600 text-xs"
                                : isCode
                                ? "bg-blue-100 text-blue-600 text-xs"
                                : "bg-green-100 text-green-600 text-xs"
                            }
                          >
                            {resource.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">by {resource.author}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{resource.meta}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => openViewer(resource)}
                        >
                          {isTutorial ? "View Resource" : isCode ? "View Code" : "Read Docs"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toast({
                              title: "Demo action",
                              description:
                                "In a real app, this would download the file or open the external repo.",
                            })
                          }
                        >
                          {isCode ? <Github className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm">Tutorials</h3>
                  <p className="text-xs text-muted-foreground">234 resources</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm">Code Samples</h3>
                  <p className="text-xs text-muted-foreground">189 resources</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm">Documentation</h3>
                  <p className="text-xs text-muted-foreground">156 resources</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Github className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm">GitHub Repos</h3>
                  <p className="text-xs text-muted-foreground">98 resources</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Tag className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm">APIs</h3>
                  <p className="text-xs text-muted-foreground">67 resources</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm">Submissions</h3>
                  <p className="text-xs text-muted-foreground">45 resources</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Uploads */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Uploads</h2>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recentUploads.map((resource) => {
                    const isTutorial = resource.type === "tutorial"
                    const isCode = resource.type === "code"
                    return (
                      <div
                        key={resource.id}
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => openViewer(resource)}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isTutorial
                              ? "bg-purple-100"
                              : isCode
                              ? "bg-blue-100"
                              : "bg-green-100"
                          }`}
                        >
                          {isTutorial && <BookOpen className="w-5 h-5 text-purple-600" />}
                          {isCode && <Code className="w-5 h-5 text-blue-600" />}
                          {!isTutorial && !isCode && <FileText className="w-5 h-5 text-green-600" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {isTutorial ? "Tutorial" : isCode ? "Code" : "Docs"} • Uploaded by {resource.author}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{resource.meta}</p>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            <span>{resource.views} views</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar but filtered */}
        <TabsContent value="docs">
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Documentation</h3>
            <p className="text-muted-foreground">Browse through comprehensive documentation and guides.</p>
          </div>
        </TabsContent>

        <TabsContent value="tutorials">
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Tutorials</h3>
            <p className="text-muted-foreground">Step-by-step tutorials and learning materials.</p>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="text-center py-12">
            <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Code Samples</h3>
            <p className="text-muted-foreground">Reusable code snippets and examples.</p>
          </div>
        </TabsContent>

        <TabsContent value="apis">
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">APIs</h3>
            <p className="text-muted-foreground">API documentation and integration guides.</p>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="text-center py-12">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Student Submissions</h3>
            <p className="text-muted-foreground">Projects and assignments submitted by students.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Resource viewer */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-xl">
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedResource.title}</DialogTitle>
                <CardDescription className="mt-1">
                  {selectedResource.description}
                </CardDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                {selectedResource.content.map((line) => (
                  <p key={line}>• {line}</p>
                ))}
                <p className="text-xs text-muted-foreground mt-2">
                  This is demo content rendered inside the app. Replace this with your real markdown,
                  code viewer, or document renderer later.
                </p>
              </div>
              <DialogFooter className="mt-4">
                <Button onClick={() => setViewerOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
