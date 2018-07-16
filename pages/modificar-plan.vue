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
  			    <span>{{ esTrial ? 'Trial' : 'Plan premium'  }}</span>
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
  			  <span>Plan premium</span>
  			  <small>${{ planPrecio }} mensuales</small>
  			  <button class="rounded__btn--medium" @click="cambiarPlan">
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
  data () {
    return {
      title: 'Modificar Plan',
      actualizandoPlan: false,
      planPrecio: false,
      mensaje: false
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
    async cambiarPlan () {
      this.actualizandoPlan = true
      if(this.estaSuscrito) {
        await this.desuscribirme()
      } else {
        await this.suscribirme()
      }
      this.actualizandoPlan = false
    },
    async suscribirme () {
      try {
        let urlMercadopago = await this.$axios.$post('mercadopago/suscripcion')
        window.location = urlMercadopago
      } catch (e) {
        console.log(e)
        this.mensaje = e.response.data.error.message.replace('Bad Request:', '')
      }
    },
    async desuscribirme () {
      try {
        let resultado = await this.$axios.$delete('mercadopago/suscripcion')
        console.log(resultado)
        if (!resultado.data.token) {
          this.mensaje = 'Hubo un problema. Vuelva a intentarlo por favor.'
          return
        }
        // Actualizo el token de seguridad
        this.$auth.setToken(resultado.data.token)
        await this.$auth.fetchUser()
        this.mensaje = resultado.message
      } catch (e) {
        console.log(e)
        this.mensaje = e.response.data.error.message.replace('Bad Request:', '')
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