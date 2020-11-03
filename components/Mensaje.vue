<template>
  <div v-if="textoNormalizado" :class="clase">
    {{ prefijo }}{{ textoNormalizado }}
  </div>
</template>

<script>
export default {
  props: {
    texto: {
      type: [String, Error],
      default: "",
    },
    tipo: {
      type: String,
      default: "info",
    },
  },
  computed: {
    textoNormalizado() {
      if (this.texto instanceof Error) {
        return this.texto.message;
      }
      return this.texto;
    },
    tipoNormalizado() {
      if (["info", "error", "success"].indexOf(this.tipo) === -1) {
        return "info";
      }
      return this.tipo;
    },
    prefijo() {
      return "error" == this.tipoNormalizado ? "Error: " : "";
    },
    clase() {
      return `msj-${this.tipoNormalizado}`;
    },
  },
  watch: {
    texto(newtexto, oldtexto) {
      if (!process.client) return;
      if (newtexto && newtexto !== oldtexto) {
        this.$announcer.set(newtexto);
      }
    },
  },
};
</script>

<style lang="sass">
@import 'sass/components/mensaje.sass'
</style>
