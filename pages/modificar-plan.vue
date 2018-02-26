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
  			  <div class="datos__plan--dato">
  			    <span>Plan {{ usuarioPremium ? 'premium' : 'básico' }}</span>
  			    <small v-if="precioPlan">${{ usuarioPremium ? precioPlan : 0 }}</small>
  			  </div>
  			</div>
  		</div>
  	</section>

  	<section class="band">
  		<div class="container">
  			<h2>Modifique su plan</h2>
  			<div class="datos__plan--dato seleccionar">
  			  <span>Plan {{ usuarioPremium ? 'básico' : 'premium' }}</span>
  			  <small v-if="precioPlan">${{ usuarioPremium ? 0 : precioPlan }} mensuales</small>
  			  <button class="rounded__btn--medium" @click="cambiarPlan">
            {{ actualizandoPlan ? 'Cargando...' : 'Seleccionar plan'}}
          </button>
  			  <i v-if="precioPlan">
            {{ usuarioPremium ? 'Vas a cancelar tu suscripción' : 'Serás redirigido a Mercado Pago' }}
          </i>
  			</div>
  		</div>
  	</section>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data () {
    return {
      title: 'Modificar Plan',
      precioPlan: false,
      actualizandoPlan: false
    }
  },
  async created () {
    await this.obtenerConfigs()
  },
  computed: {
    ...mapState(['pagina']),
    usuarioPremium () {
      return this.$auth.state.user.pago === 1
    }
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
    },
    async cambiarPlan () {
      console.log('Plannnnnnn')
      this.actualizandoPlan = true
      if(this.usuarioPremium) {
        await this.desuscribirme()
      } else {
        await this.suscribirme()
      }
      this.actualizandoPlan = false
    },
    async suscribirme () {
      try {
        let {data} = await this.$axios.post('mercadopago/suscripcion')
        window.location = data
      } catch(e) {
        console.log(e)
      }
    },
    async desuscribirme () {}
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