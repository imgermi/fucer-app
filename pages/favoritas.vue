<template>
  <div class="favoritas">
    <Alerta/>
  	<Top :title="title" />
    <section class="band">
      <div class="container">
        <span class="small__heading">Aquí verás las normativas que marcaste <br> como favoritas</span>
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
      title: 'Favoritas'
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