<template>
  <div class="buscar">
    <Alerta />
  	<Top ref="pageFocusTarget" />
    <main id="contenido" class="band">
      <div
        class="container"
        id="resultado-busqueda"
        ref="resultadoBusqueda"
        role="region"
        aria-live="polite"
        tabindex="-1"
      >
        <div v-if="!pagina.cargando">
          <p
            v-if="!$route.query.busqueda"
            class="center search-alert"
          >
            Busque por <br> nombre, palabra <br> o año
          </p>
          <div v-else>
            <div v-if="normativas.length > 0">
              <ModuloNormativa
                v-for="normativa in normativas"
                :key="normativa.id + '-ultima'"
                :id="normativa.id"
                :titulo="normativa.titulo"
                :categoria="normativa.categoria"
                :categoriaUri="normativa.categoria_uri"
                :bajada="normativa.bajada"
                :fecha="normativa.fecha"
                :url="normativa.url"
              />
            </div>
            <div v-else>
              <p class="center search-alert">No se <br> encontraron <br> resultados</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="center">
            Cargando...
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import ModuloNormativa from '~/components/ModuloNormativa.vue'
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'app',
  components: {
    Top,
    Alerta,
    ModuloNormativa
  },
  middleware: 'premium',
  data () {
    return {
      title: 'Buscar'
    }
  },
  computed: {
    ...mapState([
      'pagina'
    ]),
    ...mapState('buscar',[
      'normativas',
      {busqueda: 'busquedaGuardada'}
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // Sincroniza URI con STORE
      if (!to.query.busqueda && vm.$store.state.buscar.busqueda) {
        vm.$router.replace({query: {busqueda: vm.$store.state.buscar.busqueda}})
        return
      }

      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      )
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget.$el)
    })
  },
  watch:{
		'$route.query.busqueda': {
			handler: async function(newBusqueda) {
				if (newBusqueda && newBusqueda !== this.busquedaGuardada) {
					await this.buscar(newBusqueda);
				}
			},
			immediate: true
  	},
    'pagina.cargando': {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.$refs.resultadoBusqueda.focus()
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'setPaginaError',
      'setPaginaCargando'
    ]),
    ...mapActions('buscar',[
      'buscarNormativas'
    ]),
    async buscar (busqueda) {
    	this.setPaginaCargando(true)
    	this.setPaginaError(false)
    	try {
				await this.buscarNormativas(busqueda)
    	} catch(e) {
    		this.setPaginaError(e)
    	}
    	this.setPaginaCargando(false)
    },
  },
  head () {
    return {
      title: this.title,
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/buscar.sass'</style>