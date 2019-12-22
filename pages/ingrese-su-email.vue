<template>
	<div class="ingresar-mail">
		<SecondaryTop />
		<main class="band">
			<div class="container form__container">

				<h1 class="intro__heading" ref="pageFocusTarget">¿No recibió el mail de confirmación?</h1>
				<h2 class="sub__heading">Ingrese su email nuevamente</h2>

				<div class="msj-error" v-if="error">
				  {{ error }}
				</div>

				<form @submit.prevent="resendActivationEmail" class="main__form">
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
					<button type="submit" class="rounded__btn--full blue">
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
			title: 'Ingrese su email',
		}
	},
	computed: {
		...mapState([
		  'pagina'
		]),
	  txtBtnSubmit () {
	    return this.pagina.cargando ? 'Cargando...' : 'Siguiente'
	  }
	},
	methods: {
		...mapActions([
	      'setPaginaCargando'
	    ]),
		async resendActivationEmail() {
		  let valida = await this.$validator.validateAll()
		  if (!valida) {
		    return
		  }
		  this.setPaginaCargando(true)
		  try {
		    await this.$axios.$post('auth/register/resend-activation-email', {
		      email: this.email
		    })
		  	this.$router.push({name: 'confirme-su-email'})
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
	},
}
</script>