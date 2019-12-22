<template>
 <div>
	<header class="main__header">
	    <div class="container">
	      <button
	      	class="hamburger"
	      	type="button"
	      	@click="toggleMenu"
        	@keyup.enter="toggleMenu"
	      	aria-label="Menú"
	      	aria-expanded="menuId"
	      	:aria-expanded="menuActivo.toString()"
      		:aria-controls="menuId"
	      >
	        <span class="hamburger-box">
	          <span class="hamburger-inner"></span>
	        </span>
	        <h1>{{ title }}</h1>
	      </button>
	      <nuxt-link :to="{ name: 'buscar' }" class="rounded__btn--medium buscar">Buscar</nuxt-link>
	      <form  @submit.prevent="buscar" class="form__buscar">
					<label for="buscar" class="form__buscar--icon"></label>
	      	<input
	      		v-model="busqueda"
	      		type="text"
	      		name="buscar"
	      		id="buscar"
	      		aria-label="Buscar en FucerNet"
	      		placeholder="Buscar en FucerNet"
	      	/>
	      </form>
	    </div>
	  </header>
	  <nav
	  	:id="menuId"
	  	:hidden="!menuActivo"
	  	:class="'main__nav--container' + (menuActivo ? ' active' : '')"
	  >
	  	 <div
	  	 	class="overlay"
	  	 	@click="closeMenu"
	  	 	@keyup.enter="closeMenu"
	  	 ></div>
		  <div class="main__nav">
	  		<div v-if="$auth.loggedIn" class="user__info">
	  			<span>{{ $auth.user.nombre }}</span>
	  			<small>{{ $auth.user.email }}</small>
	  		</div>
		  	<ul>
		  		<li><nuxt-link :to="{ name: 'inicio' }">Inicio</nuxt-link></li>
		  		<li><nuxt-link :to="{ name: 'buscar' }">Buscar</nuxt-link></li>
		  		<li><a href="https://www.dnrpa.gov.ar/Digesto-Automotor/digesto.php" target="_blank">Digesto</a></li>
		  		<li><nuxt-link :to="{ name: 'favoritas' }">Favoritas</nuxt-link></li>
		  		<li><nuxt-link :to="{ name: 'configuracion' }">Configuración</nuxt-link></li>
		  		<li><nuxt-link :to="{ name: 'ayuda' }">Ayuda</nuxt-link></li>
		  		<li v-if="$auth.loggedIn">
		  			<a @click="logout()" @keyup.enter="logout()">Cerrar Sesión</a>
		  		</li>
		  	</ul>
		  	<a href="" class="logo">
			  	<img src="~/assets/img/logo-fucernet.svg" alt="" width="100">		
		  	</a>
		  </div>
	  </nav>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: ['title'],
  data () {
  	return {
  		menuId: 'menu-principal',
  		busqueda: this.$store.state.buscar.busqueda,
    	menuActivo: false
    }
  },
  computed: {
		...mapState(['pagina'])
  },
  methods: {
  	...mapActions([
      'setPaginaCargando'
    ]),
    ...mapActions('buscar',[
      'buscarNormativas'
    ]),
    async buscar () {
    	this.setPaginaCargando(true)
    	this.$route.query.busqueda = this.busqueda
    	await this.buscarNormativas(this.busqueda)
    	this.setPaginaCargando(false)
    },
    toggleMenu: function () {
      this.menuActivo = !this.menuActivo
    },
    closeMenu: function (event) {
      this.menuActivo = false
    },
    async logout () {
    	await this.$auth.logout()
    	this.$router.push("/")
    }
  }
}
</script>

<style lang="sass">@import 'sass/components/top.sass'</style>