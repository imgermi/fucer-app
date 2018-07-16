<template>
  <div class="favoritas">
    <Alerta/>
  	<Top :title="title" />
    <section class="band">
      <div class="container">
        <span class="small__heading">Aquí verás las normativas que marcaste <br> como favoritas</span>
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
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import ModuloNormativa from '~/components/ModuloNormativa.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Top,
    Alerta,
    ModuloNormativa
  },
  middleware: 'premium',
  data () {
    return {
      title: 'Favoritas'
    }
  },
  computed: {
    ...mapState('favoritos', ['normativas'])
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

<style lang="sass">@import 'sass/pages/favoritas.sass'</style>