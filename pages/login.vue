<template>
  <div class="login">
    <SecondaryTop :tituloPaso="tituloPaso"/>
    <section class="band form__container">
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
          <button type="submit" class="rounded__btn--full blue">
            {{ txtBtnIngresar}}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import { mapState, mapActions } from 'vuex'

export default {
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
      tituloPaso: 'Ingrese a Fucer con su email'
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
      let response = this.$auth.login({
        data: {
          username: this.email,
          password: this.password
        }
      }).catch(e => {
        this.error = 'Revise sus credenciales por favor. Algún dato no es correcto o el usuario todavía no está activo.'
      })
      this.setPaginaCargando(false)
      return response
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