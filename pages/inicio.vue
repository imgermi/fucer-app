<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <carousel>
      <slide>
        Slide 1 Content
      </slide>
      <slide>
        Slide 2 Content
      </slide>
      <slide>
        Slide 2 Content
      </slide>
      <slide>
        Slide 2 Content
      </slide>
    </carousel>
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
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Top,
    Alerta,
    Foot,
    cargarMas,
    ModuloNormativa,
    Carousel,
    Slide
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