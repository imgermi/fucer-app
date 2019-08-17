<template>
  <div class="configuracion">
  	<Top :title="title" />
    <section class="band datos">
      <div class="container">
        <div class="datos__personales">
          <h2>Datos personales</h2>
          <div class="datos__personales--dato">
            <p>Nombre</p>
            <span>{{ $auth.user.nombre }}</span>
          </div>
          <div class="datos__personales--dato">
            <p>Email</p>
            <span>{{ $auth.user.email }}</span>
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

        <div
          v-if="$auth.user.condicion !== 'premium-incondicional'"
          class="datos__personales"
        >
          <h2>Tarjeta de crédito</h2>
          <div class="datos__personales--dato">
            <p>Número</p>
            <span>{{ tarjeta }}</span>
          </div>
          <nuxt-link :to="{ name: 'modificar-tarjeta' }">
            <button class="rounded__btn--medium">
              Modificar
            </button>
          </nuxt-link>
        </div>

        <template v-if="$auth.user.condicion === 'premium-incondicional'">
          <div class="datos__plan">
            <h2>Mi plan</h2>
            <div class="datos__plan--dato">
              <span>Plan ilimitado</span>
              <small>$ 0</small>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="datos__plan">
            <h2>Mi plan</h2>
            <div
              v-if="estaSuscripto || !estaSuscripto && esTrial"
              class="datos__plan--dato"
            >
              <span>{{ esTrial ? 'Versión de prueba' : 'Plan mensual'  }}</span>
              <small>${{ esTrial ? 0 : precioPlan }}</small>
            </div>
            <p v-html="mensajePlan"></p>
          </div>
          <br>
          <nuxt-link :to="{ name: 'modificar-plan' }">
            <button class="rounded__btn--medium">Modificar plan</button>
          </nuxt-link>
        </template>
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
      tarjeta: '**** **** **** ****',
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

      if(this.$auth.user.condicion !== 'premium-incondicional'){
        let customer = await this.$axios.$get('mercadopago/get-customer-by-id', {
          params: {
            id: this.$auth.user.customer_id
          }
        })
        if(!customer.default_card){
          return
        }
        let card = customer.cards.find(card => card.id === customer.default_card)
        if(! card){
          return
        }
        this.tarjeta = '**** **** **** ' + card.last_four_digits
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