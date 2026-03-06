"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, TrendingUp, Sparkles } from "lucide-react"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Get Discovered */}
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <TrendingUp className="h-4 w-4 mr-2" />
            Get discovered
            <div className="ml-2 w-2 h-2 bg-red-500 rounded-full"></div>
          </Button>

          {/* SmartEd Pro */}
          <Button
            size="sm"
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            SmartEd Pro
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">1</span>
            </div>
          </Button>

          {/* User Menu */}
          <Avatar className="h-8 w-8">
            <AvatarImage src="/diverse-student-profiles.png" alt="Student" />
            <AvatarFallback className="bg-gray-100 text-gray-800">JS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
