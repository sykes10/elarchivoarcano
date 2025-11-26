# El Archivo Arcano

Tu biblioteca de descripciones para juegos de rol. Palabras que dan vida a tus mundos.

## Configuración inicial

### 1. Variables de entorno

Copia el archivo `.env.example` a `.env` y configura tus credenciales de Supabase:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
```

### 2. Instalación

```bash
npm install
```

### 3. Desarrollo

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

## Características implementadas

- ✅ Autenticación con Supabase
- ✅ Login y registro de usuarios
- ✅ Protección de rutas de administrador
- ✅ Navbar con estado de autenticación
- ⏳ Panel de administración (próximamente)
- ⏳ CRUD de descripciones (próximamente)
- ⏳ Sistema de favoritos (próximamente)

## Configurar roles de administrador

Para hacer que un usuario sea administrador, actualiza el campo `role` en la metadata del usuario en Supabase:

1. Ve a tu proyecto en Supabase
2. Authentication → Users
3. Selecciona el usuario
4. En "User Metadata", agrega:
   ```json
   {
     "role": "admin"
   }
   ```

## Estructura del proyecto

```
app/
├── components/       # Componentes Vue
├── composables/      # Composables de Vue (lógica reutilizable)
├── layouts/          # Layouts de la aplicación
├── middleware/       # Middleware de rutas
├── pages/            # Páginas de la aplicación
└── plugins/          # Plugins de Nuxt (Supabase)
```

---

For more information about Nuxt, check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).
