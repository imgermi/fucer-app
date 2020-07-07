import Mensaje from "~/components/Mensaje.vue";

export default {
  components: {
    Mensaje,
  },
  data() {
    return {
      mensajeTexto: "",
      mensajeTipo: "",
      mensajeTimer: null,
    };
  },
  methods: {
    setMensaje(texto = "", tipo = "info", resetTimeout = 0) {
      this.mensajeTipo = tipo;
      this.mensajeTexto = texto;
      if (this.mensajeTimer) {
        clearTimeout(this.mensajeTimer);
      }
      if (resetTimeout) {
        this.mensajeTimer = setTimeout(() => {
          this.resetMensaje();
        }, resetTimeout);
      }
    },
    resetMensaje() {
      this.mensajeTexto = "";
    },
  },
};
