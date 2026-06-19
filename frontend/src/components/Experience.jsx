import { motion } from 'framer-motion'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experiencia" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Experiencia</p>
          <h2 className="section-title">
            Trayectoria{' '}
            <span className="gradient-text">profesional</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.5) 10%, rgba(59,130,246,0.5) 90%, transparent)',
            }}
          />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-16"
              >
                <div
                  className="absolute left-[18px] top-1 w-4 h-4 rounded-full border-2 -translate-x-1/2"
                  style={{
                    background: i === 0 ? 'linear-gradient(135deg, #7C3AED, #3B82F6)' : '#1A1A2E',
                    borderColor: job.current ? '#7C3AED' : 'rgba(124,58,237,0.4)',
                    boxShadow: job.current ? '0 0 12px rgba(124,58,237,0.5)' : 'none',
                  }}
                />

                <div className="glass-hover p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: '#F8FAFC' }}>
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold gradient-text">{job.company}</span>
                        {job.current && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-mono"
                            style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.25)' }}
                          >
                            Actual
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-md shrink-0"
                      style={{ background: 'rgba(124,58,237,0.1)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.2)' }}
                    >
                      {job.period}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#94A3B8' }}>
                    {job.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {job.achievements.map((ach) => (
                      <li key={ach} className="flex items-start gap-2 text-sm" style={{ color: '#94A3B8' }}>
                        <span style={{ color: '#7C3AED', marginTop: '3px', flexShrink: 0 }}>▸</span>
                        {ach}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span key={t} className="tech-pill" style={{ fontSize: '0.7rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
