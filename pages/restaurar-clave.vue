<template>
	<div class="restaurar-clave">
		<SecondaryTop />
		<main class="band">
			<div class="container form__container">

				<h1 class="intro__heading">¿Olvidó su clave?</h1>
				<h2 class="sub__heading">Ingrese su mail y le enviaremos un enlace para restaurarla</h2>

				<div class="msj-error" v-if="error">
				  {{ error }}
				</div>

				<div class="msj-info" v-if="info">
	    		  {{ info }}
    		</div>

				<form @submit.prevent="sendResetPasswordEmail" class="main__form">
					<fieldset>
					  <label for="email">Ingrese su email</label>
					  <input
					    type="email"
					    name="email"
					    v-model="email"
					    v-validate="'required|email'"
					    id="email"
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

export default {
	layout: 'signup',
	components: {
		SecondaryTop
	},
	auth: false,
	data() {
		return {
			email: '',
			error: false,
			info: false,
			title: 'Ingrese su email',
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
		    this.error = false
		  	this.info = 'Hemos enviado un mail a su cuenta de correo electrónico para que pueda recuperar su clave.'
		  } catch(e) {
		    this.error = e.response.data.error.message.replace('Bad Request:', '')
		    this.info = false
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
	},
}
</script>

<style lang="sass">@import 'sass/pages/restaurar-clave.sass'</style>