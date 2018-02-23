<template>
  <header>
  	<nuxt-link :to="{ name: 'modificar-plan' }" class="alerta-plan">
  		<p>Está utilizando el plan básico. <span v-html="mensajeDias"></span>. <strong>Acceda a normativas ilimitadas</strong></p>
  	</nuxt-link>
  </header>
</template>

<script>
import moment from 'moment'

export default {
	computed: {
		dias () {
			let fechaPago = moment(this.$auth.state.user.pago_fecha)
			let hoy = moment()
			console.log(hoy.diff(fechaPago, 'days'))
			return 7 - hoy.diff(fechaPago, 'days')
		},
		mensajeDias () {
			if (this.dias > 0) {
				return 'En <b>'
					+ this.dias
					+ ' '
					+ (this.dias > 1 ? 'dias' : 'día')
					+ '</b> se termina el trial'
			} else {
				return 'El trial <b>termina hoy</b>'
			}
		}
	}
}
</script>

<style lang="sass">@import 'sass/components/alerta.sass'</style>