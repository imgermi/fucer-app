<template>
  <div class="inicio">
    <Alerta />
  	<Top :title="title" />
    <section class="carousel__container bg__gradient">
      <div class="container">
        <h2>Novedades</h2>
        <no-ssr>
          <div>
            <div v-if="!cargandoCarousel">
              <carousel :autoplay="true" :perPage="1" :autoplayTimeout="5000">
                <slide v-for="normativa in normativasDestacadas" :key="normativa.id + '-destacada'">
                  <small><nuxt-link :to="normativa.url">{{ normativa.fecha | fecha('DD/MM/YY')}}</nuxt-link></small>
                  <h4><nuxt-link :to="normativa.url">{{ normativa.titulo }}</nuxt-link></h4>
                  <span><nuxt-link :to="normativa.url">{{ normativa.bajada }}</nuxt-link></span>
                  <nuxt-link :to="normativa.url" class="rounded__btn--medium">Ver más</nuxt-link>
                </slide>
              </carousel>
            </div>
            <div v-else>
              Cargando...
            </div>
          </div>
        </no-ssr>
      </div>
    </section>
    <section class="mensaje-bienvenida">
      <p>Además del Digesto de Normas Técnico Registrales, encontrará el texto completo de sus principales Disposiciones complementarias y Circulares aclaratorias, con un breve resumen del contenido de las mismas, a las que podrá acceder mediante diferentes motores de búsqueda.</p>
      <small>Dr. Javier Antonio Cornejo (Director de LEGISTER) y equipo de colaboradores</small>
    </section>
    <section class="band">
      <div class="container">
        <h1>Enlaces Útiles</h1>
        <div class="normativas-container">
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.dnrpa.gov.ar/digesto-web2/digesto.php" target="_blank">Digesto de Normas Técnico Registrales</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.dnrpa.gov.ar/portal_dnrpa/regimen_juridico/informacion/rja.pdf" target="_blank">Régimen Jurídico del Automotor</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.saij.gob.ar/335-nacional-decreto-reglamentario-decreto-ley-6582-58-sobre-regimen-juridico-registrado-propiedad-automotor-dn19880000335-1988-03-03/123456789-0abc-533-0000-8891soterced" target="_blank">Decreto 335/88</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.dnrpa.gov.ar/rinof/rinof.htm" target="_blank">RINOF - Reglamento Interno de Normas Orgánico Funcionales</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.dnrpa.gov.ar/portal_dnrpa/regimen_juridico/urinof2.php" target="_blank">RINOF - Reglamento Interno de Normas Orgánico Funcionales y Disposiciones Modificatorias</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.dnrpa.gov.ar/portal_dnrpa/regimen_juridico/informacion/decprenda.pdf" target="_blank">Decreto  Ley N° 15.348/46 - Ley de Prenda con Registro</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.infojus.gob.ar/644-nacional-registros-propiedad-automotor-creditos-prendarios-dn19891000644-1989-05-18/123456789-0abc-446-0001-9891soterced" target="_blank">Decreto 644/89</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/norma.htm" target="_blank">Código Civil y Comercial de la Nación</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://www.aaerpa.com/catalogo/" target="_blank">Revistas Ámbito Registral de la AAERPA: buscador por autor, publicacion y tema</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4><a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/70000-74999/74456/texact.htm" target="_blank">Resolución MJ y DH Nº 314/2002</a></h4>
              <p><a href="">Resolución de aranceles vigente a partir del 01/06/2019, incluye Resol MJ y DH Nº 323/2019</a></p>
            </div>
            <div class="extra">
              <small><a>Enlace externo</a></small>
            </div>
          </article>
        </div>
<!--         <div v-if="!cargandoNormativas" class="normativas-container">
          <template v-if="normativasMasNuevas.length > 0">
            <ModuloNormativa
              v-for="normativa in normativasMasNuevas"
              :key="normativa.id + '-ultima'"
              :id="normativa.id"
              :titulo="normativa.titulo"
              :bajada="normativa.bajada"
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
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
//import ModuloNormativa from '~/components/ModuloNormativa.vue'
//import cargarMas from '~/components/cargarMas.vue'
import { Carousel, Slide } from 'vue-carousel';
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'app',
  components: {
    Top,
    Alerta,
    //cargarMas,
    //ModuloNormativa,
    Carousel,
    Slide
  },
  middleware: 'premium',
  data () {
    return {
      title: 'Inicio',
      cargandoCarousel: true,
      cargandoNormativas: true
    }
  },
  async created () {
    if (this.normativasDestacadas.length < 1) {
      await this.getNormativasDestacadas()
    }
    this.cargandoCarousel = false

    if (this.normativasMasNuevas.length < 1) {
      await this.getNormativasMasNuevas(1)
    }
    this.cargandoNormativas = false
  },
  methods: {
    ...mapActions('inicio',[
      'getNormativasDestacadas',
      'getNormativasMasNuevas'
    ])
  },
  computed: {
    ...mapState('inicio',[
      'normativasDestacadas',
      'normativasMasNuevas'
    ])
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
};

</script>

<style lang="sass">
  @import 'sass/components/vue-carousel.sass'
  @import 'sass/pages/inicio.sass'
  @import 'sass/components/modulo-normativa.sass'
</style>