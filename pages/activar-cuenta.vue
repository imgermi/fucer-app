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

        this.mensaje = 'Su usuario fue activado con éxito. En breve lo redirigimos.'
        setTimeout(async () => {
          try {
            this.$auth.setToken(data.token)
            await this.$auth.fetchUser()
            this.$router.push({name: 'inicio'})
          } catch(e) {
            this.mensaje = e.response.data.error.message.replace('Bad Request:', '')
          }
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