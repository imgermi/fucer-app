<template>
  <div class="confirme-su-email">
    <SecondaryTop/>
    <main class="band">
      <div class="container">
        <h1 class="intro__heading" ref="pageFocusTarget">Suscripción en revisión</h1>
        <h2 class="sub__heading">{{ mensaje }}</h2>
        <nuxt-link :to="{name: 'modificar-tarjeta'}" class="rounded__btn--medium green">
          Cambiar tarjeta
        </nuxt-link>
      </div>
    </main>
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
  middleware: 'plan-no-ilimitado',
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
      return this.mensajes[this.$store.state.auth.user.suscripcion.metadata.estado_invoice]
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/confirme-su-email.sass'</style>