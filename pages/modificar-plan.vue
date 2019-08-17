<template>
  <div class="modificar-plan">
  	<header>
  		<div class="container">
  			<nuxt-link :to="{ name: 'configuracion' }">Cancelar</nuxt-link>
  		</div>
  	</header>

  	<section class="band">
  		<div class="container">
  			<div class="datos__plan">
  			  <h2>Mi plan</h2>
  			  <div
            v-if="estaSuscripto || !estaSuscripto && esTrial"
            class="datos__plan--dato"
          >
  			    <span>{{ esTrial ? 'Versión de prueba' : 'Plan premium'  }}</span>
  			    <small>${{ esTrial ? 0 : planPrecio }}</small>
          </div>
          <p v-html="mensajePlan"></p>
  			</div>
  		</div>
  	</section>

  	<section class="band">
  		<div class="container">

        <h2>Suscripción</h2>
        <div class="msj">
          {{ estaSuscripto
            ? 'Su suscripción está activa. En '
              + diasFinSuscripcion
              + ' '
              + (diasFinSuscripcion > 1 ? 'días' : 'dia')
              +' va debitarse un nuevo pago.'
            : 'Su suscripción fue cancelada. No va a recibir nuevos cargos en su tarjeta.'
          }}
        </div>
        <br>

  			<div class="datos__plan--dato seleccionar">
  			  <span>Plan Premium</span>
  			  <small>${{ planPrecio }} mensuales</small>
  			  <button class="rounded__btn--medium" @click="changeSubscriptionStatus">
            {{ actualizandoPlan
              ? 'Cargando...'
              : (estaSuscripto
                  ? 'Cancelar suscripción'
                  : 'Suscríbase'
              )
            }}
          </button>
  			</div>
  		</div>
  	</section>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  middleware: 'plan-mercadopago',
  data () {
    return {
      title: 'Modificar Plan',
      actualizandoPlan: false,
      planPrecio: false,
      mensaje: false,
      subscription: null
    }
  },
  async created () {
    await this.obtenerConfigs()
  },
  computed: {
    ...mapState(['pagina']),
    ...mapGetters([
      'estaSuscripto',
      'esTrial',
      'mensajeDiasFinTrial',
      'diasFinSuscripcion',
      'usuarioPremium',
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
        this.planPrecio = data.precio_regular
      } catch(e) {
        this.mensaje = e.response.data.error.message.replace('Bad Request:', '')
      }
      this.setPaginaCargando(false)
    },
    async changeSubscriptionStatus () {
      this.actualizandoPlan = true
      try {
        // TODO: Puede haber más estados
        let token = ''
        await this.getSubscription()
        if(this.subscription.status === 'authorized') {
          token = await this.pauseSubscription()

        } else if(this.subscription.status === 'paused') {
          token = await this.reactivateSubscription()
        }

        if (!token) {
          this.mensaje = 'Hubo un problema. Vuelva a intentarlo por favor.'
          this.actualizandoPlan = false
          return
        }

        // Actualizo el token de seguridad
        this.$auth.setToken('local', 'Bearer ' + token)
        await this.$auth.fetchUser()
      } catch (error) {
        this.mensaje = error.response != undefined
            ? error.response.data.error.message.replace('Bad Request:', '')
            : (error.message || error)
      }
      this.actualizandoPlan = false
    },
    async getSubscription () {
      try {
        this.subscription = await this.$axios.$get(
          'mercadopago/get-subscription', {
            params: {
              subscription_id: this.$auth.user.suscripcion.id
            }
          }
        )
        if (!this.subscription) {
          this.mensaje = 'No se pudo encontrar la suscripción registrada en Mercado Pago.'
        }
      } catch(error) {
        this.mensaje = error.response != undefined
          ? error.response.data.error.message.replace('Bad Request:', '')
          : (error.message || error)
      }
    },
    async pauseSubscription () {
      try {
        let token = await this.$axios.$put(
          'mercadopago/pause-subscription', {
            subscription_id: this.subscription.id
          }
        )
        if (!this.subscription) {
          this.mensaje = 'No se pudo encontrar la suscripción registrada en Mercado Pago.'
        }
        this.mensaje = 'La suscripción fue cancelada.'
        return token
      } catch(error) {
        this.mensaje = error.response != undefined
          ? error.response.data.error.message.replace('Bad Request:', '')
          : (error.message || error)
      }
    },
    async reactivateSubscription () {
      try {
        let token = await this.$axios.$put(
          'mercadopago/reactivate-subscription', {
            subscription_id: this.subscription.id
          }
        )
        if (!this.subscription) {
          this.mensaje = 'No se pudo encontrar la suscripción registrada en Mercado Pago.'
        }
        this.mensaje = '¡La suscripción fue reactivada!'
        return token
      } catch(error) {
        this.mensaje = error.response != undefined
          ? error.response.data.error.message.replace('Bad Request:', '')
          : (error.message || error)
      }
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

<style lang="sass">
	@import 'sass/pages/modificar-plan.sass'
</style>