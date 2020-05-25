<template>
  <div class="modificar-datos">
    <main id="contenido" class="band">
    	<div class="container">
    		<nuxt-link :to="{ name: 'configuracion' }"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></nuxt-link>
    		<h2 ref="pageFocusTarget">Modificar datos personales</h2>

    		<div class="msj-error" v-if="error">
    		  {{ error }}
    		</div>

    		<div class="msj-info" v-if="info">
    		  {{ info }}
    		</div>

    		<form @submit.prevent="actualizarDatos" class="main__form">
    			<fieldset>
	    			<label for="nombre">Nombre</label>
	    			<input
	    				type="text"
	    				v-model="nombre"
	    				name="nombre"
	    				id="nombre"
	    			/>
    			</fieldset>
    			<fieldset>
	    			<label for="email">Email</label>
	    			<input
	    				type="email"
	    				v-model="email"
	    				name="email"
	    				id="email"
	    			/>
    			</fieldset>
    			<fieldset>
	    			<label for="password">Contraseña</label>
	    			<input
	    				type="password"
	    				v-model="password"
	    				name="pass"
	    				id="pass"
	    				placeholder="********"
	    			/>
    			</fieldset>
    			<button type="submit" class="rounded__btn--medium">{{ pagina.cargando ? 'Cargando..' : 'Guardar cambios' }}</button>
    		</form>
    	</div>
    </main>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
	data () {
	  return {
	    title: 'Modificar Datos Personales',
	    nombre: this.$auth.user.nombre,
	    email: this.$auth.user.email,
	    password: '',
	    error: '',
	    info: '',
	  }
	},
	computed: {
		...mapState(['pagina'])
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
    async actualizarDatos() {
      this.setPaginaCargando(true)
      try {
      	let datos = {
      		nombre: this.nombre,
      		email: this.email
      	}
      	if (this.password) {
      		datos.password = this.password
      	}
        let {data} = await this.$axios.$post('auth/updateUser', datos)

        // Actualizo el token de seguridad
        this.$auth.setToken('local', 'Bearer ' + data.token)
        await this.$auth.fetchUser()

        this.error = false
        this.info = 'Los datos fueron actualizados'
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

<style lang="sass">@import 'sass/pages/modificar-datos.sass'</style>