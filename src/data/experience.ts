export type WorkExperience = {
  id: string
  company: string
  role: string
  employmentType: string
  start: string
  end: string
  duration: string
  location: string
  workMode?: string
  summary: string
  /** Soft brand tint for monogram icon (CSS color). */
  accent: string
  initials: string
}

export const workExperience: WorkExperience[] = [
  {
    id: 'insignia',
    company: 'Insignia Financial',
    role: 'Customer Solutions Specialist',
    employmentType: 'Part-time',
    start: 'Apr 2023',
    end: 'Apr 2025',
    duration: '2 yrs 1 mo',
    location: 'Melbourne, Victoria, Australia',
    workMode: 'Hybrid',
    summary:
      'At Insignia Financial Ltd, a leading provider of superannuation and investment management services in Australia, I was responsible for processing beneficiary checks and conducting accurate data entry across financial records. I verified and cross-checked sensitive information to ensure data integrity and compliance, while also contacting superannuation holders to assist with administrative tasks and clarify documentation. Additionally, I maintained detailed records and performed updates in internal systems with a high level of accuracy.',
    accent: '#1e4d8c',
    initials: 'IF',
  },
  {
    id: 'suncorp',
    company: 'Suncorp Group',
    role: 'Customer Service Specialist',
    employmentType: 'Part-time',
    start: 'Jan 2021',
    end: 'Dec 2022',
    duration: '2 yrs',
    location: 'Melbourne, Victoria, Australia',
    summary:
      'As a Customer Service Representative in an inbound call center, I seamlessly integrated sales and servicing roles within the insurance sector, drawing upon my extensive knowledge of various insurance products. I led by example, excelling in both driving sales initiatives and providing exceptional service to new and existing customers. Beyond typical sales responsibilities, I actively assisted customers with inquiries and policy changes, ensuring a seamless experience. Operating within a LINUX based system, I quickly adapted to new technologies, leveraging them to enhance team performance. With strong customer service skills and a knack for quick learning, I effectively helped my team to success, meeting targets and delivering unparalleled service standards.',
    accent: '#c8102e',
    initials: 'SG',
  },
  {
    id: 'barry-plant',
    company: 'Barry Plant Real Estate',
    role: 'Assistant Real Estate Agent',
    employmentType: 'Contract',
    start: 'Mar 2022',
    end: 'Apr 2022',
    duration: '2 mos',
    location: 'Victoria, Australia',
    summary:
      'Personal Assistant to a Sales/Operations Manager. In this role I perform a wide variety of activities like assisting in the marketing of housing events like house auctions/selling, interacting with potential buyers at open houses/auctions and door-knocking houses to obtain appraisals for potential sellers.',
    accent: '#2d6a4f',
    initials: 'BP',
  },
  {
    id: 'vic-health',
    company: 'Victorian Department of Health',
    role: 'Customer Service Agent',
    employmentType: 'Contract',
    start: 'Oct 2021',
    end: 'Dec 2021',
    duration: '3 mos',
    location: 'Melbourne, Victoria, Australia',
    summary:
      'Conversing with citizens regarding COVID-19 inquiries (Create, modify, cancel vaccine bookings, answer and give advice regarding COVID-19) and through this I was able to further enhance my customer service skills. I learnt how to deal a wide variety of people over the phone and further honed my interpersonal skills.',
    accent: '#005eb8',
    initials: 'DH',
  },
  {
    id: 'boiling-crab',
    company: 'The Boiling Crab',
    role: 'Waiter',
    employmentType: 'Part-time',
    start: 'Jan 2021',
    end: 'Dec 2021',
    duration: '1 yr',
    location: 'Melbourne, Victoria, Australia',
    summary:
      'Through the interactions with my co-workers and customers I was able to develop strong communication and problem-solving skills which gave me the ability to display great customer service. I have also learnt to perform well under pressure and can organize my time efficiently.',
    accent: '#b45309',
    initials: 'BC',
  },
  {
    id: 'coles',
    company: 'Coles Group',
    role: 'Team Member',
    employmentType: 'Part-time',
    start: 'Nov 2019',
    end: 'Aug 2020',
    duration: '10 mos',
    location: 'Melbourne, Victoria, Australia',
    summary:
      'I worked in store during opening hours and performed a wide variety of tasks to fulfil my job as an on-site team member. I used physical advantages like my height and strength to stock shelves with inventory, as well as using my communication and knowledge to assist customers with any questions or queries.',
    accent: '#e31837',
    initials: 'CG',
  },
]
