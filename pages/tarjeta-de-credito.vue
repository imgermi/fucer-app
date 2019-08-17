<template>
  <div class="registro">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band form__container">
      <div class="container">

        <div class="msj-error" v-if="error">
          {{ error }}
        </div>

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
              placeholder="0000 0000 0000 0000"
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
              placeholder="12"
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
              placeholder="2020"
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
              placeholder="123"
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
              placeholder="Juan Miguel Fernández"
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
              placeholder="39917586"
            />
            <span class="error" v-show="errors.has('docNumber')">
              {{ errors.first('docNumber') }}
            </span>
          </fieldset>

          <input v-model="paymentMethodInfo.id" type="hidden" name="paymentMethodId" />
          <input v-model="cardToken" type="hidden" name="token" />

          <button type="submit" class="rounded__btn--full blue">
            {{ txtBtnSubmit}}
          </button>

          <span class="alert-mercadopago">El pago lo va a procesar Mercado Pago</span>

          <div class="signup__agregados">
            <p style="margin-top: 10px;font-size: 14px">
              ¿Está teniendo problemas? <a href="javascript:location.reload()">Recargue esta vista</a> y pruebe de nuevo.
            </p>
            <p style="margin-top: 10px;font-size: 14px">
              Antes de cobrar el plan, vamos a verificar que su tarjeta funcione. Por eso, cobraremos un monto mínimo que será reintegrado al instante. 
            </p>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'signup',
  components: {
    SecondaryTop
  },
  middleware: 'plan-mercadopago',
  data() {
    return {
      documentTypes: [],
      paymentMethodInfo: {
        id: '',
        settings: []
      },
      cardNumber:'',
      cardholderName:'',
      cardToken:'',

      error: false,
      title: 'Paso 3 - Tarjeta de Crédito',
      nroPaso: '3',
      tituloPaso: 'Configure su tarjeta de crédito'
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
      let founded = this.paymentMethodInfo.settings.find(config => {
        return this.bin.match(config.bin.pattern) != null && config.security_code.length == 0
      })
      return founded === undefined ? true : false
    }
  },

  watch: {
    bin: {
      immediate: true,
      handler: async function (newBin, oldBin) {
        if(!newBin){
          return
        }
        this.paymentMethodInfo = await this.guessingPaymentMethod(newBin)
      }
    }
  },

  mounted() {
    this.$refs.cardNumber.focus()
  },

  async created () {
    this.documentTypes = await this.getDocumentTypes()
    if (this.$auth.user && this.$auth.user.customer_id) {
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
          id: this.$auth.user.customer_id
        }
      })
      if(!customer.default_card){
        return
      }

      let card = customer.cards.find(card => card.id === customer.default_card)
      if(! card){
        return
      }

      this.$refs.cardExpirationMonth.value = card.expiration_month
      this.$refs.cardExpirationYear.value = card.expiration_year
      this.$refs.docNumber.value = card.cardholder.identification.number
      this.$refs.docType.value = card.cardholder.identification.type
      this.cardholderName = card.cardholder.name
    },

    // https://www.mercadopago.com.ar/developers/en/tools/sdk/client/javascript#get-doc-types
    async getDocumentTypes () {
      if (!process.browser) {
        return []
      }
      return new Promise((resolve, reject) => {
        this.$mercadopago.getIdentificationTypes((status, response) => {
          if (status === 200) {
            resolve(response)
          } else {
            reject('An error ocurred when trying to get the identification types.')
          }
        })
      })
    },

    // https://www.mercadopago.com.ar/developers/en/api-docs/custom-checkout/payment-methods/
    async guessingPaymentMethod (bin) {
      return new Promise((resolve, reject) => {
        if (bin.length >= 6) {
          this.$mercadopago.getPaymentMethod({
            "bin": bin
          },(status, response) => {
            if (status === 200) {
              resolve(response[0])
            } else {
              reject('No se pudo obtener la información del método de pago.')
            }
          })
        }else{
          reject('El bin no es válido.', bin)
        }
      })
    },

    // Creates a card_token, which is the secure representation of the card
    async createToken (form) {

      this.$mercadopago.clearSession()

      return new Promise((resolve, reject) => {
        this.$mercadopago.createToken(form, (status, response) => {
          if (status === 200 || status === 201) {
            resolve(response.id)
          } else {
            let message = this.$mercadopago.helpers.getMessage('card-token-creation', response)
            reject(message)
          }
        })
      })
    },

    async generateCardToken (event) {
      let valida = await this.$validator.validateAll()
      if (!valida) {
        return
      }

      try {
        let form = event.target
        this.cardToken = await this.createToken(form)
        if (!this.cardToken) {
          throw new Error('Hubo un problema, por favor vuelva a intentalo.')
        }
        this.$router.push({
          name: 'registrar-suscripcion',
          query: {
            token: this.cardToken,
            paymentMethodId: this.paymentMethodInfo.id,
          }
        })
      } catch(error) {
        this.error = error.response != undefined
            ? error.response.data.error.message
            : (error.message || error)
      }
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
