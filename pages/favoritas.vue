<template>
  <div class="favoritas">
    <Alerta/>
  	<Top :title="title" />
    <main class="band">
      <div class="container">
        <span class="small__heading">Aquí verá las normativas que marcó como favoritas</span>
        <div class="normativas-container">
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
      </div>
    </main>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import ModuloNormativa from '~/components/ModuloNormativa.vue'
import { mapState } from 'vuex'

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