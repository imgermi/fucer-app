<template>
  <div class="modificar-plan">
  	<header>
  		<div class="container">
  			<nuxt-link :to="{ name: 'configuracion' }">Cancelar</nuxt-link>
  		</div>
  	</header>

    <main>
    	<section class="band">
    		<div class="container">
    			<div class="datos__plan">
    			  <h2 ref="pageFocusTarget">Mi plan</h2>
    			  <div
              v-if="suscripcion.premium"
              class="datos__plan--dato"
            >
    			    <span>{{ suscripcion.plan.descripcion }}</span>
    			    <small>{{ suscripcion.activa ? '$'+suscripcion.plan.valor : '' }}</small>
            </div>
    			</div>
    		</div>
    	</section>

    	<section class="band">
    		<div class="container">

          <h2>Suscripción</h2>
          <div class="msj">
            <p v-html="suscripcion.plan.estado"></p>
          </div>
          <br>

    			<div class="datos__plan--dato seleccionar">
    			  <span>Plan Premium</span>
    			  <small>${{ suscripcion.plan.valor }} mensuales</small>
    			  <button
              class="rounded__btn--medium"
              @click="modificarSuscripcion"
              @keyup.enter="modificarSuscripcion"
            >
              {{ actualizandoPlan
                ? 'Cargando...'
                : (suscripcion.activa
                    ? 'Cancelar suscripción'
                    : 'Suscríbase'
                )
              }}
            </button>
    			</div>
    		</div>
    	</section>
    </main>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  middleware: 'plan-no-ilimitado',
  data () {
    return {
      title: 'Modificar Plan',
      actualizandoPlan: false,
      mensaje: false,
    }
  },
  computed: {
    suscripcion () {
      return this.$auth.user.suscripcion;
    }
  },
  methods: {
    async modificarSuscripcion () {
      this.actualizandoPlan = true
      try {
        if (this.suscripcion && this.suscripcion.activa) {
          await this.$axios.$delete('suscripciones')
          this.mensaje = 'La suscripción fue cancelada'
        } else {
          await this.$axios.$patch('suscripciones')
          this.mensaje = '¡La suscripción fue reactivada!'
        }
        await this.$auth.fetchUser()
      } catch (error) {
        this.mensaje = error
      }
      this.actualizandoPlan = false
    }
  }
}
</script>

<style lang="sass">
	@import 'sass/pages/modificar-plan.sass'
</style>