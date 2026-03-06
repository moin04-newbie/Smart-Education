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
  MessageCircle,
  Users,
  TrendingUp,
  Heart,
  Share,
  Bookmark,
  Plus,
  Pin,
  Award,
  Eye,
  ThumbsUp,
  MessageSquare,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PostCategory = "Discussion" | "Success Story" | "Help Needed"

interface CommunityPost {
  id: string
  category: PostCategory
  title: string
  excerpt: string
  tags: string[]
  author: string
  authorInitials: string
  role: string
  timeAgo: string
  views: number
  likes: number
  replies: number
  content: string[]
}

export default function CommunityPage() {
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newBody, setNewBody] = useState("")
  const [newTags, setNewTags] = useState("react, javascript")

  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "react-state-2024",
      category: "Discussion",
      title: "Best practices for React state management in 2024?",
      excerpt:
        "I'm working on a large React application and wondering about the current best practices for state management.",
      tags: ["React", "JavaScript"],
      author: "Alice Miller",
      authorInitials: "AM",
      role: "Computer Science Student",
      timeAgo: "3 hours ago",
      views: 156,
      likes: 12,
      replies: 8,
      content: [
        "I'm working on a large React application and wondering about the current best practices for state management.",
        "Right now I'm using Context API for global state and local component state for everything else, but it's starting to feel hard to scale.",
        "I'm considering Redux Toolkit, Zustand, or Jotai. What are you using in production in 2024, and what tradeoffs have you seen?",
      ],
    },
    {
      id: "career-success-story",
      category: "Success Story",
      title: "Just landed my first developer job! 🎉",
      excerpt:
        "After 8 months of learning through SmartEd, I finally got my first job as a frontend developer.",
      tags: ["Career"],
      author: "Sarah Kim",
      authorInitials: "SK",
      role: "Web Development Student",
      timeAgo: "5 hours ago",
      views: 423,
      likes: 67,
      replies: 15,
      content: [
        "After 8 months of learning through SmartEd, I finally got my first job as a frontend developer.",
        "What helped me most was: focusing on one stack (React + Node), building 3 portfolio projects, and practicing interview questions daily for the last month.",
        "Happy to answer questions from anyone else on the same path!",
      ],
    },
    {
      id: "nn-help",
      category: "Help Needed",
      title: "Struggling with neural network implementation",
      excerpt:
        "I'm trying to implement a basic neural network from scratch in Python but getting stuck on backprop.",
      tags: ["Python", "Machine Learning"],
      author: "Mike Johnson",
      authorInitials: "MJ",
      role: "Data Science Student",
      timeAgo: "1 day ago",
      views: 89,
      likes: 5,
      replies: 12,
      content: [
        "I'm trying to implement a basic neural network from scratch in Python but getting stuck on the backpropagation algorithm.",
        "I conceptually understand gradients, but my implementation keeps blowing up and the loss becomes NaN.",
        "Does anyone have resources or a simple walkthrough you recommend for debugging this kind of thing?",
      ],
    },
  ])

  const filteredPosts = useMemo(() => {
    const term = search.toLowerCase().trim()
    if (!term) return posts
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term)),
    )
  }, [posts, search])

  const handleCreatePost = () => {
    if (!newTitle.trim()) {
      toast({
        title: "Title required",
        description: "Give your post a short, descriptive title.",
        variant: "destructive",
      })
      return
    }

    const tags = newTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      category: "Discussion",
      title: newTitle.trim(),
      excerpt: newBody.trim().slice(0, 160) || "New community discussion created by you.",
      tags: tags.length ? tags : ["General"],
      author: "You",
      authorInitials: "YO",
      role: "SmartEd Member",
      timeAgo: "Just now",
      views: 0,
      likes: 0,
      replies: 0,
      content: newBody
        ? newBody.split("\n").filter((p) => p.trim().length > 0)
        : ["This is demo content for your new post."],
    }

    setPosts((prev) => [newPost, ...prev])
    setNewTitle("")
    setNewBody("")
    setNewTags("react, javascript")
    setIsNewOpen(false)

    toast({
      title: "Post published (demo)",
      description: `"${newPost.title}" has been added to the Discussions feed.`,
    })
  }

  const openPost = (post: CommunityPost) => {
    setSelectedPost(post)
    setViewerOpen(true)
  }

  const categoryBadgeClasses = (category: PostCategory) => {
    if (category === "Discussion") return "bg-blue-100 text-blue-700"
    if (category === "Success Story") return "bg-green-100 text-green-700"
    return "bg-orange-100 text-orange-700"
  }
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Community</h1>
          <p className="text-muted-foreground">Connect with students worldwide and share knowledge</p>
        </div>
        <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new discussion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input
                  id="post-title"
                  placeholder="e.g. Best way to learn TypeScript as a React dev?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-body">What do you want to ask or share?</Label>
                <Textarea
                  id="post-body"
                  placeholder="Write a short description of your question, idea, or experience..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-tags">Tags (comma separated)</Label>
                <Input
                  id="post-tags"
                  placeholder="react, javascript"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsNewOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreatePost}>
                Post
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
            placeholder="Search discussions..."
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

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <Tabs defaultValue="discussions" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="questions">Q&A</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="space-y-4">
              {/* Pinned Post */}
              <Card className="border-border border-l-4 border-l-purple-600">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Pin className="w-4 h-4 text-purple-600" />
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Pinned
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Announcement
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">Welcome to SmartEd Community!</CardTitle>
                  <CardDescription>Guidelines and tips for making the most of our learning community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">SE</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">SmartEd Team</p>
                      <p className="text-xs text-muted-foreground">Admin • 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>2.3k views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>89 likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>23 replies</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Discussion Posts */}
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border-border hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openPost(post)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className={categoryBadgeClasses(post.category)}>
                        {post.category}
                      </Badge>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={
                            post.category === "Success Story"
                              ? "bg-green-100 text-green-600 text-xs"
                              : post.category === "Help Needed"
                              ? "bg-orange-100 text-orange-600 text-xs"
                              : "bg-blue-100 text-blue-600 text-xs"
                          }
                        >
                          {post.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{post.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {post.role} • {post.timeAgo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.replies} replies</span>
                        </div>
                      </div>
                      <div
                        className="flex items-center space-x-2"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: "Liked (demo)",
                              description: "Reactions are stored locally in this demo.",
                            })
                          }
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: "Saved for later (demo)",
                              description: "Use this pattern to connect to a real bookmarks API.",
                            })
                          }
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast({
                              title: "Share link (demo)",
                              description: "In a real app this would copy a deep link to the clipboard.",
                            })
                          }
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="questions">
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Questions & Answers</h3>
                <p className="text-muted-foreground">Get help from the community with your questions.</p>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="text-center py-12">
                <Share className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Shared Resources</h3>
                <p className="text-muted-foreground">Discover resources shared by community members.</p>
              </div>
            </TabsContent>

            <TabsContent value="challenges">
              <div className="text-center py-12">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Community Challenges</h3>
                <p className="text-muted-foreground">Participate in coding challenges and competitions.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">Total Members</span>
                </div>
                <span className="font-semibold text-foreground">12,456</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Discussions</span>
                </div>
                <span className="font-semibold text-foreground">3,289</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Active Today</span>
                </div>
                <span className="font-semibold text-foreground">1,234</span>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  #react
                </Badge>
                <span className="text-sm text-muted-foreground">234 posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  #javascript
                </Badge>
                <span className="text-sm text-muted-foreground">189 posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  #python
                </Badge>
                <span className="text-sm text-muted-foreground">156 posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  #machinelearning
                </Badge>
                <span className="text-sm text-muted-foreground">98 posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  #webdev
                </Badge>
                <span className="text-sm text-muted-foreground">87 posts</span>
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">JS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">John Smith</p>
                  <p className="text-xs text-muted-foreground">234 helpful answers</p>
                </div>
                <Award className="w-4 h-4 text-yellow-500" />
              </div>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">AM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Alice Miller</p>
                  <p className="text-xs text-muted-foreground">189 helpful answers</p>
                </div>
                <Award className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-100 text-green-600 text-xs">SK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Sarah Kim</p>
                  <p className="text-xs text-muted-foreground">156 helpful answers</p>
                </div>
                <Award className="w-4 h-4 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
                onClick={() => setIsNewOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share Resource
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Award className="w-4 h-4 mr-2" />
                Join Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Post viewer */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-xl">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPost.title}</DialogTitle>
                <CardDescription className="mt-1">
                  {selectedPost.category} • {selectedPost.tags.join(", ")}
                </CardDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                {selectedPost.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-xs text-muted-foreground mt-2">
                  This is demo content rendered inside the app. Connect this view to your real community backend to show
                  live replies and reactions.
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
