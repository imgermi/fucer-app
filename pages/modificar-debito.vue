<template>
  <main id="contenido" class="modificar-datos">
    <section class="band">
      <div class="container">
        <nuxt-link :to="{ name: 'configuracion' }">
          <img
            src="~/assets/img/arrow-left.svg"
            alt="Volver"
            class="arrow-left"
          />
        </nuxt-link>
        <h2 ref="pageFocusTarget">Modificar débito automático</h2>

        <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

        <form
          method="post"
          class="main__form"
          @submit.prevent="actualizarDatos"
        >
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
              onselectstart="return false"
              onpaste="return false"
              oncopy="return false"
              oncut="return false"
              ondrag="return false"
              ondrop="return false"
              autocomplete="off"
            />
            <span v-show="errors.has('cbu')" class="error">{{
              errors.first("cbu")
            }}</span>
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
            <span v-show="errors.has('cuit')" class="error">{{
              errors.first("cuit")
            }}</span>
          </fieldset>

          <fieldset>
            <label for="cuit">Código RS</label>
            <input
              id="rs"
              ref="rs"
              v-model.lazy="rs"
              type="text"
              name="rs"
              data-vv-as="Código RS"
              :class="{ error: errors.has('rs') }"
            />
            <span v-show="errors.has('rs')" class="error">{{
              errors.first("rs")
            }}</span>
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
            <span v-show="errors.has('nombre')" class="error">{{
              errors.first("nombre")
            }}</span>
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
            <span v-show="errors.has('apellido')" class="error">{{
              errors.first("apellido")
            }}</span>
          </fieldset>

          <button type="submit" class="rounded__btn--full green">
            {{ txtBtnSubmit }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
import mensaje from "~/mixins/mensaje";

export default {
  mixins: [mensaje],
  middleware: "plan-no-ilimitado",
  data() {
    return {
      title: "Modificar débito automático",
      cuit: this.$auth.user.suscripcion.metadata.cuit,
      rs: this.$auth.user.suscripcion.metadata.rs,
      cbu: this.$auth.user.suscripcion.metadata.cbu,
      nombre: this.$auth.user.suscripcion.metadata.nombre,
      apellido: this.$auth.user.suscripcion.metadata.apellido,
    };
  },

  computed: {
    ...mapState(["pagina"]),
    txtBtnSubmit() {
      return this.pagina.cargando ? "Cargando..." : "Actualizar";
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!process.client) return;
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      );
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget);
    });
  },

  mounted() {
    this.$refs.cbu.focus();
  },

  methods: {
    async actualizarDatos() {
      let valida = await this.$validator.validateAll();
      if (!valida) {
        return;
      }

      try {
        await this.$axios.$patch("suscripciones/datos", {
          tipo: "debito",
          datos: {
            rs: this.rs,
            cuit: this.cuit,
            cbu: this.cbu,
            nombre: this.nombre,
            apellido: this.apellido,
          },
        });
        await this.$auth.fetchUser();
        this.setMensaje("Los datos fueron actualizados", "info", 3000);
      } catch (error) {
        this.setMensaje(error, "error");
      }
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="sass">
@import 'sass/pages/modificar-datos.sass'
</style>
