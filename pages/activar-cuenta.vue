<template>
  <div class="mail-confirmado">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band">
      <div class="container">
        <h1>
          <span v-html="mensaje"></span>
        </h1>
        <div v-if="confirmado">
          <nuxt-link
            class="rounded__btn--full blue"
            :to="{ name: 'medio-de-pago' }"
          >
            Siguiente
          </nuxt-link>
        </div>
        <div v-else>
          <nuxt-link
            :to="{ name: 'login', query: {redirect: '/medio-de-pago'} }"
            class="rounded__btn--full blue"
          >
            Iniciar sesión
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    SecondaryTop
  },
  auth: false,
  data() {
    return {
      title: 'Activar cuenta',
      nroPaso: '2',
      tituloPaso: 'Cree su cuenta',
      mensaje: 'Procesando...',
      confirmado: true
    }
  },
  // Reviso que esté el token en la URL
  validate ({ params }) {
    return /^[0-9a-z]{32}$/.test(params.token)
  },
  created () {
    this.activarCuenta()
  },
  methods: {
     ...mapActions([
      'setPaginaCargando'
    ]),
    async activarCuenta() {
      this.setPaginaCargando(true)
      try {
        let {data} = await this.$axios.$post('auth/activateAccount', {
          token: this.$route.params.token,
        })

        this.$auth.setToken(data.token)
        await this.$auth.fetchUser()

        this.title = 'E-mail confirmado'
        this.mensaje = '¡Bienvenido ' + this.$auth.state.user.nombre + '!<br><br> Su email ha sido confirmado. En breve lo redirigimos activar su trial.'
        setTimeout(async () => {
          this.$router.push({name: 'medio-de-pago'})
        }, 3000)

      } catch(e) {
        this.confirmado = false
        this.mensaje = e.response.data.error.message.replace('Bad Request:', '')
      }
      this.setPaginaCargando(false)
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/bienvenido.sass'</style>