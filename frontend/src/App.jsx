import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import ChatSection from './components/ChatSection'
import ChatWidget from './components/ChatWidget'
import Contact from './components/Contact'

export default function App() {
  return (
    <div style={{ background: '#0A0A1A', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <ChatSection />
        <Contact />
      </main>
      <ChatWidget />
    </div>
  )
}
