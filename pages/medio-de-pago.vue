<template>
  <div class="medio-de-pago">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band">
      <div class="container">
        <div v-if="$auth.loggedIn" class="user">
          <span>Sus datos personales</span>
          <small>{{ $auth.user.nombre }}</small>
          <small>{{ $auth.user.email }}</small>
        </div>
        <p>Para acceder a sus 15 días gratis, tendrá que suscribirse al plan seleccionado.</p>
        <p>No se preocupe. Cancele antes del {{ moment().add(15, 'days').format('D/M/Y') }} y <strong>no se le cobrará ningún cargo.</strong></p>
        <nuxt-link :to="{ name: 'tarjeta-de-credito' }" class="rounded__btn--full blue">Agregar tarjeta de crédito</nuxt-link>
        <div v-if="$auth.loggedIn">
          <span class="signup__agregados">¿Quiere iniciar con otra cuenta? <a @click="logout()">Cerrar Sesión</a></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import moment from 'moment'

export default {
  layout: 'signup',
  components: {
    SecondaryTop
  },
  middleware: 'plan-mercadopago',
  data() {
    return {
      moment: moment,
      title: 'Paso 3 - Medio de Pago',
      nroPaso: '3',
      tituloPaso: 'Seleccione su medio de pago'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ],
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push("/")
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/medio-de-pago.sass'</style>