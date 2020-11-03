<template>
  <main id="contenido" class="login">
    <SecondaryTop :titulo-paso="tituloPaso" />
    <div class="band form__container">
      <div class="container">
        <mensaje
          :tipo="mensajeTipo"
          :texto="mensajeTexto"
          data-cy="error-form"
        />

        <form class="main__form" @submit.prevent="login">
          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input
              id="email"
              ref="pageFocusTarget"
              v-model="email"
              v-validate="'required'"
              type="email"
              name="email"
              data-cy="email"
              :class="{ error: errors.has('email') }"
              placeholder="Email"
            />
            <span
              v-show="errors.has('email')"
              class="error"
              data-cy="error-email"
            >
              {{ errors.first("email") }}
            </span>
          </fieldset>
          <fieldset>
            <label for="password">¿Cúal es su contraseña?</label>
            <input
              id="password"
              v-model="password"
              v-validate="'required'"
              type="password"
              name="password"
              data-cy="password"
              :class="{ error: errors.has('password') }"
              data-vv-as="contraseña"
              placeholder="Contraseña"
            />
            <span
              v-show="errors.has('password')"
              class="error"
              data-cy="error-password"
            >
              {{ errors.first("password") }}
            </span>
          </fieldset>
          <button
            type="submit"
            data-cy="submit"
            class="rounded__btn--full green"
          >
            {{ txtBtnIngresar }}
          </button>
        </form>
        <br />
        <p class="signup__agregados">
          <nuxt-link :to="{ name: 'restaurar-clave' }">
            ¿Olvidó su clave? <b>Haga click aquí</b> </nuxt-link
          >.
        </p>
        <p class="signup__agregados">
          <nuxt-link :to="{ name: 'ingrese-su-email' }">
            ¿Registró su usuario pero no recibió el mail para activarlo?
            <b>Envíelo de nuevo</b> </nuxt-link
          >.
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";
import { mapState, mapActions } from "vuex";
import mensaje from "~/mixins/mensaje";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
  },
  mixins: [mensaje],
  auth: false,
  middleware: "guest",
  data() {
    return {
      email: "",
      password: "",
      title: "Ingresar",
      tituloPaso: "Ingrese a FucerNet con su email",
    };
  },
  computed: {
    ...mapState(["pagina"]),
    txtBtnIngresar() {
      return this.pagina.cargando ? "Cargando..." : "Ingresar";
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
  mounted() {
    this.$refs.pageFocusTarget.focus();
  },
  methods: {
    ...mapActions(["setPaginaCargando"]),
    async login() {
      let valida = await this.$validator.validateAll();
      if (!valida) {
        return;
      }
      this.setPaginaCargando(true);
      this.resetMensaje();
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.email,
            password: this.password,
          },
        });
        const redirectTo = this.$auth.user.suscripcion.premium
          ? "inicio"
          : "medio-de-pago";
        this.$router.push({ name: redirectTo });
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

<style lang="sass">
@import 'sass/pages/login.sass'
</style>
