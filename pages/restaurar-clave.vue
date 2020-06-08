<template>
	<div class="restaurar-clave">
		<SecondaryTop />
		<main id="contenido" class="band">
			<div class="container form__container">

				<h1 class="intro__heading">¿Olvidó su clave?</h1>
				<h2 class="sub__heading">Ingrese su mail y le enviaremos un enlace para restaurarla</h2>

				<mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

				<form @submit.prevent="sendResetPasswordEmail" class="main__form">
					<fieldset>
					  <label for="email">Ingrese su email</label>
					  <input
					    type="email"
					    name="email"
					    v-model="email"
					    v-validate="'required|email'"
					    id="email"
							ref="pageFocusTarget"
					    :class="{'error': errors.has('email') }"
							placeholder="email@email.com"
						/>
					  <span class="error" v-show="errors.has('email')">
					    {{ errors.first('email') }}
					  </span>
					</fieldset>
					<button type="submit" class="rounded__btn--full green">
					  {{ txtBtnSubmit}}
					</button>
				</form>

			</div>
		</main>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SecondaryTop from '~/components/SecondaryTop.vue'
import mensaje from '~/mixins/mensaje'

export default {
	layout: 'signup',
	mixins: [mensaje],
	components: {
		SecondaryTop,
	},
	auth: false,
	data() {
		return {
			email: '',
			title: 'Restaurar clave',
		}
	},
	computed: {
		...mapState([
		  'pagina'
		]),
	  txtBtnSubmit () {
	    return this.pagina.cargando ? 'Cargando...' : 'Confirmar'
	  }
	},
	beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      )
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
    })
  },
	methods: {
		...mapActions([
	      'setPaginaCargando'
			]),
		async sendResetPasswordEmail() {
		  let valida = await this.$validator.validateAll()
		  if (!valida) {
		    return
		  }
		  this.setPaginaCargando(true)
		  try {
		    await this.$axios.$post('auth/send-reset-password-email', {
		      email: this.email
		    })
				this.setMensaje('Hemos enviado un mail a su cuenta de correo electrónico para que pueda recuperar su clave.', 'info')
		  } catch(e) {
				console.log(e)
				this.setMensaje(e, 'error')
		  }
		  this.setPaginaCargando(false)
		}
	},
	head () {
	  return {
			title: this.title,
	  }
	},
}
</script>

<style lang="sass">@import 'sass/pages/restaurar-clave.sass'</style>