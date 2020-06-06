<template>
  <div class="favoritas">
    <Alerta/>
  	<Top
      :title="title"
    />
    <main id="contenido" class="band">
      <div class="container">
        <span class="small__heading">Aquí verá las normativas que marcó como favoritas</span>
        <div class="normativas-container" ref="pageFocusTarget">
          <ModuloNormativa
            v-for="normativa in favoritas"
            :key="normativa.id + '-ultima'"
            :id="normativa.id"
            :titulo="normativa.titulo"
            :bajada="normativa.bajada"
            :categoria="normativa.categoria"
            :categoriaUri="normativa.categoria_uri"
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
import { mapGetters } from 'vuex'

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
    ...mapGetters('normativas', ['favoritas']),
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      )
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
    })
  },
  head () {
    return {
      title: this.title,
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/favoritas.sass'</style>