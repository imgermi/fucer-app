<template>
  <main id="contenido" class="login">
    <SecondaryTop
      :tituloPaso="tituloPaso"
    />
    <div class="band form__container">
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
              ref="pageFocusTarget"
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
        <p class="signup__agregados"><nuxt-link :to="{ name: 'restaurar-clave' }">¿Olvidó su clave? <b>Haga click aquí</b></nuxt-link>.</p>
        <p class="signup__agregados"><nuxt-link :to="{ name: 'ingrese-su-email' }">¿Registró su usuario pero no recibió el mail para activarlo? <b>Envíelo de nuevo</b></nuxt-link>.</p>
      </div></div>
    
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
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: false,
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
      try {
        let response = await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          }
        })
        if (!this.$auth.user.suscripcion.premium) {
          this.$router.push({name: 'medio-de-pago'})
        }
      } catch(e) {
        console.log(e)
        this.error = 'Revise sus credenciales por favor. Algún dato no es correcto o el usuario todavía no está activo.'
        this.$announcer.set(this.error)
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
    }
  },
}
</script>

<style lang="sass">@import 'sass/pages/login.sass'</style>