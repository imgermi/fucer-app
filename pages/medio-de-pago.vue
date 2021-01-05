<template>
  <main id="contenido" class="medio-de-pago">
    <SecondaryTop
      ref="pageFocusTarget"
      :nro-paso="nroPaso"
      :titulo-paso="tituloPaso"
    />
    <div class="band">
      <div class="container">
        <div v-if="$auth.loggedIn" class="user">
          <span>Sus datos personales</span>
          <small>{{ $auth.user.nombre }}</small>
          <small>{{ $auth.user.email }}</small>
        </div>
        <p>
          Para acceder a sus 15 días gratis, tendrá que suscribirse al plan
          seleccionado.
        </p>
        <p>
          No se preocupe. Cancele antes del {{ diasCancelar }} y
          <strong>no se le cobrará ningún cargo.</strong>
        </p>
        <nuxt-link
          :to="{ name: 'tarjeta-de-credito' }"
          class="rounded__btn--full green"
        >
          Tarjeta de Crédito
        </nuxt-link>

        <nuxt-link
          :to="{ name: 'debito-automatico' }"
          class="rounded__btn--full green"
        >
          Débito automático
        </nuxt-link>
        <div v-if="$auth.loggedIn">
          <span class="signup__agregados"
            >¿Quiere iniciar con otra cuenta?
            <a @click="logout()" @keyup.enter="logout()">Cerrar Sesión</a></span
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";
import addDays from "date-fns/addDays";
import format from "date-fns/format";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
  },
  data() {
    return {
      title: "Paso 3 - Medio de Pago",
      nroPaso: "3",
      tituloPaso: "Seleccione su medio de pago",
      diasCancelar: format(addDays(new Date(), 15), "dd/MM/yyyy"),
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
  methods: {
    async logout() {
      if (
        !window.navigator.onLine &&
        !confirm(
          "Está sin conexión a internet y no va a poder volver a acceder hasta que vuelva la conexión ¿quiere cerrar la sesión igualmente?"
        )
      )
        return;
      await this.$auth.logout();
      this.$router.push("/");
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
@import 'sass/pages/medio-de-pago.sass'
</style>
