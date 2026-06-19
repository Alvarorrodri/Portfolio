import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data/content'

export default function Skills() {
  const categories = Object.keys(skills)
  const [active, setActive] = useState(categories[0])

  return (
    <section id="habilidades" className="py-24 px-6">
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label">Habilidades</p>
          <h2 className="section-title">
            Tecnologías que{' '}
            <span className="gradient-text">domino</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  background: isActive ? 'linear-gradient(135deg, #7C3AED, #3B82F6)' : 'rgba(255,255,255,0.04)',
                  border: isActive ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? 'white' : '#94A3B8',
                  boxShadow: isActive ? '0 0 20px rgba(124,58,237,0.3)' : 'none',
                }}
              >
                {skills[cat].icon} {cat}
              </button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="glass p-8 md:p-10"
            style={{ borderColor: skills[active].borderColor }}
          >
            <div className="flex flex-wrap gap-3">
              {skills[active].items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="tech-pill text-sm px-4 py-2"
                  style={{
                    background: `linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1))`,
                    border: `1px solid ${skills[active].borderColor}`,
                    color: '#A78BFA',
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mt-6"
        >
          {categories.map((cat, i) => (
            <div
              key={cat}
              className="glass p-4 text-center cursor-pointer transition-all duration-300"
              style={{ borderColor: active === cat ? skills[cat].borderColor : 'rgba(255,255,255,0.06)' }}
              onClick={() => setActive(cat)}
            >
              <div className="text-2xl mb-1">{skills[cat].icon}</div>
              <div className="text-xs font-medium" style={{ color: '#94A3B8' }}>{skills[cat].items.length} tecnologías</div>
              <div className="text-xs mt-0.5 font-mono" style={{ color: '#7C3AED' }}>{cat}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
