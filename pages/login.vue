<template>
  <div class="registro">
    <SecondaryTop/>
    <section class="band">
      <div class="container">

        <div class="msj-error" v-if="hasError">
          Revise sus credenciales por favor, algún dato no es correcto.
        </div>

        <form @submit.prevent="login" class="main__form">
          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input type="email" v-model="email" id="email" ref="email" placeholder="Email">
          </fieldset>
          <fieldset>
            <label for="password">¿Cúal es su contraseña?</label>
            <input type="password"  v-model="password" id="password" placeholder="contraseña">
          </fieldset>
          <button type="submit" class="rounded__btn--full">
            {{ txtBtnIngresar}}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'
import { mapState } from 'vuex'

export default {
  components: {
    SecondaryTop
  },
  data() {
    return {
      email: '',
      password: '123',
      hasError: false
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
    async login() {
      return this.$auth.login({
        data: {
          username: this.email,
          password: this.password
        }
      }).catch(e => {
        this.hasError = true
      })
    }
  }
}
</script>