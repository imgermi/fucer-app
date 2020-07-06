<template>
  <main id="contenido" class="login">
    <SecondaryTop
      :tituloPaso="tituloPaso"
    />
    <div class="band form__container">
      <div class="container">

        <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" data-cy="error-form"/>

        <form @submit.prevent="login" class="main__form">
          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input
              type="email"
              name="email"
              v-model="email"
              id="email"
              data-cy="email"
              ref="pageFocusTarget"
              v-validate="'required'"
              :class="{'error': errors.has('email') }"
              placeholder="Email"
            />
            <span class="error" data-cy="error-email" v-show="errors.has('email')">
              {{ errors.first('email') }}
            </span>

          </fieldset>
          <fieldset>
            <label for="password">¿Cúal es su contraseña?</label>
            <input
              type="password"
              name="password"
              v-model="password"
              id="password"
              data-cy="password"
              v-validate="'required'"
              :class="{'error': errors.has('password') }"
              data-vv-as="contraseña"
              placeholder="Contraseña"
            />
            <span class="error" data-cy="error-password" v-show="errors.has('password')">
              {{ errors.first('password') }}
            </span>
          </fieldset>
          <button type="submit" data-cy="submit" class="rounded__btn--full green">
            {{ txtBtnIngresar}}
          </button>
        </form>
        <br>
        <p class="signup__agregados"><nuxt-link :to="{ name: 'restaurar-clave' }">¿Olvidó su clave? <b>Haga click aquí</b></nuxt-link>.</p>
        <p class="signup__agregados"><nuxt-link :to="{ name: 'ingrese-su-email' }">¿Registró su usuario pero no recibió el mail para activarlo? <b>Envíelo de nuevo</b></nuxt-link>.</p>
      </div></div>
    
  </main>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import { mapState, mapActions } from 'vuex'
import mensaje from '~/mixins/mensaje'

export default {
  layout: 'signup',
  mixins: [mensaje],
  components: {
    SecondaryTop
  },
  auth: false,
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      title: 'Ingresar',
      tituloPaso: 'Ingrese a FucerNet con su email'
    }
  },
  computed: {
    ...mapState([
      'pagina'
    ]),
    txtBtnIngresar () {
      return this.pagina.cargando ? 'Cargando...' : 'Ingresar'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      )
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
    })
  },
  mounted() {
    this.$refs.pageFocusTarget.focus()
  },
  methods: {
     ...mapActions([
      'setPaginaCargando'
    ]),
    async login() {
      let valida = await this.$validator.validateAll()
      if (!valida) {
        return
      }
      this.setPaginaCargando(true)
      this.resetMensaje()
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          }
        })
        const redirectTo = this.$auth.user.suscripcion.premium
          ? 'inicio'
          : 'medio-de-pago';
        this.$router.push({ name: redirectTo })
      } catch(e) {
        this.setMensaje(e, 'error')
      }
      this.setPaginaCargando(false)
    }
  },
  head () {
    return {
      title: this.title,
    }
  },
}
</script>

<style lang="sass">@import 'sass/pages/login.sass'</style>