<template>
  <div class="inicio">
    <Alerta />
    <Top :title="title" />
    <main id="contenido">
      <section class="carousel__container bg__gradient">
        <div class="container">
          <h2 ref="pageFocusTarget">Novedades</h2>
          <div>
            <div v-if="!cargandoCarousel">
              <Component
                :is="carousel"
                :autoplay="true"
                :per-page="1"
                :autoplay-timeout="5000"
              >
                <Component
                  :is="slide"
                  v-for="normativa in destacadas"
                  :key="normativa.id + '-destacada'"
                >
                  <small
                    v-if="normativa.categoria"
                    :class="`tag ${normativa.categoria_uri}`"
                    >{{ normativa.categoria }}</small
                  >
                  <small
                    ><nuxt-link :to="normativa.url">{{
                      normativa.fecha | fecha("dd/MM/yyyy")
                    }}</nuxt-link></small
                  >
                  <h4>
                    <nuxt-link :to="normativa.url">
                      {{ normativa.titulo }}
                    </nuxt-link>
                  </h4>
                  <span
                    ><nuxt-link :to="normativa.url">{{
                      normativa.bajada
                    }}</nuxt-link></span
                  >
                  <nuxt-link :to="normativa.url" class="rounded__btn--medium">
                    Ver más
                  </nuxt-link>
                </Component>
              </Component>
            </div>
            <div v-else>Cargando...</div>
          </div>
        </div>
      </section>
      <section class="mensaje-bienvenida">
        <p>
          Además del Digesto de Normas Técnico Registrales, encontrará el texto
          completo de sus principales Disposiciones complementarias y Circulares
          aclaratorias, con un breve resumen del contenido de las mismas, y
          diversos artículos de doctrina y jurisprudencia. A todo ello podrá
          acceder mediante diferentes motores de búsqueda.
        </p>
        <small
          >Dr. Javier Antonio Cornejo (Director de FucerNet) y equipo de
          colaboradores</small
        >
      </section>
      <br />
      <section class="band">
        <div class="container">
          <h1>Enlaces Útiles</h1>
          <div class="normativas-container">
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="https://www.dnrpa.gov.ar/Digesto-Automotor/digesto.php"
                    target="_blank"
                    >Digesto de Normas Técnico Registrales</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="https://www.argentina.gob.ar/sites/default/files/regimen_juridico_del_automotor.pdf"
                    target="_blank"
                    >Régimen Jurídico del Automotor</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="http://www.saij.gob.ar/335-nacional-decreto-reglamentario-decreto-ley-6582-58-sobre-regimen-juridico-registrado-propiedad-automotor-dn19880000335-1988-03-03/123456789-0abc-533-0000-8891soterced"
                    target="_blank"
                    >Decreto 335/88</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="http://www.dnrpa.gov.ar/rinof/rinof.htm"
                    target="_blank"
                    >RINOF - Reglamento Interno de Normas Orgánico
                    Funcionales</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="http://www.dnrpa.gov.ar/portal_dnrpa/regimen_juridico/urinof2.php"
                    target="_blank"
                    >RINOF - Reglamento Interno de Normas Orgánico Funcionales y
                    Disposiciones Modificatorias</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/44079/norma.htm"
                    target="_blank"
                    >Decreto Ley N° 15.348/46 - Ley de Prenda con Registro</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="http://www.infojus.gob.ar/644-nacional-registros-propiedad-automotor-creditos-prendarios-dn19891000644-1989-05-18/123456789-0abc-446-0001-9891soterced"
                    target="_blank"
                    >Decreto 644/89</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/norma.htm"
                    target="_blank"
                    >Código Civil y Comercial de la Nación</a
                  >
                </h4>
                <!-- <p><a href="">bajada</a></p> -->
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
            <article class="normativa-module">
              <div class="main">
                <h4>
                  <a
                    href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/70000-74999/74456/texact.htm"
                    target="_blank"
                    >Resolución MJ y DH Nº 314/2002</a
                  >
                </h4>
                <p>
                  <a href=""
                    >Resolución de aranceles vigente a partir del 01/06/2019,
                    incluye Resol MJ y DH Nº 323/2019</a
                  >
                </p>
              </div>
              <div class="extra">
                <small><a>Enlace externo</a></small>
              </div>
            </article>
          </div>
          <!--         <div v-if="!cargandoNormativas" class="normativas-container">
            <template v-if="recientes.length > 0">
              <ModuloNormativa
                v-for="normativa in recientes"
                :key="normativa.id + '-ultima'"
                :id="normativa.id"
                :titulo="normativa.titulo"
                :bajada="normativa.bajada"
                :categoria="normativa.categoria"
                :categoriaUri="normativa.categoria_uri"
                :fecha="normativa.fecha"
                :url="normativa.url"
              />
              <cargarMas/>
            </template>
            <template v-else>
              No hay normativas disponibles para el plan básico, lo sentimos.
            </template>
          </div>
          <div v-else>
            Cargando...
          </div> -->
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Top from "~/components/Top.vue";
import Alerta from "~/components/Alerta.vue";
//import ModuloNormativa from '~/components/ModuloNormativa.vue'
//import cargarMas from '~/components/cargarMas.vue'
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "app",
  components: {
    Top,
    Alerta,
    //cargarMas,
    //ModuloNormativa,
  },
  middleware: "premium",
  data() {
    return {
      title: "Inicio",
      cargandoCarousel: true,
      cargandoNormativas: true,
      carousel: null,
      slide: null,
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
  computed: {
    ...mapGetters("normativas", ["destacadas", "recientes"]),
  },
  async created() {
    if (this.destacadas.length < 1) {
      await this.getDestacadas();
    }
    if (process.client) {
      const { Carousel, Slide } = await import(
        /* webpackChunkName: "vue-carousel" */ "vue-carousel"
      );
      this.carousel = Carousel;
      this.slide = Slide;
      this.cargandoCarousel = false;
    }
    if (this.recientes.length < 1) {
      // await this.getRecientes(1)
    }
    this.cargandoNormativas = false;
  },
  methods: {
    ...mapActions("normativas", ["getDestacadas", "getRecientes"]),
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="sass">
@import 'sass/components/vue-carousel.sass'
@import 'sass/pages/inicio.sass'
@import 'sass/components/modulo-normativa.sass'
</style>
