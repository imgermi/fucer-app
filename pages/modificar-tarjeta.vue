<template>
  <div class="modificar-datos">
    <section class="band">
    	<div class="container">
    		<nuxt-link :to="{ name: 'configuracion' }"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></nuxt-link>
    		<h2>Modificar tarjeta de crédito</h2>

    		<div class="msj-error" v-if="error">
    		  {{ error }}
    		</div>

    		<div class="msj-info" v-if="info">
    		  {{ info }}
    		</div>

    		<form @submit.prevent="actualizarDatos" class="main__form">
    			<fieldset>
            <label for="cardNumber">Número de la tarjeta</label>
            <input type="text"
              v-model.lazy="cardNumber"
              v-validate="'required'"
              data-vv-as="número de la tarjeta"
              :class="{'error': errors.has('cardNumber') }"
              data-vv-name="cardNumber"
              ref="cardNumber"
              id="cardNumber"
              data-checkout="cardNumber"
              onselectstart="return false"
              onpaste="return false"
              onCopy="return false"
              onCut="return false"
              onDrag="return false"
              onDrop="return false"
              autocomplete="off"
            />
            <span class="error" v-show="errors.has('cardNumber')">
              {{ errors.first('cardNumber') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="cardExpirationMonth">Mes de vencimiento</label>
            <input
              type="text"
              id="cardExpirationMonth"
              data-vv-name="cardExpirationMonth"
              ref="cardExpirationMonth"
              v-validate="'required'"
              data-vv-as="mes de vencimiento"
              data-checkout="cardExpirationMonth"
              :class="{'error': errors.has('cardExpirationMonth') }"
              onselectstart="return false"
              onpaste="return false"
              onCopy="return false"
              onCut="return false"
              onDrag="return false"
              onDrop="return false"
              autocomplete=off
            />
            <span class="error" v-show="errors.has('cardExpirationMonth')">
              {{ errors.first('cardExpirationMonth') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="cardExpirationYear">Año de vencimiento</label>
            <input
              type="text"
              id="cardExpirationYear"
              data-vv-name="cardExpirationYear"
              ref="cardExpirationYear"
              v-validate="'required'"
              data-vv-as="año de vencimiento"
              data-checkout="cardExpirationYear"
              :class="{'error': errors.has('cardExpirationYear') }"
              onselectstart="return false"
              onpaste="return false"
              onCopy="return false"
              onCut="return false"
              onDrag="return false"
              onDrop="return false"
              autocomplete=off
            />
            <span class="error" v-show="errors.has('cardExpirationYear')">
              {{ errors.first('cardExpirationYear') }}
            </span>
          </fieldset>

          <fieldset v-show="isSecurityCodeRequired">
            <label for="securityCode">Código de seguridad</label>
            <input
              type="text"
              data-vv-name="securityCode"
              id="securityCode"
              data-checkout="securityCode"
              :class="{'error': errors.has('codigo') }"
              v-validate="isSecurityCodeRequired ? 'required' : ''"
              data-vv-as="código de seguridad"
              onselectstart="return false"
              onpaste="return false"
              onCopy="return false"
              onCut="return false"
              onDrag="return false"
              onDrop="return false"
              autocomplete="off"
            />
            <span class="error" v-show="errors.has('securityCode')">
              {{ errors.first('securityCode') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="cardholderName">Nombre impreso en tarjeta</label>
            <input
              type="text"
              v-model="cardholderName"
              data-vv-name="cardholderName"
              v-validate="'required'"
              data-vv-as="nombre impreso en tarjeta"
              id="cardholderName"
              ref="cardholderName"
              :class="{'error': errors.has('cardholderName') }"
              data-checkout="cardholderName"
            />
            <span class="error" v-show="errors.has('cardholderName')">
              {{ errors.first('cardholderName') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="nombre">Tipo de documento</label>
            <div class="styled-select">
              <select
                id="docType"
                data-vv-name="docType"
                ref="docType"
                data-checkout="docType"
                v-validate="'required'"
                data-vv-as="tipo de documento"
                :class="{'error': errors.has('docType') }"
              >
                <option value="">Seleccione una opción</option>
                <option v-for="docType in documentTypes" :key="docType.id">
                  {{ docType.name }}
                </option>
              </select>
            </div>
            <span class="error" v-show="errors.has('docType')">
              {{ errors.first('docType') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="docNumber">Número de documento</label>
            <input
              type="text"
              data-vv-name="docNumber"
              ref="docNumber"
              v-validate="'required'"
              data-vv-as="número de documento"
              id="docNumber"
              data-checkout="docNumber"
              :class="{'error': errors.has('docNumber') }"
            />
            <span class="error" v-show="errors.has('docNumber')">
              {{ errors.first('docNumber') }}
            </span>
          </fieldset>
    			<button type="submit" class="rounded__btn--medium">{{ pagina.cargando ? 'Cargando..' : 'Guardar cambios' }}</button>
    		</form>
    	</div>
    </section>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
	data () {
	  return {
	    title: 'Modificar Datos Personales',
	    nombre: this.$auth.state.user.nombre,
	    email: this.$auth.state.user.email,
	    password: '',
	    error: '',
	    info: '',
	  }
	},
	computed: {
		...mapState(['pagina'])
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
        this.$auth.setToken(data.token)
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