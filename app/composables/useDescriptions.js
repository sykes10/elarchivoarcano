export const useDescriptions = () => {
  const descriptions = ref([])

  // Mock data (Supabase integration disabled)
  const mockDescriptions = [
    {
      id: "1",
      title: "Bosque Antiguo",
      content: "La luz se filtra entre troncos retorcidos como dedos viejos...",
      content_short: "El bosque respira hondo, como si despertara contigo dentro.",
      content_long: "El bosque se extiende a ambos lados del camino, denso y antiguo. Los árboles, retorcidos por siglos de crecimiento, forman un techo natural que apenas deja pasar la luz del sol. Un silencio extraño envuelve el lugar, interrumpido solo por el crujir ocasional de ramas secas bajo tus pies. El aire huele a tierra húmeda y musgo.",
      category: "Lugares",
      tags: ["bosque", "magia", "misterio"],
      variants: [
        "Silencio pesado; incluso los animales parecen evitar este lugar.",
        "Los árboles murmuran secretos antiguos a los viajeros."
      ],
      created_at: "2025-01-15T10:30:00Z"
    },
    {
      id: "2",
      title: "Tabernero Cansado",
      content: "El tabernero limpia el mismo vaso desde hace varios minutos...",
      content_short: "Sus ojos apenas levantan la mirada cuando entras.",
      content_long: "Detrás de la barra, el tabernero suspira y continúa su labor monótona. Es un hombre de mediana edad, con arrugas marcadas alrededor de los ojos y una barba descuidada. Sus movimientos son mecánicos, como si hubiera limpiado ese mismo vaso miles de veces antes. Cuando finalmente te mira, sus ojos cansados reflejan años de historias escuchadas y olvidadas.",
      category: "NPCs",
      tags: ["taberna", "npc", "humano"],
      variants: [
        "Su voz, ronca y tranquila, revela que ha visto demasiadas noches como esta.",
        "El tabernero murmura una bienvenida sin levantar la vista."
      ],
      created_at: "2025-01-16T14:20:00Z"
    },
    {
      id: "3",
      title: "Ruinas Olvidadas",
      content: "Piedras cubiertas de musgo marcan lo que alguna vez fue grandioso...",
      content_short: "Las ruinas susurran historias de gloria perdida.",
      content_long: "Las columnas caídas y muros derrumbados de este antiguo templo se extienden por el claro del bosque. Enredaderas trepadoras abrazan cada piedra, como si la naturaleza intentara reclamar lo que una vez fue suyo. En el centro, un altar agrietado aún se mantiene en pie, con símbolos arcanos apenas visibles bajo siglos de erosión.",
      category: "Lugares",
      tags: ["ruinas", "antiguo", "misterio"],
      variants: [
        "Un aura de magia latente flota en el aire, casi palpable.",
        "Los pájaros evitan volar sobre este lugar maldito."
      ],
      created_at: "2025-01-17T09:15:00Z"
    }
  ]

  const fetchDescriptions = async () => {
    // Using mock data only
    descriptions.value = mockDescriptions
  }

  const getDescriptionById = (id) => {
    return descriptions.value.find(d => d.id === id)
  }

  const searchDescriptions = (query) => {
    if (!query) return descriptions.value

    const lowerQuery = query.toLowerCase()
    return descriptions.value.filter(desc => {
      return desc.title?.toLowerCase().includes(lowerQuery) ||
             desc.content?.toLowerCase().includes(lowerQuery) ||
             desc.content_short?.toLowerCase().includes(lowerQuery) ||
             desc.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    })
  }

  return {
    descriptions,
    fetchDescriptions,
    getDescriptionById,
    searchDescriptions
  }
}
