export type EducationEntry = {
  id: string
  institution: string
  credential: string
  /** Secondary note shown under the credential (e.g. transfer details). */
  note?: string
  start: string
  end: string
  location: string
  /** Soft brand tint for monogram icon (CSS color). */
  accent: string
  initials: string
}

export const education: EducationEntry[] = [
  {
    id: 'rmit-bit',
    institution: 'Royal Melbourne Institute of Technology (RMIT)',
    credential: 'Bachelor of Information Technology',
    note: 'Transferred to Bachelor of Computer Science with credits',
    start: 'Feb 2021',
    end: 'Jun 2022',
    location: 'Melbourne, VIC, AUS',
    accent: '#e60028',
    initials: 'RM',
  },
  {
    id: 'rmit-bcs',
    institution: 'Royal Melbourne Institute of Technology (RMIT)',
    credential: 'Bachelor of Computer Science',
    start: 'Jun 2023',
    end: 'Dec 2025',
    location: 'Melbourne, VIC, AUS',
    accent: '#e60028',
    initials: 'RM',
  },
  {
    id: 'unilearn',
    institution: 'UniLearn – TAFE Queensland',
    credential: 'UNL32 Senior Mathematics',
    start: 'Feb 2023',
    end: 'Jun 2023',
    location: 'Melbourne, VIC, AUS (Online)',
    accent: '#003366',
    initials: 'UL',
  },
  {
    id: 'highvale',
    institution: 'Highvale Secondary College',
    credential: 'Victorian Certificate of Education',
    start: 'Feb 2014',
    end: 'Nov 2020',
    location: 'Melbourne, VIC, AUS',
    accent: '#1a5f2a',
    initials: 'HV',
  },
]
