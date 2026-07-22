export type NavItem = {
  id: string
  label: string
  path?: string
  children?: NavItem[]
}

export const navTree: NavItem[] = [
  {
    id: 'recruiters',
    label: 'For Recruiters',
    children: [
      { id: 'recruiters-resume', label: 'Resume', path: '/recruiters/resume' },
      {
        id: 'recruiters-experience',
        label: 'Experience',
        path: '/recruiters/experience',
      },
      {
        id: 'recruiters-projects',
        label: 'Projects',
        path: '/recruiters/projects',
      },
      { id: 'recruiters-skills', label: 'Skills', path: '/recruiters/skills' },
      {
        id: 'recruiters-contact',
        label: 'Contact',
        path: '/recruiters/contact',
      },
    ],
  },
  {
    id: 'curious',
    label: 'For Curious Humans',
    children: [
      { id: 'curious-about', label: 'About', path: '/curious/about' },
      { id: 'curious-notes', label: 'Notes', path: '/curious/notes' },
      { id: 'curious-photos', label: 'Photos', path: '/curious/photos' },
      { id: 'curious-reading', label: 'Reading', path: '/curious/reading' },
    ],
  },
  {
    id: 'consciousness',
    label: 'Talk to my consciousness',
    children: [
      {
        id: 'consciousness-chat',
        label: 'Chat',
        path: '/consciousness/chat',
      },
      {
        id: 'consciousness-about',
        label: 'About this',
        path: '/consciousness/about',
      },
    ],
  },
]

export const DEFAULT_PATH = '/recruiters/resume'

/** Return ancestor folder ids for the active pathname. */
export function getAncestorIds(
  pathname: string,
  items: NavItem[] = navTree,
): string[] {
  function search(nodes: NavItem[], trail: string[]): string[] | null {
    for (const node of nodes) {
      if (node.path === pathname) return trail
      if (node.children) {
        const result = search(node.children, [...trail, node.id])
        if (result) return result
      }
    }
    return null
  }

  return search(items, []) ?? []
}

/** Flatten all leaf paths from the nav tree. */
export function getLeafPaths(items: NavItem[] = navTree): string[] {
  const paths: string[] = []
  for (const item of items) {
    if (item.path) paths.push(item.path)
    if (item.children) paths.push(...getLeafPaths(item.children))
  }
  return paths
}

/** Labels for the path bar, e.g. ["For Recruiters", "Projects"]. */
export function getBreadcrumbLabels(
  pathname: string,
  items: NavItem[] = navTree,
): string[] {
  function search(nodes: NavItem[], trail: string[]): string[] | null {
    for (const node of nodes) {
      const next = [...trail, node.label]
      if (node.path === pathname) return next
      if (node.children) {
        const result = search(node.children, next)
        if (result) return result
      }
    }
    return null
  }

  return search(items, []) ?? []
}
