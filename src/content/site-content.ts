/**
 * Todo el texto del sitio vive acá.
 * Para cambiar un copy no hace falta tocar componentes.
 * Fuente: captions y bio de @felicitas.finanzas (validar con ella antes de publicar).
 */

export const siteConfig = {
  name: "Felicitas Valenzuela",
  shortName: "Feli",
  initials: "FV",
  tagline: "Bajo las finanzas a tierra, para que tu plata trabaje por vos.",
  description:
    "Asesoría financiera para personas y empresas, en Argentina y Estados Unidos. Una estrategia pensada para vos, no una receta general.",
  url: "https://felicitasfinanzas.com",
  location: "Buenos Aires, Argentina",
  cnv: {
    role: "Agente Productor",
    number: "1782",
  },
  year: 2026,
  links: {
    instagram: "https://www.instagram.com/felicitas.finanzas/",
    linkedin: "https://ar.linkedin.com/in/felicitas-valenzuela-11ba56104",
  },
  credit: { label: "vch.studio", href: "https://vch.studio" },
  // TODO(Feli): reemplazar por una foto en alta resolución (esta es provisoria, 400x400).
  portrait: {
    src: "/images/feli-retrato.jpg",
    alt: "Retrato de Felicitas Valenzuela sonriendo",
  },
  // Alternativa en evaluación en /hero-lab (447x447, provisoria también).
  portraitBeach: {
    src: "/images/feli-playa.png",
    alt: "Felicitas Valenzuela sonriendo en la playa, con camisa blanca",
  },
} as const;

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Sobre mí", href: "#sobre-mi" },
] as const;

export const heroContent = {
  title: siteConfig.tagline,
  lead: siteConfig.description,
  cta: "Completar el formulario",
  ctaNote: "Te lleva 2 minutos",
  // Rol junto a la foto. La matrícula CNV va en los facts (no repetirla acá).
  byline: "Asesora financiera",
  facts: [
    { before: "", strong: "+100 clientes", after: " asesorados" },
    { before: "Inversiones en ", strong: "Argentina y EE.UU.", after: "" },
    {
      before: `${siteConfig.cnv.role} CNV, `,
      strong: `matrícula N° ${siteConfig.cnv.number}`,
      after: "",
    },
  ],
} as const;

export const situationsContent = {
  title: "¿Te pasa alguna de estas?",
  intro:
    "Son las situaciones que más veo en las personas que me escriben. Si te identificás con alguna, probablemente pueda ayudarte.",
  items: [
    {
      question: "Vendiste una propiedad y tenés los dólares guardados “por las dudas”.",
      answer:
        "Lo que parece conservador puede ser una pérdida silenciosa. Tu patrimonio necesita estrategia, no pausa.",
    },
    {
      question: "Tu empresa tiene plata parada en la cuenta.",
      answer:
        "La tesorería no debería ser un depósito improductivo. Con instrumentos de corto plazo podés tener liquidez y rendimiento a la vez.",
    },
    {
      question: "Querés empezar a pensar en tu jubilación y no sabés por dónde.",
      answer:
        "No existe una sola forma de invertir para el retiro. La estrategia cambia según la etapa en la que estás.",
    },
    {
      question: "“Soy conservador”… pero no sabés bien qué significa para tu plata.",
      answer:
        "Tu perfil de inversor no es lo que decís, es cómo reaccionás. Lo definimos juntos, con datos reales.",
    },
    {
      question: "Tu patrimonio creció, pero tu tranquilidad no.",
      answer:
        "Más capital no siempre significa más tranquilidad. Gestionar patrimonio también es gestionar paz mental.",
    },
  ],
  cta: {
    text: "¿Te identificaste con alguna?",
    link: "Contame tu caso",
  },
} as const;

export const servicesContent = {
  title: "Cómo te puedo ayudar",
  intro:
    "Trabajo con personas que quieren que su ahorro rinda y con empresas que buscan ordenar su liquidez.",
  groups: [
    {
      id: "personas",
      title: "Personas",
      description: "Para que tu ahorro deje de perder contra la inflación y tenga un objetivo claro.",
      tone: "light",
      items: [
        "Gestión de patrimonio a medida que tu capital crece",
        "Armado de cartera según tu perfil y tus metas",
        "Qué hacer con los dólares después de vender una propiedad",
        "Estrategia para la jubilación según tu etapa",
        "Orden financiero: fondo de emergencia, deudas y ahorro",
        "Inversiones en Argentina y en el exterior",
      ],
    },
    {
      id: "empresas",
      title: "Empresas",
      description:
        "Para que la caja trabaje y el patrimonio del dueño no dependa solo del negocio.",
      tone: "dark",
      items: [
        "Gestión de tesorería y cash management",
        "Instrumentos de corto plazo con liquidez",
        "Separar el patrimonio personal del empresarial",
        "Vivir de tu patrimonio sin descapitalizar la empresa",
      ],
    },
  ],
} as const;

