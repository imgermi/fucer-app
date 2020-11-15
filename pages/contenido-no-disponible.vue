<template>
  <div class="bienvenido">
    <SecondaryTop />
    <main id="contenido" class="band">
      <div class="container">
        <h1 ref="pageFocusTarget">Contenido no disponible</h1>
        <p>
          Lo sentimos, este contenido solo está disponible para los usuarios
          premium.
        </p>
        <nuxt-link
          :to="{ name: 'modificar-plan' }"
          class="rounded__btn--full white"
        >
          Actualizar plan
        </nuxt-link>
      </div>
    </main>
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
      title: "Contenido no disponible",
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
      bodyAttrs: {
        class: "bg__gradient",
      },
    };
  },
};
</script>

<style lang="sass">
@import 'sass/pages/bienvenido.sass'
</style>
