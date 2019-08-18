<template>
  <div class="normativa">
    <Alerta />
    <header class="goBack__header">
      <div class="container">
        <a @click="$router.go(-1)" class="volver-btn"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left">
          <span>Volver</span>
        </a>
        <FavoriteStar @click.native="cambiarFavorito" :activa="enFavoritos"/>
      </div>
    </header>
    <section class="top">
      <div class="container">
        <h1>{{ titulo }}</h1>
        <h2>{{ bajada }}</h2>
        <small v-if="fecha">{{ fecha | fecha('DD/MM/YY') }}</small>
      </div>
    </section>
    <section class="band cuerpo">
      <div class="container">
        <div v-if="!pagina.cargando">
          <h6>Introducción</h6>
          <span v-if="autor">Por {{ autor }}</span>
          <div v-if="intro" v-html="intro"></div>
          <button class="rounded__btn--medium green" @click="leerNormativa">Leer normativa</button>
          <div :class="'cuerpo__principal' + (mostrarCuerpo ? ' active' : '')">
            <button class="cerrar" @click="cerrarNormativa">Cerrar</button>
            <h1>{{ titulo }}</h1>
            <h2>{{ bajada }}</h2>
            <div v-html="cuerpo"></div>
          </div>
        </div>
        <div v-else>
          Cargando...
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Alerta from '~/components/Alerta.vue'
import FavoriteStar from '~/components/FavoriteStar.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Alerta,
    FavoriteStar
  },
  middleware: 'premium',
  async asyncData ({app, params}) {
    try {
      var normativa = await app.$axios.$get('normativas/id/' + params.id)
      normativa.url = {
        name: 'normativa',
        params: {
          id: normativa.id,
          slug: decodeURIComponent(normativa.uri)
        }
      }
    } catch (e) {
      if (!window.navigator.onLine){
        app.router.push({name: 'offline'})
      } else {
        app.router.push({name: '404'})
      }
    }
    return normativa
  },
  data () {
    return {
      mostrarCuerpo: false
    }
  },
  computed: {
    ...mapState(['pagina']),
    enFavoritos () {
      if (!this.$store.state.favoritos.normativas.length) {
        return false
      }
      let indiceFavorito = this.$store.state.favoritos.normativas.findIndex(
        favorito => this.id == favorito.id
      )
      return indiceFavorito >= 0 ? true : false
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
    leerNormativa () {
      this.mostrarCuerpo = !this.mostrarCuerpo
    },
    cerrarNormativa () {
      this.mostrarCuerpo = !this.mostrarCuerpo
    },
    ...mapActions('favoritos', [
      'agregarFavorito',
      'quitarFavorito'
    ]),
    async cambiarFavorito () {
      if( this.enFavoritos ){
        await this.quitarFavorito(this.id)
      } else {
        await this.agregarFavorito({
          id: this.id,
          titulo: this.titulo,
          bajada: this.bajada,
          fecha: this.fecha,
          url: this.url
        })
      }
    }
  },
}
</script>

<style lang="sass">@import 'sass/pages/normativa.sass'</style>