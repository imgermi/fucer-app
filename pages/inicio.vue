<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <section class="carousel__container">
      <div class="container">
        <h2>Novedades</h2>
        <carousel :autoplay="true" :perPage="1" :autoplayTimeout="5000">
          <slide v-for="normativa in normativas" :key="normativa.id">
            <h4><nuxt-link :to="{ name: 'normativa' }">{{ normativa.titulo }}</nuxt-link></h4>
            <small><nuxt-link :to="{ name: 'normativa' }">{{ normativa.fecha }}</nuxt-link></small>
            <nuxt-link :to="{ name: 'normativa' }" class="rounded__btn--medium">Ver más</nuxt-link>
          </slide>
        </carousel>
      </div>
    </section>
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
      normativas: [
        {titulo: 'Normativa Titulo 1', fecha: '22/12/07'},
        {titulo: 'Titulo Dos de Normativa', fecha: '22/1/02'}
      ]
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
}

</script>

<style lang="sass">@import 'sass/components/vue-carousel.sass'</style>