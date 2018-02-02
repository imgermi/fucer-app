<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <section class="band">
      <div class="container">
        <h1>Normativa Registral</h1>
        <ModuloNormativa/>
        <cargarMas/>
      </div>
    </section>
    <Foot/>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import Foot from '~/components/Foot.vue'
import ModuloNormativa from '~/components/ModuloNormativa.vue'
import cargarMas from '~/components/cargarMas.vue'

export default {
  components: {
    Top,
    Alerta,
    Foot,
    cargarMas,
    ModuloNormativa,
  },
  data () {
    return {
      title: 'Inicio',
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