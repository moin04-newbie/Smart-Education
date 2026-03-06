import { mockAIResponses, mockUserProgress, mockStudyPlans, mockInsights, mockSuggestions } from './mock-data'

export interface AIMentorResponse {
  content: string
  suggestions?: string[]
  studyPlan?: any
  insights?: any[]
  type: 'greeting' | 'study_plan' | 'progress' | 'recommendation' | 'general'
}

export class AIMentorService {
  private userProgress = mockUserProgress
  private studyPlans = mockStudyPlans
  private insights = mockInsights
  private suggestions = mockSuggestions

  // Analyze user input and generate appropriate response
  analyzeInput(userInput: string): AIMentorResponse {
    const input = userInput.toLowerCase()
    
    // Greeting patterns
    if (this.isGreeting(input)) {
      return this.generateGreetingResponse()
    }
    
    // Study plan requests
    if (this.isStudyPlanRequest(input)) {
      return this.generateStudyPlanResponse(input)
    }
    
    // Progress inquiries
    if (this.isProgressRequest(input)) {
      return this.generateProgressResponse()
    }
    
    // Recommendation requests
    if (this.isRecommendationRequest(input)) {
      return this.generateRecommendationResponse()
    }
    
    // Default response
    return this.generateGeneralResponse()
  }

  private isGreeting(input: string): boolean {
    const greetingPatterns = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']
    return greetingPatterns.some(pattern => input.includes(pattern))
  }

  private isStudyPlanRequest(input: string): boolean {
    const studyPatterns = [
      'study plan', 'learning plan', 'curriculum', 'syllabus', 'schedule',
      'react hooks', 'javascript', 'python', 'learn', 'study', 'course'
    ]
    return studyPatterns.some(pattern => input.includes(pattern))
  }

  private isProgressRequest(input: string): boolean {
    const progressPatterns = [
      'progress', 'how am i doing', 'my progress', 'analytics', 'stats',
      'performance', 'improvement', 'tracking'
    ]
    return progressPatterns.some(pattern => input.includes(pattern))
  }

  private isRecommendationRequest(input: string): boolean {
    const recommendationPatterns = [
      'recommend', 'suggest', 'what should', 'advice', 'help me choose',
      'next step', 'what to learn', 'resources'
    ]
    return recommendationPatterns.some(pattern => input.includes(pattern))
  }

  private generateGreetingResponse(): AIMentorResponse {
    const responses = mockAIResponses.greetings
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      content: randomResponse,
      type: 'greeting',
      suggestions: ['Create a study plan', 'Check my progress', 'Get recommendations']
    }
  }

  private generateStudyPlanResponse(input: string): AIMentorResponse {
    // Find relevant study plan based on input
    let relevantPlan = null
    
    if (input.includes('react') || input.includes('hooks')) {
      relevantPlan = this.studyPlans.find(plan => plan.id === 'react-hooks-plan')
    } else if (input.includes('javascript') || input.includes('js')) {
      relevantPlan = this.studyPlans.find(plan => plan.id === 'javascript-fundamentals')
    } else if (input.includes('advanced')) {
      relevantPlan = this.studyPlans.find(plan => plan.id === 'advanced-react')
    }

    const responses = mockAIResponses.studyPlan
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      content: randomResponse,
      type: 'study_plan',
      studyPlan: relevantPlan,
      suggestions: ['View detailed plan', 'Start learning', 'Get resources']
    }
  }

  private generateProgressResponse(): AIMentorResponse {
    const responses = mockAIResponses.progress
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      content: randomResponse,
      type: 'progress',
      insights: this.insights.slice(0, 3),
      suggestions: ['View detailed analytics', 'Set new goals', 'Track improvements']
    }
  }

  private generateRecommendationResponse(): AIMentorResponse {
    const responses = mockAIResponses.recommendations
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      content: randomResponse,
      type: 'recommendation',
      suggestions: this.suggestions.slice(0, 3).map(s => s.title)
    }
  }

  private generateGeneralResponse(): AIMentorResponse {
    const responses = mockAIResponses.general
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      content: randomResponse,
      type: 'general',
      suggestions: ['Ask about study plans', 'Check progress', 'Get help']
    }
  }

  // Get user progress data
  getUserProgress() {
    return this.userProgress
  }

  // Get available study plans
  getStudyPlans() {
    return this.studyPlans
  }

  // Get learning insights
  getInsights() {
    return this.insights
  }

  // Get recent suggestions
  getSuggestions() {
    return this.suggestions
  }

  // Generate personalized study plan
  generatePersonalizedStudyPlan(topic: string, difficulty: string, duration: string) {
    const plan = {
      id: `custom-${Date.now()}`,
      title: `Personalized ${topic} Study Plan`,
      description: `A customized learning path for ${topic} at ${difficulty} level`,
      duration: duration,
      difficulty: difficulty,
      topics: this.generateTopicsForSubject(topic),
      resources: this.generateResourcesForSubject(topic, difficulty),
      progress: 0
    }
    
    return plan
  }

  private generateTopicsForSubject(subject: string): string[] {
    const topicMap: { [key: string]: string[] } = {
      'react': ['Components', 'Props', 'State', 'Hooks', 'Context', 'Performance'],
      'javascript': ['Variables', 'Functions', 'Objects', 'Arrays', 'Async/Await', 'ES6+'],
      'python': ['Variables', 'Functions', 'Classes', 'Modules', 'Data Structures', 'Algorithms'],
      'css': ['Selectors', 'Layout', 'Flexbox', 'Grid', 'Animations', 'Responsive Design']
    }
    
    return topicMap[subject.toLowerCase()] || ['Fundamentals', 'Intermediate Concepts', 'Advanced Topics']
  }

  private generateResourcesForSubject(subject: string, difficulty: string) {
    return [
      {
        id: `${subject}-tutorial`,
        title: `${subject} Tutorial`,
        type: 'tutorial',
        url: '#',
        duration: '2 hours',
        difficulty: difficulty
      },
      {
        id: `${subject}-practice`,
        title: `${subject} Practice Exercises`,
        type: 'practice',
        url: '#',
        difficulty: difficulty
      }
    ]
  }
}
