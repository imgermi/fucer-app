<template>
  <div class="buscar">
    <Alerta />
  	<Top />
    <main class="band">
      <div class="container">
        <div v-if="!pagina.cargando">
          <p v-if="!$route.query.busqueda && !busqueda" class="center search-alert">
            Busque por <br> nombre, palabra <br> o año
          </p>
          <div v-else>
            <div v-if="normativas.length > 0">
              <ModuloNormativa
                v-for="normativa in normativas"
                :key="normativa.id + '-ultima'"
                :id="normativa.id"
                :titulo="normativa.titulo"
                :bajada="normativa.bajada"
                :fecha="normativa.fecha"
                :url="normativa.url"
              />
            </div>
            <div v-else>
              <p class="center search-alert">No se <br> encontraron <br> resultados</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="center">
            Cargando...
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import ModuloNormativa from '~/components/ModuloNormativa.vue'
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'app',
  components: {
    Top,
    Alerta,
    ModuloNormativa
  },
  middleware: 'premium',
  data () {
    return {
      title: 'Buscar'
    }
  },
  computed: {
    ...mapState([
      'pagina'
    ]),
    ...mapState('buscar',[
      'normativas',
      'busqueda'
    ])
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/buscar.sass'</style>