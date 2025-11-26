# Plan

## Estructura de carpetas

archivo-arcano/
│
├─ app/
│   ├─ components/
│   │   ├─ CardDescription.vue
│   │   ├─ SearchBar.vue
│   │   ├─ NavBar.vue
│   │   ├─ FooterBar.vue
│   │   ├─ CategoryList.vue
│   │   └─ DescriptionViewer.vue
│   │
│   ├─ layouts/
│   │   └─ default.vue
│   │
│   ├─ pages/
│   │   ├─ index.vue
│   │   ├─ categoria/[slug].vue
│   │   ├─ descripcion/[id].vue
│   │   ├─ buscar.vue
│   │   └─ admin/index.vue
│   │
│   ├─ plugins/
│   │   └─ supabase.js
│   │
│   ├─ composables/
│   │   ├─ useDescriptions.js
│   │   └─ useCategories.js
│   │
│   └─ assets/
│       ├─ img/
│       └─ css/
│
├─ nuxt.config.ts
└─ package.json

## Plugin Supabase (app/plugins/supabase.js)

```js
import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  return {
    provide: {
      supabase
    }
  }
})
```

## Composable de Descripciones (app/composables/useDescriptions.js)
```js
export const useDescriptions = () => {
  const { $supabase } = useNuxtApp()
  const descriptions = ref([])

  const fetchDescriptions = async () => {
    const { data, error } = await $supabase
      .from('descriptions')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else descriptions.value = data
  }

  return {
    descriptions,
    fetchDescriptions
  }
}
```

## Composable de Categorías (app/composables/useCategories.js)

```ts
export const useCategories = () => {
  const { $supabase } = useNuxtApp()
  const categories = ref([])

  const fetchCategories = async () => {
    const { data, error } = await $supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
    if (error) console.error(error)
    else categories.value = data
  }

  return {
    categories,
    fetchCategories
  }
}
```

## Componente CardDescription (app/components/CardDescription.vue)

```vue
<template>
  <div class="flex items-center">
    <input
      type="text"
      v-model="query"
      placeholder="Busca una descripción..."
      class="flex-1 p-2 border border-gray-400 rounded-l"
      @keyup.enter="search"
    />
    <button
      @click="search"
      class="bg-[#4C2A72] text-white px-4 rounded-r hover:bg-[#C7A86B]"
    >
      🔍
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['search'])
const query = ref('')

const search = () => {
  emit('search', query.value)
}
</script>

```

## Componente SearchBar (app/components/SearchBar.vue)

```vue
<template>
  <div class="flex items-center">
    <input
      type="text"
      v-model="query"
      placeholder="Busca una descripción..."
      class="flex-1 p-2 border border-gray-400 rounded-l"
      @keyup.enter="search"
    />
    <button
      @click="search"
      class="bg-[#4C2A72] text-white px-4 rounded-r hover:bg-[#C7A86B]"
    >
      🔍
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['search'])
const query = ref('')

const search = () => {
  emit('search', query.value)
}
</script>
```
## Página de inicio (app/pages/index.vue)

```vue
<template>
  <div class="p-8">
    <h1 class="text-4xl font-serif text-[#4C2A72]">El Archivo Arcano</h1>
    <p class="text-lg text-gray-700 mt-2">Narración lista para jugar.</p>

    <SearchBar @search="handleSearch" class="mt-4"/>

    <div class="grid grid-cols-3 gap-4 mt-8">
      <CardDescription
        v-for="desc in descriptions"
        :key="desc.id"
        :title="desc.title"
        :preview="desc.content_short"
        @view="viewDescription(desc.id)"
      />
    </div>
  </div>
</template>

<script setup>
import CardDescription from '~/components/CardDescription.vue'
import SearchBar from '~/components/SearchBar.vue'
import { useDescriptions } from '~/composables/useDescriptions.js'

const { descriptions, fetchDescriptions } = useDescriptions()

onMounted(fetchDescriptions)

const handleSearch = (query) => {
  console.log('Buscar:', query)
}

const viewDescription = (id) => {
  console.log('Ver descripción', id)
}
</script>

```


## Página de detalle (app/pages/descripcion/[id].vue)

```vue
<template>
  <div class="p-8">
    <h1 class="text-3xl font-serif text-[#4C2A72]">{{ description.title }}</h1>
    <p class="mt-4 text-gray-800">{{ description.content }}</p>

    <button
      class="mt-4 bg-[#4C2A72] text-white px-4 py-2 rounded hover:bg-[#C7A86B]"
      @click="copyText"
    >
      Copiar
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useDescriptions } from '~/composables/useDescriptions.js'

const { descriptions, fetchDescriptions } = useDescriptions()
const route = useRoute()
const description = ref({ title: '', content: '' })

onMounted(async () => {
  await fetchDescriptions()
  description.value = descriptions.value.find(d => d.id === route.params.id)
})

const copyText = () => {
  navigator.clipboard.writeText(description.value.content)
}
</script>
```

## Configuración Nuxt (nuxt.config.ts)

```ts
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  modules: ['@nuxtjs/tailwindcss']
})
```

## Contenido de prueba (JSON)

```json
[
  {
    "id": "1",
    "title": "Bosque Antiguo",
    "content": "La luz se filtra entre troncos retorcidos como dedos viejos...",
    "content_short": "El bosque respira hondo, como si despertara contigo dentro.",
    "content_long": "El bosque se extiende a ambos lados del camino...",
    "category": "Lugares",
    "tags": ["bosque","magia","misterio"],
    "variants": [
      "Silencio pesado; incluso los animales parecen evitar este lugar.",
      "Los árboles murmuran secretos antiguos a los viajeros."
    ]
  },
  {
    "id": "2",
    "title": "Tabernero Cansado",
    "content": "El tabernero limpia el mismo vaso desde hace varios minutos...",
    "content_short": "Sus ojos apenas levantan la mirada cuando entras.",
    "content_long": "Detrás de la barra, el tabernero suspira y continúa su labor...",
    "category": "NPCs",
    "tags": ["taberna","npc","humano"],
    "variants": [
      "Su voz, ronca y tranquila, revela que ha visto demasiadas noches como esta.",
      "El tabernero murmura una bienvenida sin levantar la vista."
    ]
  }
]
```