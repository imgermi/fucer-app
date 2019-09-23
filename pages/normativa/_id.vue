<template>
  <div class="normativa">
    <Alerta />
    <nav id="menu-principal" class="goBack__header">
      <div class="container">
        <a
          href="#"
          @click.prevent="$router.go(-1)"
          @keyup.enter.prevent="$router.go(-1)"
          class="volver-btn"
        ><img src="~/assets/img/arrow-left.svg" alt="" class="arrow-left">
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
    </nav>
    <main id="contenido">
    <section class="top">
      <div class="container">
        <h1 ref="pageFocusTarget">
          <small v-if="categoria" :class="`tag normativa__tag ${categoriaUri}`">{{ categoria }}</small>
          <div>{{ titulo }}</div>
        </h1>
        <h2>{{ bajada }}</h2>
        <time v-if="fecha" :datetime="fecha | fecha('yyyy-MM-dd')">{{ fecha | fecha('dd/MM/yyyy') }}</time>
      </div>
    </section>
    <section class="band cuerpo">
        <div class="container">
          <div v-if="!pagina.cargando">
            <h6>Introducción</h6>
            <span v-if="autor">Por {{ autor }}</span>
            <div v-if="intro" v-html="intro"></div>
            <a
              href="#contenido-normativa"
              class="rounded__btn--medium green"
              ref="btnLeer"
              @click="leerNormativa"
              @keyup.enter="leerNormativa"
            >Leer</a>
            <div id="contenido-normativa" :class="'cuerpo__principal' + (mostrarCuerpo ? ' active' : '')">
              <focus-trap
                :active="mostrarCuerpo"
                :initial-focus="() => $refs.btnCerrar"
                :returnFocusOnDeactivate="false"
                v-on:activate="leerNormativa"
                v-on:deactivate="cerrarNormativa"
              >
                <div>
                  <button
                    ref="btnCerrar"
                    class="cerrar"
                    @click="cerrarNormativa"
                    @keyup.enter="cerrarNormativa"
                  >Cerrar</button>
                  <h1>{{ titulo }}</h1>
                  <h2>{{ bajada }}</h2>
                  <div v-html="cuerpo"></div>
                </div>
              </focus-trap>
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
        let cache = await caches.match(`https://fucer.com.ar/app/api/normativas/id/${params.id}`)
        if (cache) {
          return cache.json()
        }
        app.router.push({name: 'offline'})
      } else {
        app.router.push({name: '404'})
      }
    }
    return normativa
  },
  data () {
    return {
      id: 0,
      title: '',
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
      if(to.name !== from.name){
        vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
      }
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
      this.$announcer.set(
        `${this.titulo} ${this.$announcer.options.complementRoute}`,
        this.$announcer.options.politeness
      )
    } catch (e) {
      this.$router.push({name: '404'})
      console.log(e)
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
      this.mostrarCuerpo = true
    },
    cerrarNormativa () {
      this.mostrarCuerpo = false
      this.$router.replace({ hash: '' })
      this.$refs.btnLeer.focus()
    },
    ...mapActions('favoritos', [
      'agregarFavorito',
      'quitarFavorito'
    ]),
    async cambiarFavorito () {
      if( this.enFavoritos ){
        await this.quitarFavorito(this.id)
        this.$announcer.set(`Quitado de favoritos`)
      } else {
        await this.agregarFavorito({
          id: this.id,
          titulo: this.titulo,
          bajada: this.bajada,
          fecha: this.fecha,
          url: this.url
        })
        this.$announcer.set(`Agregado a favoritos`)
      }
    }
  },
}
</script>

<style lang="sass">@import 'sass/pages/normativa.sass'</style>