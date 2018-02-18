<template>
  <div class="confirme-su-email">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">
          <span v-html="mensaje"></span>
        </h1>
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
      mensaje: 'Procesando...'
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
        try {
          this.$auth.setToken(data.token)
          await this.$auth.fetchUser()
        } catch(e) {
          this.mensaje = e.response.data.error.message.replace('Bad Request:', '')
        }
        this.mensaje = '¡Bienvenido ' + this.$auth.state.user.nombre + '!<br><br> Su email ha sido confirmado. En breve lo redirigimos para comenzar a utilizar la aplicación.'
        setTimeout(async () => {
          this.$router.push({name: 'inicio'})
        }, 3000)

      } catch(e) {
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
      ],
      bodyAttrs: {
          class: 'bg__gradient'
      }
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/confirme-su-email.sass'</style>