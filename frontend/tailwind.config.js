/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A1A',
        primary: '#7C3AED',
        secondary: '#3B82F6',
        accent: '#A78BFA',
        glow: '#6D28D9',
        'text-main': '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-neural': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(59,130,246,0.1) 100%)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(124,58,237,0.4)',
        'glow-sm': '0 0 10px rgba(124,58,237,0.25)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
