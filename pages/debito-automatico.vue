<template>
  <div class="registro">
    <SecondaryTop
      :nroPaso="nroPaso"
      :tituloPaso="tituloPaso"
      ref="pageFocusTarget"
    />
    <main class="band form__container">
      <div class="container">

        <div
          v-if="error"
          class="msj-error"
        >
          {{ error }}
        </div>

        <form method="post" @submit.prevent="suscribir" class="main__form">
          <fieldset>
            <label for="cbu">CBU</label>
            <input
              type="text"
              v-model.lazy="cbu"
              id="cbu"
              ref="cbu"
              name="cbu"
              v-validate="'required'"
              data-vv-as="CBU"
              :class="{'error': errors.has('cbu') }"
              onselectstart="return false"
              onpaste="return false"
              onCopy="return false"
              onCut="return false"
              onDrag="return false"
              onDrop="return false"
              autocomplete="off"
            />
            <span class="error" v-show="errors.has('cbu')">
              {{ errors.first('cbu') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="cuit">CUIT</label>
            <input
              type="text"
              v-model.lazy="cuit"
              id="cuit"
              ref="cuit"
              name="cuit"
              v-validate="'required'"
              data-vv-as="CUIT"
              :class="{'error': errors.has('cuit') }"
            />
            <span class="error" v-show="errors.has('cuit')">
              {{ errors.first('cuit') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="nombre">Nombre</label>
            <input
              type="text"
              v-model.lazy="nombre"
              id="nombre"
              ref="nombre"
              name="nombre"
              data-vv-as="Nombre"
              v-validate="'required'"
              :class="{'error': errors.has('nombre') }"
            />
            <span class="error" v-show="errors.has('nombre')">
              {{ errors.first('nombre') }}
            </span>
          </fieldset>

          <fieldset>
            <label for="apellido">Apellido</label>
            <input
              type="text"
              v-model.lazy="apellido"
              id="apellido"
              ref="apellido"
              name="apellido"
              data-vv-as="Apellido"
              v-validate="'required'"
              :class="{'error': errors.has('apellido') }"
            />
            <span class="error" v-show="errors.has('apellido')">
              {{ errors.first('apellido') }}
            </span>
          </fieldset>

          <button type="submit" class="rounded__btn--full blue">
            {{ txtBtnSubmit}}
          </button>
        </form>
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
  data() {
    return {
      error: false,
      title: 'Paso 3 - Débito automático',
      nroPaso: '3',
      tituloPaso: 'Configure el débito automático',
      cuit: '',
      cbu: '',
      nombre: '',
      apellido: '',
    }
  },

  computed: {
    ...mapState([
      'pagina'
    ]),
    txtBtnSubmit () {
      return this.pagina.cargando ? 'Cargando...' : 'Siguiente'
    },
  },

  methods: {
    ...mapActions([
      'setPaginaCargando'
    ]),

    async suscribir (event) {
      let valida = await this.$validator.validateAll()
      if (!valida) {
        return
      }

      try {
        await this.$axios.$post('suscripciones', {
          tipo: 'debito',
          datos: {
            cuit: this.cuit,
            cbu: this.cbu,
            nombre: this.nombre,
            apellido: this.apellido,
          }
        })
        await this.$auth.fetchUser()
        this.$router.push({
          name: 'inicio'
        })
      } catch(error) {
        this.error = error
      }
    }
  }
}
</script>
