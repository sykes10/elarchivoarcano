<template>
  <footer class="bg-gris-oscuro text-gris mt-16">
    <div class="container mx-auto px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="font-cinzel text-oro text-lg mb-3">El Archivo Arcano</h3>
          <p class="font-lora text-sm">
            Tu biblioteca de descripciones para juegos de rol.
            Palabras que dan vida a tus mundos.
          </p>
        </div>

        <div>
          <h4 class="font-inter font-semibold text-white mb-3">Enlaces</h4>
          <ul class="space-y-2 font-lora text-sm">
            <li>
              <NuxtLink to="/" class="hover:text-oro transition-colors">
                Inicio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/buscar" class="hover:text-oro transition-colors">
                Explorar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin" class="hover:text-oro transition-colors">
                Admin
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-inter font-semibold text-white mb-3">Contacto</h4>
          <p class="font-lora text-sm">
            ¿Tienes sugerencias o ideas?<br>
            Contáctanos para colaborar.
          </p>
        </div>
      </div>

      <div class="border-t border-gris/20 mt-8 pt-6 text-center font-lora text-sm">
        <p>&copy; 2025 El Archivo Arcano. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>
