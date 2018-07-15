<template>
  <div class="registro">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band form__container">
      <div class="container">

        <h1>
          <span v-html="mensaje"></span>
        </h1>

        <div class="msj-error" v-if="error">
          {{ error }}
        </div>

        <div v-if="payment">
          <nuxt-link
            class="rounded__btn--full blue"
            :to="{ name: 'inicio' }"
          >
            Inicio
          </nuxt-link>
        </div>
        <div v-else>
          <a
            v-if="error"
            href="#"
            class="rounded__btn--full blue"
            @click.prevent="$router.go(-1)"
          >
            Volver
          </a>
        </div>

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
      paymentMethodId: this.$route.query.paymentMethodId || '',
      cardToken: this.$route.query.token || '',
      payment: null,

      customer: null,
      subscription: null,
      planId: '234b789bdb9f4164b297d2c336f529e3',

      mensaje: '',
      error: false,
      title: 'Paso 3 - Tarjeta de Crédito',
      nroPaso: '3',
      tituloPaso: 'Activar suscripción'
    }
  },

  computed: {
    ...mapState([
      'pagina'
    ]),
    paymentId () {
      return (this.payment && this.payment.id) ? this.payment.id : 0
    },
    email () {
      return this.$auth.state.user.email
    }
  },

  async created () {
    this.processCardAndCreateCustomer()
  },

  methods: {
    ...mapActions([
      'setPaginaCargando'
    ]),
    async processCardAndCreateCustomer () {
      try {
        await this.verifyCard()
        await this.createNewCustomer()
        await this.subscribe()
        this.mensaje = '¡Su suscripción fue registrada! Ya puede empezar a disfrutar de su trial.'
      } catch(error) {
        this.mensaje = 'Hubo un problema '
        this.error = error.message
          || error.response != undefined
            ? error.response.data.error.message
            : error
      }
    },

    async verifyCard () {
      this.mensaje = 'Verificando tarjeta...'
      await this.authorizePayment()
      // https://www.mercadopago.com.ar/developers/en/api-docs/custom-checkout/webhooks/payment-status/
      if (this.payment.status !== 'approved') {
        this.error = 'No se pudo verificar que la tarjeta sea apta para hacer suscripciones, aún así puede acceder al trial. No podemos asegurarle que al vencer el plazo no pierda el acceso al contenido.'
      }else{
        await this.cancelPayment()
      }
    },

    async authorizePayment () {
      let minAllowedAmount = await this.getMinAllowedAmount(this.paymentMethodId)
      this.payment = await this.$axios.$post(
        'mercadopago/create-payment-authorization', {
          transaction_amount: minAllowedAmount,
          card_token: this.cardToken,
          payment_method_id: this.paymentMethodId,
          email: this.email
      })
    },

    // Obtiene el monto mínimo para hacer una autorización
    async getMinAllowedAmount (paymentMethodId) {
      let paymentMethod = await this.getPaymentMethod(paymentMethodId)
      if (!paymentMethod) {
        throw new Error('El identificador del método de pago no es válido.')
      }
      if (paymentMethod.deferred_capture == 'unsupported') {
        throw new Error('La tarjeta ingresada no soporta pagos diferidos. Para suscribirse es necesario usar una tarjeta de crédito.')
      }
      return paymentMethod.min_allowed_amount
    },

    // SDK: https://www.mercadopago.com.ar/developers/en/tools/sdk/client/javascript#get-pm-info
    // API: https://www.mercadopago.com.ar/developers/en/api-docs/custom-checkout/payment-methods/
    async getPaymentMethod(paymentMethodId) {
      if (!process.browser) {
        return
      }
      return new Promise((resolve, reject) => {
        if (paymentMethodId) {
          this.$mercadopago.getPaymentMethod({
            payment_method_id: paymentMethodId
          },(status, response) => {
            if (status === 200) {
              resolve(response[0])
            } else {
              reject('Hubo un problema al intetar obtener la información del método de pago.')
            }
          })
        }else{
          reject('El identificador del método de pago no es válido.', paymentMethodId)
        }
      })
    },

    async cancelPayment () {
      await this.$axios.$put(
        'mercadopago/cancel-payment-authorization', {
          payment_id: this.paymentId,
      })
      this.payment.status = 'cancelled'
    },

    async createNewCustomer () {
      this.mensaje = 'Guardando tarjeta...'
      this.customer = await this.$axios.$post('mercadopago/create-customer', {
        email: this.email,
        token: this.cardToken
      })
    },

    async subscribe () {
      this.mensaje = 'Creando nueva suscripción...'
      this.subscription = await this.$axios.$post(
        'mercadopago/subscribe-customer', {
          plan_id: this.planId,
          customer_id: this.customer.id
        }
      )
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
