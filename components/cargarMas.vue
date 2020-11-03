<template>
  <div v-if="!todas" class="center" @click="cargarMas" @keyup.enter="cargarMas">
    <button class="rounded__btn--medium green">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="mensaje" />
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      pagina: 1,
      mensaje: "Cargar más",
    };
  },
  computed: {
    ...mapState("normativas", ["todas"]),
    ...mapGetters("normativas", ["recientes"]),
  },
  methods: {
    ...mapActions("normativas", ["getRecientes"]),
    async cargarMas() {
      await this.obtenerMasNormativas();
    },
    async obtenerMasNormativas() {
      this.pagina++;
      let oldMensaje = this.mensaje;
      this.mensaje = "Cargando...";
      if (process.client) this.$announcer.set(this.mensaje);
      await this.getRecientes(this.pagina);
      this.mensaje = oldMensaje;
      if (process.client) this.$announcer.set("Normativas cargadas");
    },
  },
};
</script>
