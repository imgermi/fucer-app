<template>
	<div class="restaurar-clave">
		<SecondaryTop />
		<section class="band">
			<div class="container form__container">

				<h1 class="intro__heading">Nueva clave</h1>

				<div class="msj-error" v-if="error">
				  {{ error }}
				</div>

				<div class="msj-info" v-if="info">
	    		  {{ info }}
	    		</div>

				<form @submit.prevent="resetPassword" class="main__form">
					<fieldset>
					  <label for="password">Ingrese su nueva clave</label>
					  <input
					    type="password"
					    name="password"
					    ref="password"
					    v-model="password"
					    v-validate="'required'"
					    data-vv-as="nueva clave"
					    id="password"
					    :class="{'error': errors.has('password') }"
					  />
					  <span class="error" v-show="errors.has('password')">
					    {{ errors.first('password') }}
					  </span>
					</fieldset>
					<fieldset>
					  <label for="passwordConfirm">Confirme su nueva clave</label>
					  <input
					    type="password"
					    name="passwordConfirm"
					    ref="passwordConfirm"
					    v-model="passwordConfirm"
					    v-validate="'required|confirmed:password'"
					    data-vv-as="confirmación de clave"
					    id="passwordConfirm"
					    :class="{'error': errors.has('passwordConfirm') }"
					  />
					  <span class="error" v-show="errors.has('passwordConfirm')">
					    {{ errors.first('passwordConfirm') }}
					  </span>
					</fieldset>
					<button type="submit" class="rounded__btn--full blue">
					  {{ txtBtnSubmit}}
					</button>
				</form>

				<br>
				<p class="signup__agregados">¿Tiene problemas? <nuxt-link :to="{ name: 'restaurar-clave' }">Solicite nuevamente un cambio de clave</nuxt-link>.</p>

			</div>
		</section>
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
			password: '',
			passwordConfirm: '',
			error: false,
			info: false,
			title: 'Nueva clave',
		}
	},
	computed: {
		...mapState([
		  'pagina'
		]),
	  txtBtnSubmit () {
	    return this.pagina.cargando ? 'Cargando...' : 'Guardar'
	  }
	},
	methods: {
		...mapActions([
	      'setPaginaCargando'
	    ]),
		async resetPassword() {
		  let valida = await this.$validator.validateAll()
		  if (!valida) {
		    return
		  }
		  this.setPaginaCargando(true)
		  try {
		    await this.$axios.$post('auth/reset-password', {
		      token: this.$route.params.token,
		      password: this.password,
		    })
		    this.error = false
		  	this.info = 'Hemos actualizado su clave. Por favor inicie sesión con sus nuevas credenciales.'
		  	setTimeout(() => this.$router.push({'name': 'inicio'}), 4000)
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