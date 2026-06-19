import { motion } from 'framer-motion'
import { personalInfo } from '../data/content'

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

const socialLinks = [
  {
    label: 'LinkedIn',
    description: 'Conecta conmigo profesionalmente',
    href: personalInfo.linkedin,
    icon: <LinkedInIcon />,
    color: '#0A66C2',
    accentBg: 'rgba(10,102,194,0.1)',
    accentBorder: 'rgba(10,102,194,0.25)',
  },
  {
    label: 'GitHub',
    description: 'Revisa mi código y proyectos',
    href: personalInfo.github,
    icon: <GitHubIcon />,
    color: '#E6EDF3',
    accentBg: 'rgba(230,237,243,0.06)',
    accentBorder: 'rgba(230,237,243,0.12)',
  },
  {
    label: 'Email',
    description: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: <MailIcon />,
    color: '#A78BFA',
    accentBg: 'rgba(124,58,237,0.1)',
    accentBorder: 'rgba(124,58,237,0.25)',
  },
]

export default function Contact() {
  return (
    <section id="contacto" className="py-24 px-6">
      <div className="absolute left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }} />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Contacto</p>
          <h2 className="section-title">
            Hablemos de{' '}
            <span className="gradient-text">tu próximo proyecto</span>
          </h2>
          <p className="mt-3 mb-12 max-w-lg mx-auto" style={{ color: '#94A3B8' }}>
            ¿Tienes un proceso que automatizar o un proyecto de IA entre manos?
            Estoy disponible para proyectos freelance y posiciones a tiempo completo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-hover p-6 flex flex-col items-center gap-3 text-center no-underline"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: link.accentBg, border: `1px solid ${link.accentBorder}`, color: link.color }}
              >
                {link.icon}
              </div>
              <div>
                <div className="font-semibold mb-1" style={{ color: '#F8FAFC' }}>
                  {link.label}
                </div>
                <div className="text-xs" style={{ color: '#94A3B8' }}>
                  {link.description}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-20 pt-8 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-xs font-mono" style={{ color: '#94A3B8' }}>
          Diseñado y construido por{' '}
          <span className="gradient-text font-semibold">Álvaro Rodrigo</span>
          {' · '}
          React + FastAPI + LangChain
        </p>
      </motion.div>
    </section>
  )
}
