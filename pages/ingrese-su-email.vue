<template>
	<div class="ingresar-mail">
		<section class="band">
			<div class="container form__container">

				<h1 class="intro__heading">¿No recibiste el mail de confirmación?</h1>
				<h2 class="sub__heading">Ingresá tu mail nuevamente</h2>

				<div class="msj-error" v-if="error">
				  {{ error }}
				</div>

				<form class="main__form">
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
		</section>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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