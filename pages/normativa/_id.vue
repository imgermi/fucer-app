<template>
  <div class="normativa">
    <Alerta/>
    <header class="goBack__header">
      <div class="container">
        <a @click="$router.go(-1)"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></a>
        <FavoriteStar/>
      </div>
    </header>
    <section class="top">
      <div class="container">
        <h1>{{ titulo }}</h1>
        <small v-if="fecha">{{ fecha | fecha('YYYY') }}</small>
      </div>
    </section>
    <section class="band cuerpo">
      <div class="container">
        <h6>Introducción</h6>
        <span v-if="autor">Por {{ autor }}</span>
        <div v-if="intro" v-html="intro"></div>
        <button class="rounded__btn--full" v-on:click="LeerNormativa">Leer normativa</button>
        <div :class="'cuerpo__principal' + (mostrarCuerpo ? ' active' : '')">
          {{ cuerpo }}
        </div>
      </div>
    </section>
    <Foot/>
  </div>
</template>

<script>
import Alerta from '~/components/Alerta.vue'
import FavoriteStar from '~/components/FavoriteStar.vue'
import Foot from '~/components/Foot.vue'
import api from '~/api'

export default {
  components: {
    Alerta,
    FavoriteStar,
    Foot
  },
  data () {
    return {
      titulo: '',
      autor: '',
      fecha: '',
      intro: '',
      cuerpo: '',
      mostrarCuerpo: false
    }
  },
  async created () {
    try {
      let normativa = await api.getNormativa(this.$route.params.id)
      this.titulo = normativa.titulo
      this.fecha = normativa.fecha
      this.autor = normativa.autor
      this.intro = normativa.intro
      this.cuerpo = normativa.cuerpo
    } catch (e) {
      this.$router.push({name: '404'})
    }
  },
  head () {
    return {
      title: this.titulo,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  methods: {
    LeerNormativa: function(event) {
      this.cuerpoActivo = !this.cuerpoActivo
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/normativa.sass'</style>