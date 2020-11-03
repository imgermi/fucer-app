<template>
  <main id="contenido" class="registro">
    <SecondaryTop
      ref="pageFocusTarget"
      :nro-paso="nroPaso"
      :titulo-paso="tituloPaso"
    />
    <div class="band form__container">
      <div class="container">
        <mensaje
          :tipo="mensajeTipo"
          :texto="mensajeTexto"
          data-cy="error-form"
        />

        <form class="main__form" @submit.prevent="register">
          <fieldset>
            <label for="nombre">¿Cúal es su nombre?</label>
            <input
              id="nombre"
              ref="nombre"
              v-model="nombre"
              v-validate="'required'"
              type="text"
              name="nombre"
              data-cy="nombre"
              :class="{ error: errors.has('nombre') }"
              placeholder="Nombre completo"
            />
            <span v-show="errors.has('nombre')" class="error">
              {{ errors.first("nombre") }}
            </span>
          </fieldset>

          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input
              id="email"
              v-model="email"
              v-validate="'required|email'"
              type="email"
              name="email"
              data-cy="email"
              :class="{ error: errors.has('email') }"
              placeholder="Email"
            />
            <span v-show="errors.has('email')" class="error">
              {{ errors.first("email") }}
            </span>
          </fieldset>

          <fieldset>
            <label for="password">Ingrese una contraseña</label>
            <input
              id="password"
              ref="password"
              v-model="password"
              v-validate="'required'"
              type="password"
              name="password"
              data-cy="password"
              data-vv-as="contraseña"
              :class="{ error: errors.has('password') }"
              placeholder="Contraseña"
            />
            <span v-show="errors.has('password')" class="error">
              {{ errors.first("password") }}
            </span>
          </fieldset>

          <fieldset>
            <label for="password-repeat">Repita la contraseña</label>
            <input
              id="password-repeat"
              ref="password-repeat"
              v-model="passwordRepeat"
              v-validate="'required|confirmed:password'"
              type="password"
              name="passwordRepeat"
              data-cy="password-repeat"
              data-vv-as="contraseña repetida"
              :class="{ error: errors.has('password') }"
              placeholder="Contraseña"
            />
            <span v-show="errors.has('passwordRepeat')" class="error">
              {{ errors.first("passwordRepeat") }}
            </span>
          </fieldset>

          <button
            type="submit"
            data-cy="submit"
            class="rounded__btn--full green"
          >
            {{ txtBtnSubmit }}
          </button>
        </form>
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
      nombre: "",
      email: "",
      password: "",
      passwordRepeat: "",
      title: "Registrarse",
      nroPaso: "2",
      tituloPaso: "Cree su cuenta",
    };
  },
  computed: {
    ...mapState(["pagina"]),
    txtBtnSubmit() {
      return this.pagina.cargando ? "Cargando..." : "Siguiente";
    },
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
  mounted() {
    this.$refs.nombre.focus();
  },
  methods: {
    ...mapActions(["setPaginaCargando"]),
    async register() {
      let valida = await this.$validator.validateAll();
      if (!valida) {
        return;
      }
      this.setPaginaCargando(true);
      try {
        await this.$axios.$post("auth/register", {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "confirme-su-email" });
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
