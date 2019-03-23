<template>
  <div class="confirme-su-email">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">Suscripción en revisión</h1>
        <h2 class="sub__heading">{{ mensaje }}</h2>
        <nuxt-link :to="{name: 'modificar-tarjeta'}" class="rounded__btn--medium blue">
          Cambiar tarjeta
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
  layout: 'signup',
  components: {
    SecondaryTop
  },
  auth: false,
  middleware: 'plan-mercadopago',
  data() {
    return {
      title: 'Estado de suscripción',
      mensajes: {
        pending: 'Un pago esta agendado para ser cobrado próximamente.',
        dunning: 'Los intentos de cobro anteriores fueron rechazados, MercadoPago está reintentando el cobro para obtener una aprobación.',
        paid: 'El pago de la suscripción fue realizado exitosamente.',
        unpaid: 'Luego de todos los intentos de cobro, no fue posible obtener una aprobación. Ya no se realizarán más reintentos. Le aconsejamos que actualize su tarjeta y que vuelva a suscribirse.',
        cancelled: 'Se canceló el pago programado antes de ser cobrado.'
      }
    }
  },
  computed: {
    mensaje () {
      return this.mensajes[this.$store.state.auth.user.suscripcion.estado_invoice]
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ],
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/confirme-su-email.sass'</style>