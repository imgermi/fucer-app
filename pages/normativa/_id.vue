<template>
  <div class="normativa">
    <Alerta />
    <header class="goBack__header">
      <div class="container">
        <a
          @click="$router.go(-1)"
          @keyup.enter="$router.go(-1)"
          class="volver-btn"
        ><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left">
          <span>Volver</span>
        </a>
        <FavoriteStar
          :aria-label="(enFavoritos ? 'Quitar de' : 'Agregar a')+ ' favoritos'"
          tabindex="0"
          @click.native="cambiarFavorito"
          @keyup.native.enter="cambiarFavorito"
          :activa="enFavoritos"
        />
      </div>
    </header>
    <main id="contenido">
    <section class="top">
      <div class="container">
        <h1 ref="pageFocusTarget">
          <small v-if="categoria" :class="`tag normativa__tag ${categoriaUri}`">{{ categoria }}</small>
          <div>{{ titulo }}</div>
        </h1>
        <h2>{{ bajada }}</h2>
        <time v-if="fecha" :datetime="fecha | fecha('YYYY-MM-DD')">{{ fecha | fecha('DD/MM/YY') }}</time>
      </div>
    </section>
    <section class="band cuerpo">
        <div class="container">
          <div v-if="!pagina.cargando">
            <h6>Introducción</h6>
            <span v-if="autor">Por {{ autor }}</span>
            <div v-if="intro" v-html="intro"></div>
            <button
              class="rounded__btn--medium green"
              @click="leerNormativa"
              @keyup.enter="leerNormativa"
            >Leer</button>
            <div :class="'cuerpo__principal' + (mostrarCuerpo ? ' active' : '')">
              <button
                class="cerrar"
                @click="cerrarNormativa"
                @keyup.enter="cerrarNormativa"
              >Cerrar</button>
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
    </main>
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
  data () {
    return {
      id: 0,
      titulo: '',
      bajada: '',
      autor: '',
      categoria: '',
      categoriaUri: '',
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
      if (!this.$store.state.favoritos.normativas.length) {
        return false
      }
      let indiceFavorito = this.$store.state.favoritos.normativas.findIndex(
        favorito => this.id == favorito.id
      )
      return indiceFavorito >= 0 ? true : false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
    })
  },
  async created () {
    this.setPaginaCargando(true)
    try {
      let normativa = await this.$axios.$get('normativas/id/' + this.$route.params.id)
      this.id = normativa.id
      this.titulo = normativa.titulo
      this.bajada = normativa.bajada
      this.fecha = normativa.fecha
      this.autor = normativa.autor
      this.categoria = normativa.categoria
      this.categoriaUri = normativa.categoria_uri
      this.intro = normativa.intro
      this.cuerpo = normativa.cuerpo
      this.url = {
        name: 'normativa',
        params: {
          id: normativa.id,
          slug: decodeURIComponent(normativa.uri)
        }
      }
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