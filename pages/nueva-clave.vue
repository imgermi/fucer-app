<template>
  <div class="restaurar-clave">
    <SecondaryTop />
    <main id="contenido" class="band">
      <div class="container form__container">
        <h1 ref="pageFocusTarget" class="intro__heading">Nueva clave</h1>

        <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

        <form class="main__form" @submit.prevent="resetPassword">
          <fieldset>
            <label for="password">Ingrese su nueva clave</label>
            <input
              id="password"
              ref="password"
              v-model="password"
              v-validate="'required'"
              type="password"
              name="password"
              data-vv-as="nueva clave"
              :class="{ error: errors.has('password') }"
            />
            <span v-show="errors.has('password')" class="error">
              {{ errors.first("password") }}
            </span>
          </fieldset>
          <fieldset>
            <label for="passwordConfirm">Confirme su nueva clave</label>
            <input
              id="passwordConfirm"
              ref="passwordConfirm"
              v-model="passwordConfirm"
              v-validate="'required|confirmed:password'"
              type="password"
              name="passwordConfirm"
              data-vv-as="confirmación de clave"
              :class="{ error: errors.has('passwordConfirm') }"
            />
            <span v-show="errors.has('passwordConfirm')" class="error">
              {{ errors.first("passwordConfirm") }}
            </span>
          </fieldset>
          <button type="submit" class="rounded__btn--full green">
            {{ txtBtnSubmit }}
          </button>
        </form>

        <br />
        <p class="signup__agregados">
          ¿Tiene problemas?
          <nuxt-link :to="{ name: 'restaurar-clave' }">
            Solicite nuevamente un cambio de clave </nuxt-link
          >.
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mensaje from "~/mixins/mensaje";
import SecondaryTop from "~/components/SecondaryTop.vue";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
  },
  mixins: [mensaje],
  auth: false,
  data() {
    return {
      password: "",
      passwordConfirm: "",
      title: "Nueva clave",
    };
  },
  computed: {
    ...mapState(["pagina"]),
    txtBtnSubmit() {
      return this.pagina.cargando ? "Cargando..." : "Guardar";
    },
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
  methods: {
    ...mapActions(["setPaginaCargando"]),
    async resetPassword() {
      let valida = await this.$validator.validateAll();
      if (!valida) {
        return;
      }
      this.setPaginaCargando(true);
      try {
        await this.$axios.$post("auth/reset-password", {
          token: this.$route.params.token,
          password: this.password,
        });
        this.setMensaje(
          "Hemos actualizado su clave. Por favor inicie sesión con sus nuevas credenciales.",
          "info"
        );
        setTimeout(() => this.$router.push({ name: "inicio" }), 4000);
      } catch (e) {
        this.setMensaje(e, "error");
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
