<template>
	<div>
	  <Alerta />
		<Top
			:title="title"
		/>
		<main id="contenido" class="band">
			<div class="container">
        <div class="normativas-container">                  
          <article class="normativa-module">
            <div class="main">
              <h4 ref="pageFocusTarget"><a href="https://net.fucer.com.ar/cms/resources/files/FucerNet-Normas2020.pdf" target="_blank">Resumen de Normas</a></h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Año 2020</a></small>
            </div>
          </article>
        </div>
			</div>
		</main>
	</div>
</template>

<script>
	import Top from '~/components/Top.vue'
	import Alerta from '~/components/Alerta.vue'

	export default {
    layout: 'app',
    auth: false,
		components: {
		  Top,
		  Alerta
		},
		data () {
		  return {
		    title: 'Separata Anual de Normas'
		  }
		},

		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      )
				vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
			})
		},

		head () {
		  return {
		    title: this.title,
		  }
		},
	};
</script>