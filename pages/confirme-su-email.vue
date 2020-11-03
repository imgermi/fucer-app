<template>
  <main id="contenido" class="confirme-su-email">
    <SecondaryTop
      ref="pageFocusTarget"
      :nro-paso="nroPaso"
      :titulo-paso="tituloPaso"
    />
    <div class="band">
      <div class="container">
        <h1 class="intro__heading">Confirme su email</h1>
        <h2 class="sub__heading">
          ¡Gracias por registrarse! Hemos enviado un correo de confirmación a su
          cuenta de email.
        </h2>
        <p class="signup__agregados">
          ¿No ha recibido el mail?
          <nuxt-link :to="{ name: 'ingrese-su-email' }">
            Ingréselo de nuevo
          </nuxt-link>
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
  },
  auth: false,
  data() {
    return {
      title: "Confirme su email",
      nroPaso: "2",
      tituloPaso: "Cree su cuenta",
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
  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="sass">
@import 'sass/pages/confirme-su-email.sass'
</style>
