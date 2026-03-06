"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpen,
  Users,
  Brain,
  BarChart3,
  Github,
  Zap,
  Trophy,
  Target,
  Crown,
  Star,
  CheckCircle,
  Play,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const cardHoverVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">SmartEd</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gray-900 hover:bg-black text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section initial="hidden" animate="visible" variants={containerVariants} className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-6 bg-gray-100 text-gray-800 border-gray-200">
              🚀 Next-Gen Education Platform
            </Badge>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl font-bold text-gray-900 mb-6 text-balance">
            Master Skills. Build Projects. <span className="text-gray-700">Achieve Greatness.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 text-pretty max-w-3xl mx-auto">
            Join 50,000+ students using SmartEd's AI-powered platform to accelerate learning, collaborate on real
            projects, and build portfolio-worthy work.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-gray-900 hover:bg-black text-white px-8 py-3">
                Start Learning Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent px-8 py-3"
              >
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 px-6 bg-gray-50"
      >
        <div className="container mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to transform your learning experience and accelerate your success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Smart Workspaces",
                description:
                  "AI-powered project environments with collaborative tools, version control, and automated feedback.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Github,
                title: "Code Repository",
                description:
                  "Central hub for projects, templates, and resources with intelligent search and recommendations.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Users,
                title: "Global Community",
                description: "Connect with 50,000+ students worldwide. Share projects, get feedback, and collaborate.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Brain,
                title: "AI Learning Mentor",
                description: "Personalized learning paths, skill gap analysis, and intelligent study recommendations.",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Track progress, identify strengths, and get detailed insights on your learning journey.",
                color: "from-red-500 to-red-600",
              },
              {
                icon: Zap,
                title: "Smart Features",
                description: "Auto-grading, plagiarism detection, and intelligent content suggestions powered by AI.",
                color: "from-yellow-500 to-yellow-600",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants} whileHover="hover">
                <motion.div variants={cardHoverVariants}>
                  <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gamification Highlight */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 px-6"
      >
        <div className="container mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Level Up Your Learning</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gamified learning experience with achievements, streaks, and leaderboards to keep you motivated.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Achievement Badges</h3>
              <p className="text-gray-600">Earn badges for completing projects, helping peers, and mastering skills.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learning Streaks</h3>
              <p className="text-gray-600">Build momentum with daily learning streaks and consistency rewards.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Leaderboards</h3>
              <p className="text-gray-600">Compete with students worldwide and climb the skill-based rankings.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Premium Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 px-6 bg-gradient-to-r from-gray-900 to-black"
      >
        <div className="container mx-auto text-center">
          <motion.div variants={itemVariants}>
            <Badge className="mb-6 bg-white/10 text-white border-white/20">⚡ SmartEd Pro</Badge>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
            Unlock Premium Features
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get unlimited access to advanced AI features, priority support, and exclusive content.
          </motion.p>

          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              "Unlimited AI mentor sessions",
              "Advanced analytics dashboard",
              "Priority community support",
              "Exclusive project templates",
              "1-on-1 mentorship calls",
              "Certificate programs",
            ].map((feature, index) => (
              <div key={index} className="flex items-center text-white">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
            >
              View Pricing
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Student Showcase */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 px-6"
      >
        <div className="container mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Students Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow our proven 3-step process to accelerate your learning and build impressive projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Learn & Practice",
                description:
                  "Access curated courses, interactive tutorials, and hands-on projects designed by industry experts.",
              },
              {
                step: "02",
                title: "Build & Collaborate",
                description:
                  "Work on real projects with peers, get AI-powered feedback, and build a portfolio that stands out.",
              },
              {
                step: "03",
                title: "Showcase & Grow",
                description:
                  "Share your work with the community, get recognized for achievements, and land your dream opportunities.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 px-6 bg-gray-50"
      >
        <div className="container mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-gray-600">See how SmartEd is transforming learning experiences worldwide</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Chen",
                role: "Full-Stack Developer",
                avatar: "A",
                content:
                  "SmartEd's AI mentor helped me identify knowledge gaps and create a personalized study plan. I landed my dream job at a tech startup!",
                rating: 5,
              },
              {
                name: "Sarah Johnson",
                role: "Product Designer",
                avatar: "S",
                content:
                  "The collaborative workspaces made group projects seamless. We built an award-winning app that's now used by thousands!",
                rating: 5,
              },
              {
                name: "Marcus Rodriguez",
                role: "Data Scientist",
                avatar: "M",
                content:
                  "The community feature connected me with amazing peers. I found my co-founder here and we're building the next big thing!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-gray-200 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black"
      >
        <div className="container mx-auto text-center">
          <motion.h2 variants={itemVariants} className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join 50,000+ students who are already using SmartEd to build skills, create projects, and launch successful
            careers.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-4 text-lg">
                Start Your Journey Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
          <motion.p variants={itemVariants} className="text-gray-400 mt-4">
            Free forever. No credit card required.
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-gray-900 to-black rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">SmartEd</span>
          </div>
          <p className="text-gray-600 text-sm">© 2025 SmartEd. All rights reserved. Empowering students worldwide.</p>
        </div>
      </footer>
    </div>
  )
}
