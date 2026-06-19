export const personalInfo = {
  name: 'Álvaro Rodrigo Cantalejo',
  title: 'Low-Code Developer & AI Automation',
  tagline: 'Junior dev con base Low-Code real\ny especialización autodidacta en IA generativa.',
  bio: 'Desarrollador Low-Code especializado en OutSystems, con experiencia real en proyecto empresarial, y especialización autodidacta en automatización inteligente con IA: LangChain, RAG, LangGraph, n8n y Python.',
  location: 'Talavera de la Reina, España · 100% remoto',
  email: 'alvarorodricantalejo3@gmail.com',
  linkedin: 'https://linkedin.com/in/alvarorrodrigo',
  github: 'https://github.com/Alvarorrodri',
  stats: [
    { label: 'Prácticas en empresa real', value: '800h' },
    { label: 'Proyectos construidos', value: '5+' },
    { label: 'Tecnologías aplicadas', value: '10+' },
  ],
}

export const projects = [
  {
    id: 'chatbot-rag',
    title: 'ChatBot RAG',
    description:
      'Chatbot conversacional que responde preguntas sobre mis proyectos de GitHub leyendo sus READMEs. Pipeline RAG completo: carga de documentos, chunking, embeddings y búsqueda semántica con ChromaDB.\n\nDos versiones: v1 con flujo lineal, y v2 con LangGraph que añade un agente clasificador antes de buscar, haciendo el sistema más robusto y evitando respuestas inventadas.',
    tags: ['LangChain', 'LangGraph', 'ChromaDB', 'HuggingFace', 'Groq', 'Python'],
    featured: true,
    category: 'AI',
    github: 'https://github.com/Alvarorrodri/ChatBot-RAG',
  },
  {
    id: 'email-autoresponder',
    title: 'Email Autoresponder con IA',
    description:
      'Automatización que detecta emails entrantes en Gmail, lee los PDFs adjuntos y genera borradores de respuesta automáticamente usando IA.',
    tags: ['n8n', 'Gmail API', 'Groq', 'Llama 3.3'],
    featured: false,
    category: 'Automatización',
    github: '#',
  },
  {
    id: 'cv-analyzer',
    title: 'Analizador de CVs por Telegram',
    description:
      'Bot de Telegram que recibe CVs en PDF y da feedback profesional detallado: puntos fuertes, áreas de mejora y una valoración del 1 al 10.',
    tags: ['n8n', 'Telegram Bot API', 'Groq', 'PDF'],
    featured: false,
    category: 'Automatización',
    github: '#',
  },
  {
    id: 'bot-noticias',
    title: 'Bot de Noticias Tech',
    description:
      'Automatización que cada mañana obtiene las últimas noticias de tecnología vía RSS, las resume con IA en 3-4 líneas y las envía por Telegram.',
    tags: ['n8n', 'RSS', 'Groq', 'Llama 3.3', 'Telegram'],
    featured: false,
    category: 'Automatización',
    github: '#',
  },
  {
    id: 'bot-restaurante',
    title: 'Bot de Reservas para Restaurante',
    description:
      'Agente conversacional que gestiona reservas de mesa de forma natural a través de Telegram.',
    tags: ['n8n', 'Telegram', 'AI Agent', 'Groq'],
    featured: false,
    category: 'Automatización',
    github: '#',
  },
]

export const skills = {
  'IA & Automatización': {
    gradient: 'from-violet-600 to-purple-500',
    borderColor: 'rgba(124,58,237,0.4)',
    icon: '🧠',
    items: [
      'Python',
      'LangChain',
      'LangGraph',
      'RAG',
      'ChromaDB',
      'HuggingFace',
      'Groq',
      'n8n',
      'Prompt Engineering',
    ],
  },
  'Low-Code': {
    gradient: 'from-blue-600 to-cyan-500',
    borderColor: 'rgba(59,130,246,0.4)',
    icon: '⚡',
    items: ['OutSystems', 'Appian'],
  },
  'Backend & Cloud': {
    gradient: 'from-violet-500 to-blue-600',
    borderColor: 'rgba(167,139,250,0.4)',
    icon: '☁️',
    items: ['FastAPI', 'SQL', 'Docker', 'AWS', 'Git / GitHub'],
  },
}

export const experience = [
  {
    company: 'Inetum',
    role: 'Low-Code Developer (Prácticas)',
    period: 'Sep 2025 — May 2026 · 800h',
    description:
      'Desarrollo de una plataforma multirol de gestión de certificaciones corporativas (empleado / gestor / aprobador) con dashboards y KPIs en tiempo real.',
    achievements: [
      'Entorno empresarial real con equipo ágil de 3 desarrolladores',
      'Implementación de dashboards y KPIs en tiempo real',
      'Gestión de roles: empleado, gestor y aprobador',
    ],
    tech: ['OutSystems', 'SQL'],
    current: false,
  },
]

export const education = [
  {
    school: 'IES Ribera del Tajo',
    degrees: [
      {
        title: 'Grado Superior — Desarrollo de Aplicaciones Multiplataforma (DAM)',
        period: '2024 — 2026',
      },
      {
        title: 'Grado Medio — Sistemas Microinformáticos y Redes (SMR)',
        period: '2022 — 2024',
      },
    ],
  },
]

export const certifications = [
  {
    name: 'LangChain en Python',
    issuer: 'OpenWebinars',
    year: 'Jun 2026',
    icon: '🧠',
    accentColor: '#7C3AED',
  },
  {
    name: 'Bases de Datos Vectoriales',
    issuer: 'OpenWebinars',
    year: 'Jun 2026',
    icon: '🗄️',
    accentColor: '#7C3AED',
  },
  {
    name: 'Prompt Engineering para Desarrolladores',
    issuer: 'OpenWebinars',
    year: 'May 2026',
    icon: '✍️',
    accentColor: '#A78BFA',
  },
  {
    name: 'Automatización con n8n',
    issuer: 'OpenWebinars',
    year: '2025',
    icon: '🔗',
    accentColor: '#3B82F6',
  },
  {
    name: 'AWS Cloud Foundations & Operations',
    issuer: 'AWS Academy',
    year: '2025',
    icon: '☁️',
    accentColor: '#F59E0B',
  },
  {
    name: 'Appian Associate Developer',
    issuer: 'Appian',
    year: '2025',
    icon: '⚡',
    accentColor: '#3B82F6',
  },
]
