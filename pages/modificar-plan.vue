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
  			    <span>Plan {{ $auth.state.user.pago==1 ? 'premium' : 'básico' }}</span>
  			    <small v-if="precioPlan">${{ $auth.state.user.pago==1 ? precioPlan : 0 }}</small>
  			  </div>
  			</div>
  		</div>
  	</section>
  	<section class="band">
  		<div class="container">
  			<h2>Modifique su plan</h2>
  			<div class="datos__plan--dato seleccionar">
  			  <span>Plan {{ $auth.state.user.pago==1 ? 'básico' : 'premium' }}</span>
  			  <small v-if="precioPlan">${{ $auth.state.user.pago==1 ? 0 : precioPlan }} mensuales</small>
  			  <nuxt-link :to="{ name: 'modificar-plan' }"><button class="rounded__btn--medium">Seleccionar plan</button></nuxt-link>
  			  <i v-if="precioPlan">{{ $auth.state.user.pago==1 ? 'Vas a cancelar tu suscripción' : 'Serás redirigido a Mercado Pago' }}</i>
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
      precioPlan: false
    }
  },
  async created () {
    await this.obtenerConfigs()
  },
  computed: {
    ...mapState(['pagina'])
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

<style lang="sass">
	@import 'sass/pages/modificar-plan.sass'
</style>