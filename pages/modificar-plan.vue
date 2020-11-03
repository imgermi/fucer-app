<template>
  <div class="modificar-plan">
    <header>
      <div class="container">
        <nuxt-link :to="{ name: 'configuracion' }"> Cancelar </nuxt-link>
      </div>
    </header>

    <main id="contenido">
      <section class="band">
        <div class="container">
          <div class="datos__plan">
            <h2 ref="pageFocusTarget">Mi plan</h2>
            <div v-if="suscripcion.premium" class="datos__plan--dato">
              <span>{{ suscripcion.plan.descripcion }}</span>
              <small>{{
                suscripcion.activa ? "$" + suscripcion.plan.valor : ""
              }}</small>
            </div>
          </div>
        </div>
      </section>

      <section class="band">
        <div class="container">
          <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

          <h2>Suscripción</h2>
          <div class="msj">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="suscripcion.plan.estado" />
          </div>
          <br />

          <div class="datos__plan--dato seleccionar">
            <span>Plan Premium</span>
            <small>${{ suscripcion.plan.valor }} mensuales</small>
            <button
              class="rounded__btn--medium"
              @click="modificarSuscripcion"
              @keyup.enter="modificarSuscripcion"
            >
              {{
                actualizandoPlan
                  ? "Cargando..."
                  : suscripcion.activa
                  ? "Cancelar suscripción"
                  : "Suscríbase"
              }}
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import mensaje from "~/mixins/mensaje";

export default {
  mixins: [mensaje],
  middleware: "plan-no-ilimitado",
  data() {
    return {
      title: "Modificar Plan",
      actualizandoPlan: false,
    };
  },
  computed: {
    suscripcion() {
      return this.$auth.user.suscripcion;
    },
  },
  watch: {
    "suscripcion.plan.estado"(newEstado, oldEstado) {
      if (!process.client) return;
      if (newEstado !== oldEstado) {
        this.$announcer.set(newEstado);
      }
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
  methods: {
    async modificarSuscripcion() {
      this.actualizandoPlan = true;
      try {
        if (this.suscripcion && this.suscripcion.activa) {
          await this.$axios.$delete("suscripciones");
        } else {
          await this.$axios.$patch("suscripciones", {});
        }
        await this.$auth.fetchUser();
      } catch (error) {
        this.setMensaje(error, "error");
      }
      this.actualizandoPlan = false;
    },
  },
};
</script>

<style lang="sass">
@import 'sass/pages/modificar-plan.sass'
</style>
