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
            <label for="nombre">Número de la tarjeta</label>
            <input
              type="number"
              v-model="nroTarjeta"
              name="nroTarjeta"
              v-validate="'required'"
              id="nroTarjeta"
              ref="nroTarjeta"
              :class="{'error': errors.has('nroTarjeta') }"
              placeholder="0000 0000 0000 0000"
            />
            <span class="error" v-show="errors.has('nroTarjeta')">
              {{ errors.first('nroTarjeta') }}
            </span>
          </fieldset>
          <fieldset>
            <label for="nombre">Fecha de vencimiento</label>
            <input
              type="date"
              v-model="vencimiento"
              name="vencimiento"
              v-validate="'required'"
              id="vencimiento"
              ref="vencimiento"
              :class="{'error': errors.has('vencimiento') }"
              placeholder="02/18"
            />
            <span class="error" v-show="errors.has('vencimiento')">
              {{ errors.first('vencimiento') }}
            </span>
          </fieldset>
          <fieldset>
            <label for="nombre">Código de seguridad</label>
            <input
              type="number"
              v-model="codigo"
              name="codigo"
              v-validate="'required'"
              id="codigo"
              ref="codigo"
              :class="{'error': errors.has('codigo') }"
              placeholder="123"
            />
            <span class="error" v-show="errors.has('codigo')">
              {{ errors.first('codigo') }}
            </span>
          </fieldset>
          <fieldset>
            <label for="nombre">Nombre impreso en tarjeta</label>
            <input
              type="text"
              v-model="nombre"
              name="nombre"
              v-validate="'required'"
              id="nombre"
              ref="nombre"
              :class="{'error': errors.has('nombre') }"
              placeholder="Juan Miguel Fernandez"
            />
            <span class="error" v-show="errors.has('nombre')">
              {{ errors.first('nombre') }}
            </span>
          </fieldset>
          <fieldset>
            <label for="nombre">DNI</label>
            <input
              type="number"
              v-model="dni"
              name="dni"
              v-validate="'required'"
              id="dni"
              ref="dni"
              :class="{'error': errors.has('dni') }"
              placeholder="39917586"
            />
            <span class="error" v-show="errors.has('dni')">
              {{ errors.first('dni') }}
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
  components: {
    SecondaryTop
  },
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      passwordRepeat: '',
      error: false,
      title: 'Paso 3 - Tarjeta de Crédito',
      nroPaso: '3',
      tituloPaso: 'Configure su tarjeta de crédito'
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
