export type SkillGroup = {
  id: string
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      'Java',
      'Python',
      'JavaScript',
      'C++',
      'Unity (C#)',
      'CSS/HTML',
      'TypeScript',
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      'Git',
      'GitHub',
      'Visual Studio Code',
      'IntelliJ IDEA',
      'Vercel',
      'Vite',
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    skills: [
      'React',
      'Node.js',
      'JavaFX',
      'MatPlotLib',
      'Next.js',
      'Zod',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: ['MySQL', 'SQLite', 'MongoDB', 'TypeORM', 'GraphQL'],
  },
  {
    id: 'ai',
    title: 'AI',
    skills: [
      'OpenAI/Claude API',
      'Prompt Engineering',
      'LLM Integration',
      'AI output validation',
      'Cursor IDE',
      'Agentic AI',
    ],
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    skills: [
      'Strong technical and data literacy with experience handling structured information',
      'Proficient with digital tools and systems; quick to learn new software and workflows',
      'Analytical problem-solver with attention to detail and process improvement mindset',
      'Effective communicator with experience working in team-based environments',
    ],
  },
]
