<template>
  <main id="contenido" class="registro">
    <SecondaryTop
      :nroPaso="nroPaso"
      :tituloPaso="tituloPaso"
      ref="pageFocusTarget"
    />
    <div class="band form__container">
      <div class="container">

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
              v-model="cardExpirationMonth"
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
              v-model="cardExpirationYear"
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
              v-model="securityCode"
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
                v-model="docType"
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
              v-model="docNumber"
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

          <input v-model="paymentMethodId" type="hidden" name="paymentMethodId" />
          <input v-model="cardToken" type="hidden" name="token" />

          <button type="submit" class="rounded__btn--full green">
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
    </div>
  </main>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import { mapState, mapActions } from 'vuex'
import mensaje from '~/mixins/mensaje'

export default {
  layout: 'signup',
  mixins: [mensaje],
  components: {
    SecondaryTop
  },
  middleware: 'plan-no-ilimitado',
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
        if(!newBin){
          return
        }
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
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget.$el)
    })
  },

  mounted() {
    this.$refs.cardNumber.focus()
  },

  async asyncData ({ app:{ $api }}) {
    return {
      documentTypes: await $api.mercadopago.getIdentificationTypes()
    }
  },

  async created () {
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
          name: 'registrar-suscripcion',
          query: {
            token: cardToken.id,
            paymentMethodId: this.paymentMethodId,
          }
        })
      } catch(error) {
        console.log(error)
        this.setMensaje(error, 'error')
      }
    }
  },

  head () {
    return {
      title: this.title,
    }
  },
}
</script>
