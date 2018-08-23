<template>
  <div class="configuracion">
  	<Top :title="title" />
    <section class="band datos">
      <div class="container">
        <div class="datos__personales">
          <h2>Datos personales</h2>
          <div class="datos__personales--dato">
            <p>Nombre</p>
            <span>{{ $auth.state.user.nombre }}</span>
          </div>
          <div class="datos__personales--dato">
            <p>Email</p>
            <span>{{ $auth.state.user.email }}</span>
          </div>
          <div class="datos__personales--dato">
            <p>Contraseña</p>
            <span>*******</span>
          </div>
          <nuxt-link :to="{ name: 'modificar-datos' }">
            <button class="rounded__btn--medium">
              Modificar
            </button>
          </nuxt-link>
        </div>

        <div class="datos__personales">
          <h2>Tarjeta de crédito</h2>
          <div class="datos__personales--dato">
            <p>Número</p>
            <span>4509 9535 6623 3704</span>
          </div>
          <nuxt-link :to="{ name: 'modificar-tarjeta' }">
            <button class="rounded__btn--medium">
              Modificar
            </button>
          </nuxt-link>
        </div>

        <div class="datos__plan">
          <h2>Mi plan</h2>
          <div
            v-if="estaSuscripto || !estaSuscripto && esTrial"
            class="datos__plan--dato"
          >
            <span>{{ esTrial ? 'Versión de prueba' : 'Plan mensual'  }}</span>
            <small>${{ esTrial ? 0 : planPrecio }}</small>
          </div>
          <p v-html="mensajePlan"></p>
        </div>
        <br>

        <nuxt-link :to="{ name: 'modificar-plan' }"><button class="rounded__btn--medium">Modificar plan</button></nuxt-link>
      </div>

    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  layout: 'app',
  components: {
    Top
  },
  data () {
    return {
      title: 'Configuración',
      precioPlan: false
    }
  },
  async created () {
    await this.obtenerConfigs()
  },
  computed: {
    ...mapState(['pagina']),
    ...mapGetters([
      'esTrial',
      'estaSuscripto',
      'mensajePlan'
    ])
  },
  methods: {
    ...mapActions([
      'setPaginaCargando'
    ]),
    async obtenerConfigs() {
      this.setPaginaCargando(true)
      try {
        let data = await this.$axios.$get('configuraciones')
        this.precioPlan = data.precio_regular
      } catch(e) {
        this.error = e.response.data.error.message.replace('Bad Request:', '')
      }
      this.setPaginaCargando(false)
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

<style lang="sass">@import 'sass/pages/configuracion.sass'</style>