<template>
  <div class="normativa">
    <Alerta />
    <nav id="menu-principal" class="goBack__header">
      <div class="container">
        <a
          href="#"
          class="volver-btn"
          @click.prevent="volver"
          @keyup.enter.prevent="volver"
          ><img src="~/assets/img/arrow-left.svg" alt="" class="arrow-left" />
          <span>Volver</span>
        </a>
        <FavoriteStar
          :aria-label="(enFavoritos ? 'Quitar de' : 'Agregar a') + ' favoritos'"
          tabindex="0"
          :activa="enFavoritos"
          @click.native="toggleFavorito(normativa.id)"
          @keyup.native.enter="toggleFavorito(normativa.id)"
        />
      </div>
    </nav>
    <main id="contenido">
      <section class="top">
        <div class="container">
          <h1 ref="pageFocusTarget">
            <small
              v-if="normativa.categoria"
              :class="`tag normativa__tag ${normativa.categoriaUri}`"
              >{{ normativa.categoria }}</small
            >
            <div>{{ normativa.titulo }}</div>
          </h1>
          <h2>{{ normativa.bajada }}</h2>
          <time
            v-if="normativa.fecha"
            :datetime="normativa.fecha | fecha('yyyy-MM-dd')"
            >{{ normativa.fecha | fecha("dd/MM/yyyy") }}</time
          >
        </div>
      </section>
      <section class="band cuerpo">
        <div class="container">
          <div v-if="!pagina.cargando">
            <h6>Introducción</h6>
            <span v-if="normativa.autor">Por {{ normativa.autor }}</span>
            <template v-if="normativa.intro">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="normativa.intro" />
            </template>
            <a
              ref="btnLeer"
              href="#contenido-normativa"
              class="rounded__btn--medium green"
              @click.prevent="leerNormativa"
              @keyup.enter.prevent="leerNormativa"
              >Leer</a
            >
            <div
              id="contenido-normativa"
              :class="'cuerpo__principal' + (mostrarCuerpo ? ' active' : '')"
            >
              <focus-trap
                :active="mostrarCuerpo"
                :initial-focus="() => $refs.btnCerrar"
                :return-focus-on-deactivate="false"
              >
                <div>
                  <button
                    ref="btnCerrar"
                    class="cerrar"
                    @click="cerrarNormativa"
                    @keyup.enter="cerrarNormativa"
                  >
                    Cerrar
                  </button>
                  <h1>{{ normativa.titulo }}</h1>
                  <h2>{{ normativa.bajada }}</h2>
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div v-html="normativa.cuerpo" />
                </div>
              </focus-trap>
            </div>
          </div>
          <div v-else>Cargando...</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Alerta from "~/components/Alerta.vue";
import FavoriteStar from "~/components/FavoriteStar.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Alerta,
    FavoriteStar,
  },
  middleware: "premium",
  async fetch() {
    if (!this.$route.params.id) return;
    await this.fetchNormativa();
  },
  data() {
    return {
      fromRoute: null,
      mostrarCuerpo: false,
      normativa: {
        id: 0,
        titulo: "",
        bajada: "",
        autor: "",
        categoria: "",
        categoriaUri: "",
        fecha: "",
        intro: "",
        cuerpo: "",
        url: "",
      },
    };
  },
  computed: {
    ...mapState(["pagina"]),
    enFavoritos() {
      return this.$store.getters["normativas/enFavoritos"](this.normativa.id);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!process.client) return;
      vm.fromRoute = from;
      if (to.name !== from.name) {
        vm.$utils.moveFocus(vm.$refs.pageFocusTarget);
      }
    });
  },
  async created() {
    if (!process.client) return;
    await this.fetchNormativa();
    this.$announcer.set(
      `${this.normativa.titulo} ${this.$announcer.options.complementRoute}`,
      this.$announcer.options.politeness
    );
  },
  methods: {
    async fetchNormativa() {
      try {
        await this.$store.dispatch("normativas/getById", this.$route.params.id);
        this.normativa = this.$store.state.normativas.byId[
          this.$route.params.id
        ];
      } catch (e) {
        console.log(e);
        if (process.client && !window.navigator.onLine) {
          const cache = await caches.open("fucer-api");
          const match = cache.match(
            `/api/normativas/id/${this.$route.params.id}`
          );
          if (match) {
            this.normativa = match.json();
          }
          this.$router.push({ name: "offline" });
        } else {
          this.$router.push({ name: "404" });
        }
      }
    },
    leerNormativa() {
      this.mostrarCuerpo = true;
      if (!this.$route.hash) {
        this.$router.replace({ hash: "#contenido-normativa" });
      }
    },
    cerrarNormativa() {
      this.mostrarCuerpo = false;
      if (this.$route.hash) {
        this.$router.replace({ hash: "" });
      }
      this.$refs.btnLeer.focus();
    },
    volver() {
      if (!this.fromRoute.name) {
        this.$router.push({
          name: "inicio",
        });
      } else {
        this.$router.back();
      }
    },
    ...mapActions("normativas", ["toggleFavorito"]),
  },
  head() {
    return {
      title: this.normativa.titulo,
    };
  },
};
</script>

<style lang="sass">
@import 'sass/pages/normativa.sass'
</style>
