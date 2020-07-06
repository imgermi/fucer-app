<template>
  <div class="normativa">
    <Alerta />
    <nav
      id="menu-principal"
      class="goBack__header"
    >
      <div class="container">
        <a
          href="#"
          class="volver-btn"
          @click.prevent="$router.go(-1)"
          @keyup.enter.prevent="$router.go(-1)"
        ><img
           src="~/assets/img/arrow-left.svg"
           alt=""
           class="arrow-left"
         >
          <span>Volver</span>
        </a>
        <FavoriteStar
          :aria-label="(enFavoritos ? 'Quitar de' : 'Agregar a')+ ' favoritos'"
          tabindex="0"
          :activa="enFavoritos"
          @click.native="toggleFavorito(id)"
          @keyup.native.enter="toggleFavorito(id)"
        />
      </div>
    </nav>
    <main id="contenido">
      <section class="top">
        <div class="container">
          <h1 ref="pageFocusTarget">
            <small
              v-if="categoria"
              :class="`tag normativa__tag ${categoriaUri}`"
            >{{ categoria }}</small>
            <div>{{ titulo }}</div>
          </h1>
          <h2>{{ bajada }}</h2>
          <time
            v-if="fecha"
            :datetime="fecha | fecha('yyyy-MM-dd')"
          >{{ fecha | fecha('dd/MM/yyyy') }}</time>
        </div>
      </section>
      <section class="band cuerpo">
        <div class="container">
          <div v-if="!pagina.cargando">
            <h6>Introducción</h6>
            <span v-if="autor">Por {{ autor }}</span>
            <template v-if="intro">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="intro" />
            </template>
            <a
              ref="btnLeer"
              href="#contenido-normativa"
              class="rounded__btn--medium green"
              @click.prevent="leerNormativa"
              @keyup.enter.prevent="leerNormativa"
            >Leer</a>
            <div
              id="contenido-normativa"
              :class="'cuerpo__principal' + (mostrarCuerpo ? ' active' : '')"
            >
              <focus-trap
                :active="mostrarCuerpo"
                :initial-focus="() => $refs.btnCerrar"
                :return-focus-on-deactivate="false"
              >
                <div>
                  <button
                    ref="btnCerrar"
                    class="cerrar"
                    @click="cerrarNormativa"
                    @keyup.enter="cerrarNormativa"
                  >
                    Cerrar
                  </button>
                  <h1>{{ titulo }}</h1>
                  <h2>{{ bajada }}</h2>
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div v-html="cuerpo" />
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
  async asyncData ({app: {router, store}, params}) {
    try {
      await store.dispatch('normativas/getById', params.id)
      return store.state.normativas.byId[params.id]
    } catch (e) {
      if (!window.navigator.onLine){
        const cache = await caches.open('fucer-api')
        const match = cache.match(`/api/normativas/id/${params.id}`) 
        if (match) {
          return match.json()
        }
        router.push({name: 'offline'})
      } else {
        router.push({name: '404'})
      }
    }
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
    enFavoritos() {
      return this.$store.getters['normativas/enFavoritos'](this.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(to.name !== from.name){
        vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
      }
    })
  },
  created () {
    this.$announcer.set(
      `${this.titulo} ${this.$announcer.options.complementRoute}`,
      this.$announcer.options.politeness
    )
  },
  methods: {
    leerNormativa () {
      this.mostrarCuerpo = true
      if (!this.$route.hash) {
        this.$router.replace({hash: '#contenido-normativa'})
      }
    },
    cerrarNormativa () {
      this.mostrarCuerpo = false
      if (this.$route.hash) {
        this.$router.replace({ hash: '' })
      }
      this.$refs.btnLeer.focus()
    },
    ...mapActions('normativas', [
      'toggleFavorito',
    ]),
  },
  head () {
    return {
      title: this.titulo,
    }
  },
}
</script>

<style lang="sass">@import 'sass/pages/normativa.sass'</style>