<template>
	<div class="restaurar-clave">
		<SecondaryTop />
		<main id="contenido" class="band">
			<div class="container form__container">

				<h1 class="intro__heading" ref="pageFocusTarget">Nueva clave</h1>

				<mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

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
					<button type="submit" class="rounded__btn--full green">
					  {{ txtBtnSubmit}}
					</button>
				</form>

				<br>
				<p class="signup__agregados">¿Tiene problemas? <nuxt-link :to="{ name: 'restaurar-clave' }">Solicite nuevamente un cambio de clave</nuxt-link>.</p>

			</div>
		</main>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mensaje from '~/mixins/mensaje'
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
	layout: 'signup',
	mixins: [mensaje],
	components: {
		SecondaryTop
	},
	auth: false,
	data() {
		return {
			password: '',
			passwordConfirm: '',
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
				this.setMensaje('Hemos actualizado su clave. Por favor inicie sesión con sus nuevas credenciales.', 'info')
		  	setTimeout(() => this.$router.push({'name': 'inicio'}), 4000)
		  } catch(e) {
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