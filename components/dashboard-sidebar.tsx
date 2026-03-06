"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Home,
  FolderOpen,
  Github,
  Users,
  BarChart3,
  Brain,
  User,
  Settings,
  ChevronDown,
  Plus,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
  { name: "Home", href: "/dashboard/home", icon: Home, badge: "BETA" },
  { name: "Workspaces", href: "/dashboard/workspaces", icon: FolderOpen },
  { name: "Repository", href: "/dashboard/repository", icon: Github },
  { name: "Community", href: "/dashboard/community", icon: Users },
]

const identityNavigation = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

const leadsNavigation = [{ name: "AI Mentor", href: "/dashboard/ai-mentor", icon: Brain }]

const projectsNavigation = [
  { name: "Projects & assignments", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">SmartEd</span>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/diverse-student-profiles.png" alt="Student" />
            <AvatarFallback className="bg-gray-100 text-gray-800">JS</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Student workspace</p>
            <p className="text-xs text-muted-foreground truncate">John Smith</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? /* Updated active state from purple to night black theme */
                        "bg-gray-100 text-gray-800"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs bg-gray-100 text-gray-700">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Identity Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">IDENTITY</h3>
          <div className="mt-2 space-y-1">
            {identityNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? /* Updated active state from purple to night black theme */
                          "bg-gray-100 text-gray-800"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Leads Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">LEARNING</h3>
          <div className="mt-2 space-y-1">
            {leadsNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? /* Updated active state from purple to night black theme */
                          "bg-gray-100 text-gray-800"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            PROJECTS & SETTINGS
          </h3>
          <div className="mt-2 space-y-1">
            {projectsNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? /* Updated active state from purple to night black theme */
                          "bg-gray-100 text-gray-800"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.name === "Projects & assignments" && <Plus className="ml-auto h-4 w-4" />}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Promotion */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/ai-assistant-concept.png" alt="AI" />
              <AvatarFallback className="bg-gray-200 text-gray-800 text-xs">AI</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800">Get SmartEd</p>
              <p className="text-xs text-gray-700">AI</p>
            </div>
            <Badge className="bg-gray-800 text-white text-xs">PRO</Badge>
          </div>
          <p className="text-xs text-gray-700 mt-2">free with Pro</p>
        </div>
      </div>
    </div>
  )
}
