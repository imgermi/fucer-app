<template>
  <div class="normativa">
    <Alerta/>
    <header class="goBack__header">
      <div class="container">
        <a @click="$router.go(-1)"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></a>
        <FavoriteStar @click.native="cambiarFavorito" :activa="enFavoritos"/>
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
        <div v-if="!pagina.cargando">
          <h6>Introducción</h6>
          <span v-if="autor">Por {{ autor }}</span>
          <div v-if="intro" v-html="intro"></div>
          <button class="rounded__btn--full" @click="leerNormativa">Leer normativa</button>
          <div :class="'cuerpo__principal' + (mostrarCuerpo ? ' active' : '')">
            <div v-html="cuerpo"></div>
          </div>
        </div>
        <div v-else>
          Cargando...
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
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Alerta,
    FavoriteStar,
    Foot
  },
  data () {
    return {
      id: 0,
      titulo: '',
      bajada: '',
      autor: '',
      fecha: '',
      intro: '',
      cuerpo: '',
      url: '',
      mostrarCuerpo: false
    }
  },
  computed: {
    ...mapState(['pagina']),
    enFavoritos () {
      let indiceFavorito = this.$store.state.favoritos.normativas.findIndex(
        favorito => this.id == favorito.id
      )
      return indiceFavorito >= 0 ? true : false
    }
  },
  async created () {
    this.setPaginaCargando(true)
    try {
      let normativa = await api.getNormativa(this.$route.params.id)
      this.id = normativa.id
      this.titulo = normativa.titulo
      this.bajada = normativa.bajada
      this.fecha = normativa.fecha
      this.autor = normativa.autor
      this.intro = normativa.intro
      this.cuerpo = normativa.cuerpo
      this.url = normativa.url
      this.setPaginaCargando(false)
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
    ...mapActions(['setPaginaCargando']),
    leerNormativa () {
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