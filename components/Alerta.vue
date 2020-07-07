<template>
  <header v-if="$auth.user && $auth.user.suscripcion.trial">
    <div class="alerta-plan">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="mensajeDiasFinTrial" />
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    mensajeDiasFinTrial() {
      const dias =
        this.$auth.user.suscripcion &&
        this.$auth.user.suscripcion.dias_fin_trial;
      if (dias > 0) {
        return (
          "En <b>" +
          dias +
          " " +
          (dias > 1 ? "dias" : "día") +
          " se termina</b> su versión de prueba."
        );
      } else if (dias == 0) {
        return "<b>Hoy se termina</b> su versión de prueba.";
      } else {
        return "Su versión de prueba <b>ha caducado</b>.";
      }
    },
  },
};
</script>

<style lang="sass">
@import 'sass/components/alerta.sass'
</style>
