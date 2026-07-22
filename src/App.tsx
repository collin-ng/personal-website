import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DEFAULT_PATH } from './data/nav'
import { AppShell } from './layouts/AppShell'
import { ThemeProvider } from './theme/ThemeProvider'
import { AboutThisPage } from './pages/consciousness/AboutThis'
import { ChatPage } from './pages/consciousness/Chat'
import { AboutPage } from './pages/curious/About'
import { NotesPage } from './pages/curious/Notes'
import { PhotosPage } from './pages/curious/Photos'
import { ReadingPage } from './pages/curious/Reading'
import { ContactPage } from './pages/recruiters/Contact'
import { ExperiencePage } from './pages/recruiters/Experience'
import { ProjectsPage } from './pages/recruiters/Projects'
import { ResumePage } from './pages/recruiters/Resume'
import { SkillsPage } from './pages/recruiters/Skills'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to={DEFAULT_PATH} replace />} />
            <Route path="recruiters/resume" element={<ResumePage />} />
            <Route path="recruiters/experience" element={<ExperiencePage />} />
            <Route path="recruiters/projects" element={<ProjectsPage />} />
            <Route path="recruiters/skills" element={<SkillsPage />} />
            <Route path="recruiters/contact" element={<ContactPage />} />
            <Route path="curious/about" element={<AboutPage />} />
            <Route path="curious/notes" element={<NotesPage />} />
            <Route path="curious/photos" element={<PhotosPage />} />
            <Route path="curious/reading" element={<ReadingPage />} />
            <Route path="consciousness/chat" element={<ChatPage />} />
            <Route path="consciousness/about" element={<AboutThisPage />} />
            <Route path="*" element={<Navigate to={DEFAULT_PATH} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
