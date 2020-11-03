<template>
  <div class="error">
    <client-only><vue-announcer /></client-only>
    <SkipLinks />
    <SecondaryTop />
    <section class="band">
      <div class="container">
        <h1 ref="pageFocusTarget" class="intro__heading">Error - 404</h1>
        <p>La página que está buscando no existe</p>
        <nuxt-link :to="{ name: 'inicio' }" class="rounded__btn--full white">
          Volver a Inicio
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";
import SkipLinks from "~/components/SkipLinks.vue";

export default {
  components: {
    SecondaryTop,
    SkipLinks,
  },
  data() {
    return {
      title: "Error - Página no encontrada",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!process.client) return;
      vm.$announcer.assertive(
        `${vm.title} ${vm.$announcer.options.complementRoute}`
      );
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget.$el);
    });
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
