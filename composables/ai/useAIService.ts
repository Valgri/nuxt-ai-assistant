import OpenAI from 'openai'
import type { ResumeData } from '~/types/resume'

export function useAIService() {
  const config = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: config.openaiApiKey as string,
  })

  async function analyzeResume(resumeData: ResumeData) {
    const prompt = `Analyze this resume and provide recommendations in three categories:
    1. Resume improvements (specific phrases and content improvements)
    2. Career path suggestions based on experience and skills
    3. Learning recommendations to enhance career prospects

    Resume:
    Title: ${resumeData.title}

    Experience:
    ${resumeData.experience.map(exp => `
    Company: ${exp.company}
    Position: ${exp.position}
    Description: ${exp.description}
    `).join('\n')}

    Skills: ${resumeData.skills.join(', ')}
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional career advisor and resume expert. Provide specific, actionable recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('No recommendations generated')

    // Parse the response into structured recommendations
    const sections = content.split('\n\n')
    const recommendations = []

    for (const section of sections) {
      if (section.includes('Resume improvement')) {
        recommendations.push({
          type: 'resume_improvement',
          content: section.replace('Resume improvements:', '').trim()
        })
      } else if (section.includes('Career path')) {
        recommendations.push({
          type: 'career_path',
          content: section.replace('Career path suggestions:', '').trim()
        })
      } else if (section.includes('Learning')) {
        recommendations.push({
          type: 'learning',
          content: section.replace('Learning recommendations:', '').trim()
        })
      }
    }

    return recommendations
  }

  return {
    analyzeResume
  }
}
