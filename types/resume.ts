export interface Experience {
  company: string
  position: string
  description: string
}

export interface ResumeData {
  title: string
  experience: Experience[]
  skills: string[]
}

export interface Recommendation {
  type: 'resume_improvement' | 'career_path' | 'learning'
  content: string
}
