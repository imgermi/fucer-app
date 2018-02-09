<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <section class="carousel__container">
      <div class="container">
        <h2>Novedades</h2>
        <no-ssr>
          <carousel :autoplay="true" :perPage="1" :autoplayTimeout="5000">
            <slide v-for="normativa in normativasDestacadas" :key="normativa.id + '-destacada'">
              <small><nuxt-link :to="normativa.url">{{ normativa.fecha | fecha('DD/MM/YY')}}</nuxt-link></small>
              <h4><nuxt-link :to="normativa.url">{{ normativa.titulo }}</nuxt-link></h4>
              <span><nuxt-link :to="normativa.url">{{ normativa.bajada }}</nuxt-link></span>
              <nuxt-link :to="normativa.url" class="rounded__btn--medium">Ver más</nuxt-link>
            </slide>
          </carousel>
        </no-ssr>
      </div>
    </section>
    <section class="band">
      <div class="container">
        <h1>Normativa Registral</h1>
        <ModuloNormativa
          v-for="normativa in normativasMasNuevas"
          :key="normativa.id + '-ultima'"
          :titulo="normativa.titulo"
          :bajada="normativa.bajada"
          :fecha="normativa.fecha"
          :url="normativa.url"
        />
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
import { mapState, mapActions } from 'vuex';

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
      title: 'Inicio'
    }
  },
  created () {
    this.getNormativasDestacadas()
    this.getNormativasMasNuevas(1)
  },
  methods: {
    ...mapActions('inicio',[
      'getNormativasDestacadas',
      'getNormativasMasNuevas'
    ])
  },
  computed: {
    ...mapState('inicio',[
      'normativasDestacadas',
      'normativasMasNuevas'
    ])
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