<template>
  <header v-if="!$store.getters.usuarioPremium">
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
			let fechaActivacion = moment(this.$auth.state.user.activo_fecha)
			let hoy = moment()
			return 7 - hoy.diff(fechaActivacion, 'days')
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