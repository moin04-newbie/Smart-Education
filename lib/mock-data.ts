// Mock data for SmartEd AI Mentor
export interface ChatMessage {
  id: number
  type: "ai" | "user"
  content: string
  timestamp: string
}

export interface StudyPlan {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  topics: string[]
  resources: Resource[]
  progress: number
}

export interface Resource {
  id: string
  title: string
  type: "video" | "article" | "tutorial" | "practice" | "book"
  url: string
  duration?: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

export interface LearningInsight {
  id: string
  type: "tip" | "focus" | "progress" | "recommendation"
  title: string
  description: string
  icon: string
  color: string
  priority: "high" | "medium" | "low"
}

export interface UserProgress {
  totalHours: number
  completedCourses: number
  currentStreak: number
  skills: Skill[]
  weeklyGoal: number
  weeklyProgress: number
}

export interface Skill {
  name: string
  level: number
  category: string
  lastPracticed: string
}

// Mock user progress data
export const mockUserProgress: UserProgress = {
  totalHours: 156,
  completedCourses: 24,
  currentStreak: 12,
  weeklyGoal: 20,
  weeklyProgress: 15,
  skills: [
    { name: "JavaScript", level: 85, category: "Programming", lastPracticed: "2 hours ago" },
    { name: "React", level: 78, category: "Frontend", lastPracticed: "1 day ago" },
    { name: "Python", level: 65, category: "Programming", lastPracticed: "3 days ago" },
    { name: "CSS", level: 82, category: "Frontend", lastPracticed: "1 day ago" },
    { name: "Node.js", level: 58, category: "Backend", lastPracticed: "5 days ago" },
    { name: "TypeScript", level: 45, category: "Programming", lastPracticed: "1 week ago" },
  ]
}

// Mock study plans
export const mockStudyPlans: StudyPlan[] = [
  {
    id: "react-hooks-plan",
    title: "Master React Hooks",
    description: "Complete guide to React hooks from basics to advanced patterns",
    duration: "2 weeks",
    difficulty: "Intermediate",
    topics: ["useState", "useEffect", "useContext", "useReducer", "Custom Hooks"],
    progress: 0,
    resources: [
      {
        id: "react-hooks-video",
        title: "React Hooks Tutorial",
        type: "video",
        url: "#",
        duration: "45 min",
        difficulty: "Intermediate"
      },
      {
        id: "hooks-practice",
        title: "Hooks Practice Exercises",
        type: "practice",
        url: "#",
        difficulty: "Intermediate"
      }
    ]
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Strengthen your JavaScript foundation",
    duration: "1 week",
    difficulty: "Beginner",
    topics: ["Variables", "Functions", "Objects", "Arrays", "Async/Await"],
    progress: 60,
    resources: [
      {
        id: "js-basics",
        title: "JavaScript Basics Course",
        type: "tutorial",
        url: "#",
        duration: "3 hours",
        difficulty: "Beginner"
      }
    ]
  },
  {
    id: "advanced-react",
    title: "Advanced React Patterns",
    description: "Learn advanced React patterns and optimization techniques",
    duration: "3 weeks",
    difficulty: "Advanced",
    topics: ["Performance Optimization", "Render Patterns", "State Management", "Testing"],
    progress: 0,
    resources: [
      {
        id: "advanced-react-book",
        title: "Advanced React Patterns",
        type: "book",
        url: "#",
        difficulty: "Advanced"
      }
    ]
  }
]

// Mock learning insights
export const mockInsights: LearningInsight[] = [
  {
    id: "learning-time",
    type: "tip",
    title: "Optimal Learning Time",
    description: "Your best learning time is between 2-4 PM. Consider scheduling complex topics during this window.",
    icon: "Lightbulb",
    color: "purple",
    priority: "medium"
  },
  {
    id: "focus-area",
    type: "focus",
    title: "Focus Area",
    description: "Strengthen your JavaScript fundamentals before moving to advanced React patterns.",
    icon: "Target",
    color: "blue",
    priority: "high"
  },
  {
    id: "progress-update",
    type: "progress",
    title: "Progress Update",
    description: "You're 75% through your React learning path. Great progress this week!",
    icon: "TrendingUp",
    color: "green",
    priority: "low"
  },
  {
    id: "new-recommendation",
    type: "recommendation",
    title: "New Course Available",
    description: "Based on your interests, I recommend the new 'TypeScript for React Developers' course.",
    icon: "BookOpen",
    color: "orange",
    priority: "medium"
  }
]

// Mock AI responses based on user input patterns
export const mockAIResponses = {
  greetings: [
    "Hello! I'm your AI mentor. I've analyzed your learning progress and I'm here to help you achieve your goals. What would you like to work on today?",
    "Hi there! I can see you've been making great progress. How can I help you continue your learning journey?",
    "Welcome back! I've noticed some interesting patterns in your learning. Let's discuss how we can optimize your study time."
  ],
  studyPlan: [
    "Based on your current progress, I recommend starting with useState and useEffect. I've created a personalized 5-day study plan for you. Would you like me to break it down day by day?",
    "I can see you're interested in React hooks. Let me create a structured learning path that builds on your existing JavaScript knowledge.",
    "Great choice! I've analyzed your skill gaps and created a customized study plan. It includes hands-on projects to reinforce your learning."
  ],
  progress: [
    "Your learning analytics show you're making excellent progress! You've completed 24 courses and maintained a 12-day streak. Keep it up!",
    "I've analyzed your study patterns and found that you learn best in 45-minute focused sessions. Your retention rate is 85% - that's excellent!",
    "Your progress is impressive! You've improved your JavaScript skills by 15% this month. The consistent practice is really paying off."
  ],
  recommendations: [
    "Based on your current skills, I recommend focusing on TypeScript next. It will make your React development much more robust.",
    "I've found some excellent resources that match your learning style. Would you like me to share a curated list of tutorials and exercises?",
    "Your learning pattern suggests you'd benefit from more hands-on projects. I can suggest some practical exercises to apply what you've learned."
  ],
  general: [
    "I understand your question. Let me analyze your learning patterns and provide you with a tailored recommendation...",
    "That's a great question! Based on your current skill level and learning goals, here's what I recommend...",
    "I can help you with that! Let me create a personalized approach that fits your learning style and schedule."
  ]
}

// Mock recent suggestions
export const mockSuggestions = [
  {
    id: "react-hooks-tutorial",
    title: "React Hooks Tutorial",
    type: "tutorial",
    description: "Master the fundamentals of React hooks",
    recommendedAt: "2 hours ago",
    difficulty: "Intermediate",
    duration: "2 hours"
  },
  {
    id: "javascript-practice",
    title: "JavaScript Practice",
    type: "practice",
    description: "Strengthen your JavaScript fundamentals",
    recommendedAt: "5 hours ago",
    difficulty: "Beginner",
    duration: "1 hour"
  },
  {
    id: "css-grid-layout",
    title: "CSS Grid Layout",
    type: "tutorial",
    description: "Learn modern CSS layout techniques",
    recommendedAt: "1 day ago",
    difficulty: "Intermediate",
    duration: "1.5 hours"
  }
]

// Mock quick actions
export const mockQuickActions = [
  {
    id: "create-study-plan",
    title: "Create Study Plan",
    description: "Generate a personalized learning path",
    icon: "Target",
    action: "createStudyPlan"
  },
  {
    id: "analyze-progress",
    title: "Analyze Progress",
    description: "Get detailed insights on your learning",
    icon: "TrendingUp",
    action: "analyzeProgress"
  },
  {
    id: "get-recommendations",
    title: "Get Recommendations",
    description: "Find resources tailored to your needs",
    icon: "Lightbulb",
    action: "getRecommendations"
  },
  {
    id: "find-resources",
    title: "Find Resources",
    description: "Discover new learning materials",
    icon: "BookOpen",
    action: "findResources"
  }
]
