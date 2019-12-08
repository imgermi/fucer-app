<template>
  <div class="login">
    <SecondaryTop :tituloPaso="tituloPaso"/>
    <main class="band form__container">
      <div class="container">

        <div class="msj-error" v-if="error">
          {{ error }}
        </div>

        <form @submit.prevent="login" class="main__form">
          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input
              type="email"
              name="email"
              v-model="email"
              id="email"
              ref="email"
              v-validate="'required'"
              :class="{'error': errors.has('email') }"
              placeholder="Email"
            />
            <span class="error" v-show="errors.has('email')">
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
              v-validate="'required'"
              :class="{'error': errors.has('password') }"
              data-vv-as="contraseña"
              placeholder="Contraseña"
            />
            <span class="error" v-show="errors.has('password')">
              {{ errors.first('password') }}
            </span>
          </fieldset>
          <button type="submit" class="rounded__btn--full green">
            {{ txtBtnIngresar}}
          </button>
        </form>
        <br>
        <p class="signup__agregados">¿Olvidó su clave? <nuxt-link :to="{ name: 'restaurar-clave' }">Haga click aquí</nuxt-link>.</p>
        <p class="signup__agregados">¿Registró su usuario pero no recibió el mail para activarlo? <nuxt-link :to="{ name: 'ingrese-su-email' }">Envíelo de nuevo</nuxt-link>.</p>
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
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: false,
      title: 'Ingresar',
      tituloPaso: 'Ingrese a Legister con su email'
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
  mounted() {
    this.$refs.email.focus()
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
      let response = this.$auth.loginWith('local', {
        data: {
          username: this.email,
          password: this.password
        }
      })
      .then(() => {
        if (this.$auth.user.suscripcion.premium) {
          this.$router.push({name: 'inicio'})
        } else {
          this.$router.push({name: 'medio-de-pago'})
        }
      })
      .catch(e => {
        this.error = 'Revise sus credenciales por favor. Algún dato no es correcto o el usuario todavía no está activo.'
      })
      this.setPaginaCargando(false)
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
}
</script>

<style lang="sass">@import 'sass/pages/login.sass'</style>