export const useCategories = () => {
  const categories = ref([])

  // Mock data (Supabase integration disabled)
  const mockCategories = [
    {
      id: "1",
      name: "Lugares",
      slug: "lugares",
      count: 2,
      description: "Descripciones de locaciones, entornos y escenarios"
    },
    {
      id: "2",
      name: "NPCs",
      slug: "npcs",
      count: 1,
      description: "Personajes no jugadores para tus aventuras"
    },
    {
      id: "3",
      name: "Objetos",
      slug: "objetos",
      count: 0,
      description: "Objetos mágicos y mundanos"
    },
    {
      id: "4",
      name: "Eventos",
      slug: "eventos",
      count: 0,
      description: "Sucesos y acontecimientos para tus historias"
    }
  ]

  const fetchCategories = async () => {
    // Using mock data only
    categories.value = mockCategories
  }

  const getCategoryBySlug = (slug) => {
    return categories.value.find(c => c.slug === slug)
  }

  return {
    categories,
    fetchCategories,
    getCategoryBySlug
  }
}
