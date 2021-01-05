<template>
  <main id="contenido" class="mail-confirmado">
    <SecondaryTop
      ref="pageFocusTarget"
      :nro-paso="nroPaso"
      :titulo-paso="tituloPaso"
    />
    <div class="band">
      <div class="container">
        <h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="mensaje" />
        </h1>
        <div v-if="!pagina.cargando">
          <nuxt-link
            class="rounded__btn--full green"
            :to="{
              name: 'login',
              query: {
                redirect: 'medio-de-pago',
              },
            }"
          >
            Siguiente
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";
import { mapState, mapActions } from "vuex";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
  },
  auth: false,
  data() {
    return {
      title: "Activar cuenta",
      nroPaso: "2",
      tituloPaso: "Cree su cuenta",
      mensaje: "Procesando...",
    };
  },
  computed: {
    ...mapState(["pagina"]),
  },

  // Reviso que esté el token en la URL
  validate({ params }) {
    return process.client ? /^[0-9a-z]{32}$/.test(params.token) : true;
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

  created() {
    if (!process.client) return;
    this.activarCuenta();
  },
  methods: {
    ...mapActions(["setPaginaCargando"]),
    async activarCuenta() {
      this.setPaginaCargando(true);
      try {
        if (process.client) this.$announcer.set(this.mensaje);
        let { data } = await this.$axios.$post("auth/activateAccount", {
          token: this.$route.params.token,
        });

        // Loggea automáticamente al usuario
        this.$auth.setToken("local", "Bearer " + data.token);
        await this.$auth.fetchUser();

        this.title = "E-mail confirmado";
        this.mensaje =
          "¡Bienvenido, " +
          this.$auth.user.nombre +
          "!<br><br> Su email ha sido confirmado.";
        if (process.client) this.$announcer.set(this.mensaje);
      } catch (e) {
        this.mensaje = e;
        if (process.client) this.$announcer.set(this.mensaje);
      }
      this.setPaginaCargando(false);
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="sass">
@import 'sass/pages/bienvenido.sass'
</style>
