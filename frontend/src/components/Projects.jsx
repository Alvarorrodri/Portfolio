import { motion } from 'framer-motion'
import { projects } from '../data/content'

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function FeaturedCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="col-span-full relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(59,130,246,0.08) 100%)',
        border: '1px solid rgba(124,58,237,0.25)',
        boxShadow: '0 0 40px rgba(124,58,237,0.1)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }} />

      <div className="p-8 md:p-10">
        <div className="flex flex-wrap items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs font-mono font-medium px-3 py-1 rounded-full"
                style={{ background: 'rgba(124,58,237,0.2)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                ⭐ Proyecto Destacado
              </span>
              <span
                className="text-xs font-mono px-3 py-1 rounded-full"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.25)' }}
              >
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#F8FAFC' }}>
              {project.title}
            </h3>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
            {project.description}
          </p>

          <div className="space-y-4">
            <div>
              <p className="section-label mb-3">Stack técnico</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-pill">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {project.github && (
                <a href={project.github} className="btn-outline" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                  <GitHubIcon /> Código
                </a>
              )}
              {project.demo && (
                <a href={project.demo} className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                  Demo <ExternalIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-hover p-6 flex flex-col gap-4 h-full"
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-mono px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(59,130,246,0.1)',
            color: '#93C5FD',
            border: '1px solid rgba(59,130,246,0.2)',
          }}
        >
          {project.category}
        </span>
        <div className="flex gap-2">
          {project.github && (
            <a href={project.github} className="p-1.5 rounded-md transition-colors" style={{ color: '#94A3B8' }}
              onMouseEnter={e => e.currentTarget.style.color = '#A78BFA'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
              <GitHubIcon />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="p-1.5 rounded-md transition-colors" style={{ color: '#94A3B8' }}
              onMouseEnter={e => e.currentTarget.style.color = '#A78BFA'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold mb-2 text-lg" style={{ color: '#F8FAFC' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tech-pill" style={{ fontSize: '0.7rem' }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="proyectos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Proyectos</p>
          <h2 className="section-title">
            Cosas que he{' '}
            <span className="gradient-text">construido</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: '#94A3B8' }}>
            Desde pipelines RAG en producción hasta automatizaciones Low-Code a escala enterprise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured && <FeaturedCard project={featured} />}
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
