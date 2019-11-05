<template>
  <div class="modificar-datos">
    <section class="band">
    	<div class="container">
    		<nuxt-link :to="{ name: 'configuracion' }"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></nuxt-link>
    		<h2>Modificar débito automático</h2>

    		<div class="msj-error" v-if="error">
    		  {{ error }}
    		</div>

    		<div class="msj-info" v-if="info">
    		  {{ info }}
    		</div>

    		<form method="post" @submit.prevent="actualizarDatos" class="main__form">
          <fieldset>
            <label for="cbu">CBU</label>
            <input
              type="text"
              v-model.lazy="cbu"
              id="cbu"
              ref="cbu"
              name="cbu"
              v-validate="'required'"
              data-vv-as="CBU"
              :class="{'error': errors.has('cbu') }"
              onselectstart="return false"
              onpaste="return false"
              onCopy="return false"
              onCut="return false"
              onDrag="return false"
              onDrop="return false"
              autocomplete="off"
            />
            <span class="error" v-show="errors.has('cbu')">
              {{ errors.first('cbu') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="cuit">CUIT</label>
            <input
              type="text"
              v-model.lazy="cuit"
              id="cuit"
              ref="cuit"
              name="cuit"
              v-validate="'required'"
              data-vv-as="CUIT"
              :class="{'error': errors.has('cuit') }"
            />
            <span class="error" v-show="errors.has('cuit')">
              {{ errors.first('cuit') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="nombre">Nombre</label>
            <input
              type="text"
              v-model.lazy="nombre"
              id="nombre"
              ref="nombre"
              name="nombre"
              data-vv-as="Nombre"
              v-validate="'required'"
              :class="{'error': errors.has('nombre') }"
            />
            <span class="error" v-show="errors.has('nombre')">
              {{ errors.first('nombre') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="apellido">Apellido</label>
            <input
              type="text"
              v-model.lazy="apellido"
              id="apellido"
              ref="apellido"
              name="apellido"
              data-vv-as="Apellido"
              v-validate="'required'"
              :class="{'error': errors.has('apellido') }"
            />
            <span class="error" v-show="errors.has('apellido')">
              {{ errors.first('apellido') }}
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
import {mapActions, mapState} from 'vuex'

export default {
  middleware: 'plan-no-ilimitado',
  data() {
    return {
      error: false,
      info: false,
      title: 'Modificar débito automático',
      cuit: this.$auth.user.suscripcion.metadata.cuit,
      cbu: this.$auth.user.suscripcion.metadata.cbu,
      nombre: this.$auth.user.suscripcion.metadata.nombre,
      apellido: this.$auth.user.suscripcion.metadata.apellido,
    }
  },

  computed: {
    ...mapState([
      'pagina'
    ]),
    txtBtnSubmit () {
      return this.pagina.cargando ? 'Cargando...' : 'Actualizar'
    },
  },

  mounted() {
    this.$refs.cbu.focus()
  },

  methods: {
    async actualizarDatos (event) {
      let valida = await this.$validator.validateAll()
      if (!valida) {
        return
      }

      try {
        await this.$axios.$patch('suscripciones/datos', {
          tipo: 'debito',
          datos: {
            cuit: this.cuit,
            cbu: this.cbu,
            nombre: this.nombre,
            apellido: this.apellido,
          }
        })
        await this.$auth.fetchUser()
        this.info = 'Los datos fueron actualizados'
        this.error = false
        setTimeout(() => this.info = false, 3000)
      } catch(error) {
        this.error = error
        this.info = false
      }
    }
  },
	head () {
	  return {
	    title: this.title,
	  }
	}
}
</script>

<style lang="sass">@import 'sass/pages/modificar-datos.sass'</style>