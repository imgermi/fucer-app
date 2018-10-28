<template>
  <div class="confirme-su-email">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">Suscripción en revisión</h1>
        <h2 class="sub__heading">Mercadopago indica que Visa necesita 48hs hábiles para aprobar su tarjeta de crédito.</h2>
        <nuxt-link to="" class="rounded__btn--medium blue">
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
  data() {
    return {
      title: 'Estado de suscripción',
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