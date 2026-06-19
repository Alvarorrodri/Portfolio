import { motion } from 'framer-motion'
import { education } from '../data/content'

export default function Education() {
  return (
    <section id="formacion" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Formación</p>
          <h2 className="section-title">
            Base <span className="gradient-text">académica</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((entry, i) => (
            <motion.div
              key={entry.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-hover p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.2))',
                    border: '1px solid rgba(124,58,237,0.3)',
                  }}
                >
                  🎓
                </div>
                <h3 className="text-lg font-bold" style={{ color: '#F8FAFC' }}>
                  {entry.school}
                </h3>
              </div>

              <div className="space-y-4 pl-1">
                {entry.degrees.map((deg, j) => (
                  <div
                    key={deg.title}
                    className="flex flex-wrap items-start justify-between gap-3"
                    style={{
                      paddingBottom: j < entry.degrees.length - 1 ? '1rem' : 0,
                      borderBottom: j < entry.degrees.length - 1 ? '1px solid rgba(124,58,237,0.12)' : 'none',
                    }}
                  >
                    <p className="text-sm font-medium" style={{ color: '#E2E8F0' }}>
                      {deg.title}
                    </p>
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-md shrink-0"
                      style={{
                        background: 'rgba(124,58,237,0.1)',
                        color: '#A78BFA',
                        border: '1px solid rgba(124,58,237,0.2)',
                      }}
                    >
                      {deg.period}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
