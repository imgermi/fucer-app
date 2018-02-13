<template>
  <div class="registro">
    <SecondaryTop/>
    <section class="band">
      <div class="container">

        <div class="msj-error" v-if="error">
          {{ error }}
        </div>

        <form @submit.prevent="register" class="main__form">
          <fieldset>
            <label for="nombre">¿Cúal es su nombre?</label>
            <input
              type="text"
              v-model="nombre"
              name="nombre"
              v-validate="'required'"
              id="nombre"
              ref="nombre"
              :class="{'error': errors.has('nombre') }"
              placeholder="Nombre completo"
            />
            <span class="error" v-show="errors.has('nombre')">
              {{ errors.first('nombre') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input
              type="email"
              name="email"
              v-model="email"
              v-validate="'required|email'"
              id="email"
              :class="{'error': errors.has('email') }"
              placeholder="Email"
            />
            <span class="error" v-show="errors.has('email')">
              {{ errors.first('email') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="password">Ingrese una contraseña</label>
            <input
              type="password"
              v-model="password"
              name="password"
              v-validate="'required'"
              id="password"
              data-vv-as="contraseña"
              :class="{'error': errors.has('password') }"
              placeholder="Contraseña"
            />
            <span class="error" v-show="errors.has('password')">
              {{ errors.first('password') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="password-repeat">Repita la contraseña</label>
            <input
              type="password"
              name="passwordRepeat"
              v-model="passwordRepeat"
              v-validate="'required|confirmed:password'"
              id="password-repeat"
              data-vv-as="contraseña repetida"
              :class="{'error': errors.has('password') }"
              placeholder="Contraseña"
            />
            <span class="error" v-show="errors.has('passwordRepeat')">
              {{ errors.first('passwordRepeat') }}
            </span>
          </fieldset>

          <button type="submit" class="rounded__btn--full">
            {{ txtBtnSubmit}}
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
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      passwordRepeat: '',
      error: false
    }
  },
  computed: {
    ...mapState([
      'pagina'
    ]),
    txtBtnSubmit () {
      return this.pagina.cargando ? 'Cargando...' : 'Siguiente'
    }
  },
  mounted() {
    this.$refs.nombre.focus()
  },
  methods: {
    ...mapActions([
      'setPaginaCargando'
    ]),
    async register() {
      this.setPaginaCargando(true)
      try {
        await this.$axios.$post('auth/register', {
          nombre: this.nombre,
          email: this.email,
          password: this.password
        })

        await this.$auth.login({
          data: {
            username: this.email,
            password: this.password
          }
        }).catch(e => {
          this.error = e.response.data.error.message.replace('Bad Request:', '')
        })
        // Esto no debería hacer falta, tal vez ya lo hayan arreglado
        // https://github.com/nuxt-community/auth-module/issues/23
        this.$router.push({name: 'inicio'})
      } catch(e) {
        this.error = e.response.data.error.message.replace('Bad Request:', '')
      }

      this.setPaginaCargando(false)
    }
  }
}
</script>
