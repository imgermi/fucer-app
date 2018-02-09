<template>
  <div class="buscar">
    <Alerta/>
  	<Top />
    <section class="band">
      <div class="container">
        <div v-if="!cargando && !normativas.length">
          <p v-if="!$route.query.busqueda" class="center search-alert">Busque por <br> nombre, palabra <br> o año</p>
          <p v-else class="center search-alert">No se <br> encontraron <br> resultados</p>
        </div>
        <div v-else>
          <ModuloNormativa
            v-for="normativa in normativas"
            :key="normativa.id + '-ultima'"
            :titulo="normativa.titulo"
            :bajada="normativa.bajada"
            :fecha="normativa.fecha"
            :url="normativa.url"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import ModuloNormativa from '~/components/ModuloNormativa.vue'
import { mapState } from 'vuex';

export default {
  components: {
    Top,
    Alerta,
    ModuloNormativa
  },
  data () {
    return {
      title: 'Buscar'
    }
  },
  computed: {
    ...mapState([
      'cargando'
    ]),
    ...mapState('buscar',[
      'normativas'
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