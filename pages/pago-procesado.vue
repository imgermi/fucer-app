<template>
  <div class="bienvenido">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>
        <template v-if="$route.params.status === 'success' && verificandoPago">
          <b>Cargando...</b>
        </template>
        <template v-else>
          <nuxt-link :to="{ name: 'inicio' }" class="rounded__btn--full white">
            Ir al inicio
          </nuxt-link>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
  components: {
    SecondaryTop
  },
  data () {
    return {
      error: '',
      verificandoPago: false
    }
  },
  computed: {
    title () {
      switch(this.$route.params.status){
        case 'success':
          return 'Pago aprobado'
        case 'pending':
          return 'Pago pendiente'
        case 'failure':
          return 'Hubo un problema'
      }
    },
    message () {
      if(this.$route.params.status == 'success' && this.verificandoPago && !this.error){
        if (! this.error){
          return 'Estamos verificando su pago. Aguarde unos instantes.'
        } else {
          return this.error
        }
      }

      switch(this.$route.query.collection_status){
        case 'approved':
          return '¡El pago fue aprobado y acreditado! Recibirá un email con la información pertinente.'
        case 'pending':
          return 'Operación exitosa, queda pendiente completar el proceso de pago.'
        case 'in_process':
          return 'El pago está siendo revisado.'
        case 'rejected':
          return 'El pago fue rechazado. el usuario puede intentar nuevamente.'
        case 'refunded':
          return 'El pago fue devuelto al usuario.'
        case 'cancelled':
          break
        case 'in_mediation':
          return 'Se inició una disputa para el pago.'
        case 'charged_back':
          return 'Se realizó un contracargo en la tarjeta de crédito.'
        default:
          return 'El pago no se completó, no se genero ningún cargo en la tarjeta. Por favor, intente nuevamente.'
      }
   }
  },
  created () {
    this.verificarPago()
  },
  methods: {
    async verificarPago () {
      this.verificandoPago = true
      try {
        let {data} = await this.$axios.get('mercadopago/validar-pago', {
          params: {
            external_reference: this.$route.query.external_reference,
            collection_status: this.$route.query.collection_status
          }
        })
        await this.$auth.fetchUser()
        this.error = false
      } catch (e) {
        console.log(e)
        this.error = e.response.data.error.message.replace('Bad Request:', '')
      }
      this.verificandoPago = false
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ],
      bodyAttrs: {
          class: 'bg__gradient'
      }
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/bienvenido.sass'</style>