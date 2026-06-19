import { motion } from 'framer-motion'
import { certifications } from '../data/content'

export default function Certifications() {
  return (
    <section id="certificaciones" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Certificaciones</p>
          <h2 className="section-title">
            Formación{' '}
            <span className="gradient-text">validada</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-hover p-6 flex flex-col gap-3 text-center"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto"
                style={{
                  background: `linear-gradient(135deg, ${cert.accentColor}20, ${cert.accentColor}10)`,
                  border: `1px solid ${cert.accentColor}30`,
                }}
              >
                {cert.icon}
              </div>

              <div>
                <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: '#F8FAFC' }}>
                  {cert.name}
                </h3>
                <p className="text-xs" style={{ color: '#94A3B8' }}>
                  {cert.issuer}
                </p>
              </div>

              <span
                className="text-xs font-mono self-center px-3 py-1 rounded-full"
                style={{
                  background: `${cert.accentColor}15`,
                  color: cert.accentColor,
                  border: `1px solid ${cert.accentColor}25`,
                }}
              >
                {cert.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
