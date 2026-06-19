import { motion } from 'framer-motion'
import { personalInfo } from '../data/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="section-label">Sobre mí</p>
          <h2 className="section-title">
            Donde el Low-Code se{' '}
            <span className="gradient-text">encuentra con la IA</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0.1)} className="space-y-5">
            <p className="text-lg leading-relaxed" style={{ color: '#94A3B8' }}>
              {personalInfo.bio}
            </p>
            <p className="leading-relaxed" style={{ color: '#94A3B8' }}>
              Recién graduado en DAM, combino la base técnica de mi formación con proyectos
              propios construidos por iniciativa personal, fuera del horario de prácticas,
              para especializarme en IA generativa aplicada.
            </p>
            <p className="leading-relaxed" style={{ color: '#94A3B8' }}>
              Mi enfoque es práctico: aprendo construyendo. Cada tecnología que menciono
              la he aplicado en un proyecto real y puedo explicar cómo funciona y por qué
              tomé esas decisiones técnicas.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="space-y-4">
            {personalInfo.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="glass-hover p-6 flex items-center gap-6"
              >
                <span
                  className="text-4xl font-bold leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass p-6"
              style={{ borderColor: 'rgba(124,58,237,0.2)' }}
            >
              <p className="section-label mb-1">Stack principal</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Python', 'LangChain', 'LangGraph', 'n8n', 'OutSystems', 'FastAPI'].map(
                  (t) => (
                    <span key={t} className="tech-pill">
                      {t}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
