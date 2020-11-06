<template>
  <div class="ayuda">
    <Alerta />
    <Top :title="title" />
    <main id="contenido" class="band">
      <div class="container">
        <h1 ref="pageFocusTarget" tabindex="0">¿Necesita ayuda?</h1>
        <h2>Comuníquese con nosotros</h2>
        <p>
          Estamos trabajando permanentemente sobre la app para mejorarla. Si
          tiene algún comentario para hacernos sobre la misma, o desea recibir
          ayuda para resolver un problema, no deje de contactarnos.
        </p>
        <a href="mailto:soporte@fucer.com.ar">
          <span>Nos puede escribir a:</span>
          <small>soporte@fucer.com.ar</small>
        </a>
      </div>
    </main>
  </div>
</template>

<script>
import Top from "~/components/Top.vue";
import Alerta from "~/components/Alerta.vue";

export default {
  layout: "app",
  auth: false,
  components: {
    Top,
    Alerta,
  },
  data() {
    return {
      title: "Ayuda",
    };
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

  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="sass">
@import 'sass/pages/ayuda.sass'
</style>
