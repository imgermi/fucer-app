<template>
  <main id="contenido" class="registro">
    <SecondaryTop
      ref="pageFocusTarget"
      :nro-paso="nroPaso"
      :titulo-paso="tituloPaso"
    />
    <div class="band form__container">
      <div class="container">
        <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

        <form method="post" class="main__form" @submit.prevent="suscribir">
          <template v-if="completado">
            <p>
              ¡Hola, {{ this.$auth.user.nombre }}! Ya puede acceder a sus 15
              días de prueba. Recuerde que no le cobraremos ningún cargo hasta
              dentro de 15 días. Si desea cancelar la suscripción antes del
              primer pago, puede hacerlo desde Configuración.
            </p>
            <br /><br />
          </template>

          <template v-else>
            <fieldset>
              <label for="cbu">CBU</label>
              <input
                id="cbu"
                ref="cbu"
                v-model.lazy="cbu"
                v-validate="'required'"
                type="text"
                name="cbu"
                data-vv-as="CBU"
                :class="{ error: errors.has('cbu') }"
              />
              <span v-show="errors.has('cbu')" class="error">
                {{ errors.first("cbu") }}
              </span>
            </fieldset>

            <fieldset>
              <label for="cuit">CUIT</label>
              <input
                id="cuit"
                ref="cuit"
                v-model.lazy="cuit"
                v-validate="'required'"
                type="text"
                name="cuit"
                data-vv-as="CUIT"
                :class="{ error: errors.has('cuit') }"
              />
              <span v-show="errors.has('cuit')" class="error">
                {{ errors.first("cuit") }}
              </span>
            </fieldset>

            <fieldset>
              <label for="rs">Código RS (si lo hubiera)</label>
              <input
                id="rs"
                ref="rs"
                v-model.lazy="rs"
                type="text"
                name="rs"
                :class="{ error: errors.has('rs') }"
              />
            </fieldset>

            <fieldset>
              <label for="nombre">Nombre</label>
              <input
                id="nombre"
                ref="nombre"
                v-model.lazy="nombre"
                v-validate="'required'"
                type="text"
                name="nombre"
                data-vv-as="Nombre"
                :class="{ error: errors.has('nombre') }"
              />
              <span v-show="errors.has('nombre')" class="error">
                {{ errors.first("nombre") }}
              </span>
            </fieldset>

            <fieldset>
              <label for="apellido">Apellido</label>
              <input
                id="apellido"
                ref="apellido"
                v-model.lazy="apellido"
                v-validate="'required'"
                type="text"
                name="apellido"
                data-vv-as="Apellido"
                :class="{ error: errors.has('apellido') }"
              />
              <span v-show="errors.has('apellido')" class="error">
                {{ errors.first("apellido") }}
              </span>
            </fieldset>
          </template>

          <button type="submit" class="rounded__btn--full green">
            {{ txtBtnSubmit }}
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";
import { mapState, mapActions } from "vuex";
import mensaje from "~/mixins/mensaje";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
  },
  mixins: [mensaje],
  data() {
    return {
      title: "Paso 3 - Débito automático",
      nroPaso: "3",
      tituloPaso: "Configure el débito automático",
      cuit: "",
      rs: "",
      cbu: "",
      nombre: "",
      apellido: "",
      completado: false,
    };
  },

  computed: {
    ...mapState(["pagina"]),
    txtBtnSubmit() {
      if (this.completado) {
        return "Continuar";
      }
      return this.pagina.cargando ? "Cargando..." : "Siguiente";
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!process.client) return;
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      );
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget.$el);
    });
  },

  methods: {
    ...mapActions(["setPaginaCargando"]),

    async suscribir() {
      if (this.completado) {
        await this.$router.push({
          name: "inicio",
        });
      }

      let valida = await this.$validator.validateAll();
      if (!valida) {
        return;
      }

      this.setPaginaCargando(true);
      try {
        await this.$axios.$post("suscripciones", {
          tipo: "debito",
          datos: {
            cuit: this.cuit,
            rs: this.rs,
            cbu: this.cbu,
            nombre: this.nombre,
            apellido: this.apellido,
          },
        });
        await this.$auth.fetchUser();
        this.setPaginaCargando(false);
        this.completado = true;
      } catch (error) {
        this.setMensaje(error, "error");
        this.setPaginaCargando(false);
      }
    },
  },
};
</script>
