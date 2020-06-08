<template>
  <div class="modificar-datos">
    <main id="contenido" class="band">
    	<div class="container">
    		<nuxt-link :to="{ name: 'configuracion' }"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></nuxt-link>
    		<h2 ref="pageFocusTarget">Modificar tarjeta de crédito</h2>

    		<mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

    		<form method="post" @submit.prevent="generateCardToken" class="main__form">
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
              v-model="cardExpirationMonth"
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
              v-model="cardExpirationYear"
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
              v-model="securityCode"
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
                v-model="docType"
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
              v-model="docNumber"
              data-checkout="docNumber"
              :class="{'error': errors.has('docNumber') }"
            />
            <span class="error" v-show="errors.has('docNumber')">
              {{ errors.first('docNumber') }}
            </span>
          </fieldset>

          <input v-model="paymentMethodId" type="hidden" name="paymentMethodId" />

          <button type="submit" class="rounded__btn--full green">
            {{ txtBtnSubmit}}
          </button>

          <div>
            <p style="margin-top: 20px;font-size: 14px">
              ¿Estás teniendo problemas? <a href="javascript:location.reload()">Recargá esta vista</a> y probá de nuevo.
            </p>
            <p style="margin-top: 20px;font-size: 14px">
              Antes de guardar la nueva tarjeta vamos a verificar que funcione. Por eso, cobraremos un monto mínimo que será reintegrado al instante.
            </p>
          </div>
        </form>
    	</div>
    </main>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import mensaje from '~/mixins/mensaje'

export default {
  mixins: [mensaje],
  middleware: 'plan-no-ilimitado',
  
  async asyncData ({ app:{ $api }}) {
    return {
      documentTypes: await $api.mercadopago.getIdentificationTypes()
    }
  },

  data() {
    return {
      documentTypes: [],
      paymentMethodId: '',
      paymentMethodSettings: [],

      cardNumber:'',
      cardholderName:'',
      cardToken:'',
      cardExpirationMonth: '',
      cardExpirationYear: '',
      docType: '',
      docNumber: '',
      securityCode: '',

      title: 'Modificar datos personales'
    }
  },

  computed: {
    ...mapState([
      'pagina'
    ]),
    txtBtnSubmit () {
      return this.pagina.cargando ? 'Cargando...' : 'Siguiente'
    },
    bin () {
      // First six digits of the card
      return this.cardNumber.replace(/[ .-]/g, '').slice(0, 6)
    },
    isSecurityCodeRequired () {
      let founded = this.paymentMethodSettings.find(config => {
        return this.bin.match(config.bin.pattern) != null && config.security_code.length == 0
      })
      return founded === undefined ? true : false
    }
  },

  watch: {
    bin: {
      immediate: true,
      handler: async function (newBin, oldBin) {
        try {
          let {id, settings} = await this.guessingPaymentMethod(newBin)
          this.paymentMethodId = id
          this.paymentMethodSettings = settings
        } catch(e){
          console.log(e)
        }
      }
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

  mounted() {
    this.$refs.cardNumber.focus()
  },

  async created () {
    if (!window.navigator.onLine) {
      this.$router.replace({name: 404})
    }
    if (this.$auth.user && this.$auth.user.suscripcion.metadata.customer_id) {
      await this.precargarDatos()
    }
  },

  methods: {
    ...mapActions([
      'setPaginaCargando'
    ]),
    async precargarDatos () {
      let customer = await this.$axios.$get('mercadopago/get-customer-by-id', {
        params: {
          id: this.$auth.user.suscripcion.metadata.customer_id
        }
      })
      if(!customer.default_card){
        return
      }

      let card = customer.cards.find(card => card.id === customer.default_card)
      if(! card){
        return
      }

      this.$refs.cardNumber.placeholder = '**** **** **** ' + card.last_four_digits
      this.cardExpirationMonth = card.expiration_month
      this.cardExpirationYear = card.expiration_year
      this.docNumber = card.cardholder.identification.number
      this.docType = card.cardholder.identification.type
      this.cardholderName = card.cardholder.name
    },

    async guessingPaymentMethod (bin) {
      try {
        let paymentMethods = await this.$api.mercadopago.getPaymentMethods({
          bin
        })
        if(!paymentMethods[0]){
          throw new Error('No se encontró el método de pago.')
        }
        return paymentMethods[0]
      } catch(e){
        console.log(e)
      }
    },

    async generateCardToken (event) {
      let valida = await this.$validator.validateAll()
      if (!valida) {
        return
      }

      try {
        let cardToken = await this.$api.mercadopago.createToken()
        if(cardToken){
          cardToken = await this.$api.mercadopago.updateToken(
            cardToken.id, {
              card_number: this.cardNumber.replace(/[ .-]/g, ''),
              security_code: this.securityCode,
              expiration_month: this.cardExpirationMonth,
              expiration_year: this.cardExpirationYear,
              cardholder_name: this.cardholderName,
              cardholder_id_type: this.docType,
              cardholder_id_number: this.docNumber,
          })
        }
        if (!cardToken) {
          throw new Error('Hubo un problema, por favor vuelva a intentalo.')
        }
        this.$router.push({
          name: 'guardar-tarjeta',
          query: {
            token: cardToken.id,
            paymentMethodId: this.paymentMethodId,
          }
        })
      } catch(error) {
        this.setMensaje(error, 'error', 5000)
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