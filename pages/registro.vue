<template>
  <div class="registro">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band form__container">
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
              ref="password"
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
              ref="password-repeat"
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

          <button type="submit" class="rounded__btn--full blue">
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
  layout: 'signup',
  components: {
    SecondaryTop
  },
  auth: false,
  middleware: 'guest',
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      passwordRepeat: '',
      error: false,
      title: 'Registrarse',
      nroPaso: '2',
      tituloPaso: 'Cree su cuenta'
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
      let valida = await this.$validator.validateAll()
      if (!valida) {
        return
      }
      this.setPaginaCargando(true)
      try {
        await this.$axios.$post('auth/register', {
          nombre: this.nombre,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'confirme-su-email'})
        })
        .catch(e => {
          this.error = e.response.data.error.message.replace('Bad Request:', '')
        })

      } catch(e) {
        this.error = e.response.data.error.message.replace('Bad Request:', '')
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
  },
}
</script>
