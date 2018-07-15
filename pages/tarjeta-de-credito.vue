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
              :class="{'error': errors.has('cardNumber') }"
              name="'cardNumber'"
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
              name="cardExpirationMonth"
              v-validate="'required'"
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
              name="cardExpirationYear"
              v-validate="'required'"
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
              name="securityCode"
              id="securityCode"
              data-checkout="securityCode"
              :class="{'error': errors.has('codigo') }"
              v-validate="'required'"
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
              name="cardholderName"
              v-validate="'required'"
              id="cardholderName"
              ref="cardholderName"
              :class="{'error': errors.has('cardholderName') }"
              placeholder="Juan Miguel Fernandez"
              data-checkout="cardholderName"
            />
            <span class="error" v-show="errors.has('cardholderName')">
              {{ errors.first('cardholderName') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="nombre">Tipo de documento</label>
            <select
              id="docType"
              name="docType"
              data-checkout="docType"
              v-validate="'required'"
              :class="{'error': errors.has('docType') }"
            >
              <option v-for="docType in documentTypes" :key="docType.id">
                {{ docType.name }}
              </option>
            </select>
            <span class="error" v-show="errors.has('docType')">
              {{ errors.first('docType') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="docNumber">Número de documento</label>
            <input
              type="text"
              name="docNumber"
              v-validate="'required'"
              id="docNumber"
              ref="docNumber"
              data-checkout="docNumber"
              :class="{'error': errors.has('docNumber') }"
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

          <div v-if="!cardToken">
            <p style="margin-top: 20px;">
              ¿Estás teniendo problemas? <a href="javascript:location.reload()">Recargá esta vista</a> y probá de nuevo.
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
  components: {
    SecondaryTop
  },
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
        this.paymentMethodInfo = await this.guessingPaymentMethod(newBin)
      }
    }
  },

  mounted() {
    this.$refs.cardNumber.focus()
  },

  async created () {
    this.documentTypes = await this.getDocumentTypes()
  },

  methods: {
    ...mapActions([
      'setPaginaCargando'
    ]),
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
              reject('An error ocurred when trying to get the payment method info.')
            }
          })
        }else{
          reject('The bin is not valid.', bin)
        }
      })
    },

    // Creates a card_token, which is the secure representation of the card
    async createToken (form) {
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
      let form = event.target
      try {
        this.cardToken = await this.createToken(form)
        alert('The card is valid! Save this token to retrieve the card data later: ' + this.cardToken)
      } catch(error) {
        alert(error)
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
