<template>
  <main id="contenido" class="mail-confirmado">
    <SecondaryTop
      :nroPaso="nroPaso"
      :tituloPaso="tituloPaso"
      ref="pageFocusTarget"
    />
    <div class="band">
      <div class="container">
        <h1>
          <span v-html="mensaje"></span>
        </h1>
        <div v-if="!pagina.cargando">
          <nuxt-link
            class="rounded__btn--full green"
            :to="{ name: 'medio-de-pago' }"
          >
            Siguiente
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'signup',
  components: {
    SecondaryTop
  },
  auth: false,
  data() {
    return {
      title: 'Activar cuenta',
      nroPaso: '2',
      tituloPaso: 'Cree su cuenta',
      mensaje: 'Procesando...'
    }
  },
  computed: {
    ...mapState([
      'pagina'
    ])
  },

  // Reviso que esté el token en la URL
  validate ({ params }) {
    return /^[0-9a-z]{32}$/.test(params.token)
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      )
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget.$el)
    })
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
        this.$announcer.set(this.mensaje)
        let {data} = await this.$axios.$post('auth/activateAccount', {
          token: this.$route.params.token,
        })

        this.$auth.setToken('local', 'Bearer ' + data.token)
        await this.$auth.fetchUser()

        this.title = 'E-mail confirmado'
        this.mensaje = '¡Bienvenido, ' + this.$auth.user.nombre + '!<br><br> Su email ha sido confirmado.'
        this.$announcer.set(this.mensaje)
      } catch(e) {
        this.mensaje = e
        this.$announcer.set(this.mensaje)
      }
      this.setPaginaCargando(false)
    }
  },
  head () {
    return {
      title: this.title,
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/bienvenido.sass'</style>