<template>
  <div class="buscar">
    <Alerta/>
  	<Top />
    <section class="band">
      <div class="container">
        <p class="center search-alert">Busque por <br> nombre, palabra <br> o año</p>
        <p class="center search-alert">No se <br> encontraron <br> resultados</p>
        <ModuloNormativa/>
      </div>
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import ModuloNormativa from '~/components/ModuloNormativa.vue'

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