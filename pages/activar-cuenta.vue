<template>
  <div class="mail-confirmado">
    <SecondaryTop
      :nroPaso="nroPaso"
      :tituloPaso="tituloPaso"
      ref="pageFocusTarget"
    />
    <main class="band">
      <div class="container">
        <h1>
          <span v-html="mensaje"></span>
        </h1>
        <div v-if="!pagina.cargando">
          <nuxt-link
            class="rounded__btn--full blue"
            :to="{ name: 'medio-de-pago' }"
          >
            Siguiente
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
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

        this.$auth.setToken('local', 'Bearer ' + data.token)
        await this.$auth.fetchUser()
        
        this.title = 'E-mail confirmado'
        this.mensaje = '¡Bienvenido, ' + this.$auth.user.nombre + '!<br><br> Su email ha sido confirmado.'

      } catch(e) {
        if(e.request){
          console.log(e.request)
          this.mensaje = JSON.parse(e.request.response).error.message.replace('Bad Request:', '')
        }else if(e.response){
          console.log(e.response)
          this.mensaje = e.response.data.error.message.replace('Bad Request:', '')
        }else{
          console.log(e)
        }
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