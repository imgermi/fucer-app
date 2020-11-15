<template>
  <div class="error">
    <SecondaryTop />
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">Sin conexión</h1>
        <p>Este contenido no está disponible sin conexión.</p>
        <a
          class="rounded__btn--full white"
          @click="$router.go(-1)"
          @keyup.enter="$router.go(-1)"
          >Volver</a
        >
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";

export default {
  components: {
    SecondaryTop,
  },
  auth: false,
  data() {
    return {
      title: "Sin conexión",
    };
  },
  head() {
    return {
      title: this.title,
      bodyAttrs: {
        class: "bg__gradient",
      },
    };
  },
};
</script>

<style lang="sass">
@import 'sass/layouts/error.sass'
</style>
