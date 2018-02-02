<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <section class="carousel__container">
      <div class="container">
        <h2>Novedades</h2>
        <carousel :autoplay="true" :perPage="1" :autoplayTimeout="5000">
          <slide>
            <h4><nuxt-link :to="{ name: 'normativa' }">Resolución MJ y DH Nº 238/2003 (Concursos)</nuxt-link></h4>
            <small><nuxt-link :to="{ name: 'normativa' }">30/12/12</nuxt-link></small>
            <button><nuxt-link :to="{ name: 'normativa' }" class="rounded__btn--medium">Ver más</nuxt-link></button>
          </slide>
          <slide>
            <h4><nuxt-link :to="{ name: 'normativa' }">Resolución Slide 2 238/2003 (Concursos)</nuxt-link></h4>
            <small><nuxt-link :to="{ name: 'normativa' }">30/12/12</nuxt-link></small>
            <button><nuxt-link :to="{ name: 'normativa' }" class="rounded__btn--medium">Ver más</nuxt-link></button>
          </slide>
          <slide>
            <h4><nuxt-link :to="{ name: 'normativa' }">Resolución MJ Slide 3(Concursos)</nuxt-link></h4>
            <small><nuxt-link :to="{ name: 'normativa' }">30/12/12</nuxt-link></small>
            <button><nuxt-link :to="{ name: 'normativa' }" class="rounded__btn--medium">Ver más</nuxt-link></button>
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