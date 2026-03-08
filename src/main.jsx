import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Atlas app (existing — do not modify)
import AtlasApp from './App.jsx'

// Site layout + pages
import SiteLayout from './layouts/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import BlogIndex from './pages/BlogIndex.jsx'
import PostPage from './pages/PostPage.jsx'
import PersonalAboutPage from './pages/PersonalAboutPage.jsx'
import PapersPage from './pages/PapersPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Atlas tool — existing app, untouched */}
        <Route path="/atlas/*" element={<AtlasApp />} />

        {/* Personal site */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/about" element={<PersonalAboutPage />} />
          <Route path="/papers" element={<PapersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