// TODO(Feli): validar que estos pasos reflejen su proceso real.
export const processContent = {
  title: "Cómo funciona",
  intro: "Antes de reunirnos me gusta entender tu caso. Así la primera charla ya es útil.",
  steps: [
    {
      title: "Completás el formulario",
      description: "Unas preguntas cortas sobre vos, tu objetivo y tu experiencia.",
    },
    {
      title: "Reviso tu caso",
      description: "Leo cada respuesta personalmente para ver si te puedo ayudar.",
    },
    {
      title: "Coordinamos una reunión",
      description: "Si hay match, te escribo para agendar una charla privada.",
    },
    {
      title: "Armamos tu estrategia",
      description: "Diseño un plan a tu medida y te acompaño en cada ajuste.",
    },
  ],
} as const;

// Fuente: reel DdYmObihrqZ y captions. TODO(Feli): validar títulos e intro (son redacción nuestra).
export const principlesContent = {
  title: "Finanzas en orden",
  intro: "Antes de hablar de inversiones, hay una base que conviene tener resuelta. Son los principios que más repito.",
  items: [
    {
      title: "Fondo de emergencia",
      description: "De 3 a 6 meses de gastos, en algo conservador. Es para imprevistos.",
    },
    {
      title: "Pagate a vos primero",
      description: "No inviertas “lo que te sobra”: separá tu parte apenas cobrás.",
    },
    {
      title: "Primero, la deuda cara",
      description: "Antes de invertir, cancelá la deuda más cara.",
    },
    {
      title: "70 · 20 · 10",
      description: "70% para gastos, 20% para inversión y 10% para tus gustos.",
    },
    {
      title: "No dejes la plata parada",
      description: "La plata quieta también pierde: contra la inflación y contra lo que podría estar rindiendo.",
    },
    {
      title: "Constancia y paciencia",
      description: "El mercado recompensa al que no abandona y no se deja llevar por la ansiedad.",
    },
  ],
  quote: "No dejes a tu “yo de 80 años” librado a la voluntad de tu “yo de fin de mes”.",
} as const;

export const aboutContent = {
  title: "Hola, soy Feli",
  quote: "Invertir no es solo estrategia, es gestión emocional.",
  paragraphs: [
    "Soy licenciada en Administración de Empresas y trabajo en el mercado financiero desde 2021, acompañando a personas y empresas a invertir con criterio.",
    "Creo que la generalización trae preocupaciones evitables. Por eso cada estrategia se arma en función de lo que a cada uno lo deja tranquilo.",
  ],
  credentials: [
    { label: "Formación", value: "Lic. en Administración de Empresas, Universidad Austral" },
    {
      label: "Registro",
      value: `${siteConfig.cnv.role} CNV, matrícula N° ${siteConfig.cnv.number}`,
    },
    { label: "Ubicación", value: siteConfig.location },
  ],
  // Episodios verificados en YouTube (Neura Media).
  press: {
    label: "En medios",
    value: "Invitada en Cash is King, de Neura Media",
    links: [
      { label: "Episodio del 16/12/2025", href: "https://www.youtube.com/watch?v=V5P_2DYw8lM" },
      { label: "Episodio del 03/02/2026", href: "https://www.youtube.com/watch?v=sdKgbEYbjnA" },
    ],
  },
} as const;

export const leadContent = {
  title: "Veamos si puedo ayudarte",
  lead: "Contame un poco sobre vos y lo que buscás. Reviso cada caso y, si hay match, te escribo para coordinar una reunión.",
  notes: [
    "Tus datos son confidenciales y solo los uso para contactarte.",
    "Completarlo no te compromete a nada.",
  ],
  alternative: "¿Preferís escribirme directo?",
  success: {
    title: (firstName: string) => `¡Listo, ${firstName}!`,
    body: "Recibí tus respuestas. Las reviso personalmente y, si veo que puedo ayudarte, te escribo por WhatsApp o mail para coordinar una reunión.",
  },
} as const;

export const footerContent = {
  disclaimer:
    "La información de este sitio es de carácter general y no constituye una recomendación de inversión. Toda inversión implica riesgos y los rendimientos pasados no garantizan resultados futuros.",
  registry: `${siteConfig.cnv.role} registrada en la Comisión Nacional de Valores, matrícula N° ${siteConfig.cnv.number}.`,
  location: siteConfig.location,
} as const;
