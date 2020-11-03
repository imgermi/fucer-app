<template>
  <div class="modificar-datos">
    <main id="contenido" class="band">
      <div class="container">
        <nuxt-link :to="{ name: 'configuracion' }">
          <img
            src="~/assets/img/arrow-left.svg"
            alt="Volver"
            class="arrow-left"
          />
        </nuxt-link>
        <h2 ref="pageFocusTarget">Modificar datos personales</h2>

        <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

        <form class="main__form" @submit.prevent="actualizarDatos">
          <fieldset>
            <label for="nombre">Nombre</label>
            <input id="nombre" v-model="nombre" type="text" name="nombre" />
          </fieldset>
          <fieldset>
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" name="email" />
          </fieldset>
          <fieldset>
            <label for="password">Contraseña</label>
            <input
              id="pass"
              v-model="password"
              type="password"
              name="pass"
              placeholder="********"
            />
          </fieldset>
          <button type="submit" class="rounded__btn--medium">
            {{ pagina.cargando ? "Cargando.." : "Guardar cambios" }}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import mensaje from "~/mixins/mensaje";

export default {
  mixins: [mensaje],
  data() {
    return {
      title: "Modificar Datos Personales",
      nombre: this.$auth.user.nombre,
      email: this.$auth.user.email,
      password: "",
    };
  },
  computed: {
    ...mapState(["pagina"]),
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
    async actualizarDatos() {
      this.setPaginaCargando(true);
      this.resetMensaje();
      try {
        let datos = {
          nombre: this.nombre,
          email: this.email,
        };
        if (this.password) {
          datos.password = this.password;
        }
        let { data } = await this.$axios.$post("auth/updateUser", datos);

        // Actualizo el token de seguridad
        this.$auth.setToken("local", "Bearer " + data.token);
        await this.$auth.fetchUser();

        this.setMensaje("Los datos fueron actualizados", "info", 3000);
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
@import 'sass/pages/modificar-datos.sass'
</style>
