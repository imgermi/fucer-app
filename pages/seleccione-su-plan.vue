<template>
  <main id="contenido" class="seleccione-su-plan">
    <SecondaryTop
      ref="pageFocusTarget"
      :nro-paso="nroPaso"
      :titulo-paso="tituloPaso"
    />
    <div class="band">
      <div class="container">
        <div class="plan__titulo">
          <span>Premium</span>
        </div>
        <span v-if="precioPlan" class="plan__precio">
          ${{ precioPlan }} mensuales
        </span>
        <small class="plan__recordatorio"
          >Antes de abonar, usted contará con 15 días gratuitos para probar la
          app</small
        >
        <ul class="plan__specs">
          <li>Acceso ilimitado a Normativas</li>
          <li>Recopilación de material</li>
          <li>Resúmenes introductorios y explicativos sobre material</li>
        </ul>

        <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

        <nuxt-link :to="{ name: 'registro' }" class="rounded__btn--full green">
          Siguiente
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import mensaje from "~/mixins/mensaje";
import SecondaryTop from "~/components/SecondaryTop.vue";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
  },
  mixins: [mensaje],
  auth: false,
  middleware: "guest",
  data() {
    return {
      title: "Paso 1 - Seleccione su plan",
      nroPaso: "1",
      tituloPaso: "Seleccione su plan",
      precioPlan: false,
    };
  },
  async created() {
    await this.obtenerConfigs();
  },
  methods: {
    ...mapActions(["setPaginaCargando"]),
    async obtenerConfigs() {
      this.setPaginaCargando(true);
      this.resetMensaje();
      try {
        let data = await this.$axios.$get("configuraciones");
        this.precioPlan = data.precio_regular;
      } catch (e) {
        this.setMensaje(e, "error", 5000);
      }
      this.setPaginaCargando(false);
    },
  },
  head() {
    return {
      title: this.title,
    };
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
};
</script>

<style lang="sass">
@import 'sass/pages/seleccione-su-plan.sass'
</style>
