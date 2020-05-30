<template>
	<div class="ingresar-mail">
		<SecondaryTop />
		<main id="contenido" class="band">
			<div class="container form__container">

				<h1 class="intro__heading" ref="pageFocusTarget">¿No recibió el mail de confirmación?</h1>
				<h2 class="sub__heading">Ingrese su email nuevamente</h2>

				<mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

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
			email: '',
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