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
      error: false,
      verificandoPago: true,
      status: ''
    }
  },
  computed: {
    title () {
      switch(this.status){
        case 'authorized':
          return 'Pago aprobado'

        case 'pending':
          return 'Pago pendiente'

        case 'cancelled':
          return 'Hubo un problema'

        default:
          return 'Verificando el pago'
      }
    },
    message () {
      if (this.error){
        return this.error
      }
      if(this.verificandoPago){
        return 'Estamos verificando su pago. Aguarde unos instantes.'
      }
      switch(this.status){
        case 'authorized':
          return '¡El pago fue aprobado y acreditado! Ya es un usuario premium.'

        case 'pending':
          return 'Se registró la suscripción pero queda pendiente autorizar el pago para completar el proceso. Contacte al administrador para activar el plan cuando MercadoPago le confirme la suscripción.'

        case 'paused':
          return 'La suscripción fue pausada. No se van a seguir registrando consumos.'

        case 'cancelled':
          return 'El pago no fue autorizado.'

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
      if (!this.$route.query.preapproval_id) {
        this.status = 'cancelled'
        this.verificandoPago = false
        return
      }
      try {
        let data = await this.$axios.$get('mercadopago/validar-pago', {
          params: {
            preapproval_id: this.$route.query.preapproval_id
          }
        })
        this.status = data.status
        if (data.status === 'authorized') {
          // Actualizo el token de seguridad
          this.$auth.setToken(data.token)
          await this.$auth.fetchUser()
        }
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