<template>
 <div>
	  <header class="main__header">
	    <div class="container">
	      <button class="hamburger" type="button" v-on:click="openMenu">
	        <span class="hamburger-box">
	          <span class="hamburger-inner"></span>
	        </span>
	        <label>{{ title }}</label>
	      </button>
	      <nuxt-link :to="{ name: 'buscar' }" class="rounded__btn--full buscar">Buscar</nuxt-link>
	      <form  @submit.prevent="buscar" class="form__buscar">
			<label for="buscar" class="form__buscar--icon"></label>
	      	<input v-model="busqueda" type="text" name="buscar" id="buscar" placeholder="Buscar en Fucer">
	      </form>
	    </div>
	  </header>
	  <div :class="'main__nav--container' + (menuActivo ? ' active' : '')">
	  	 <div class="overlay" v-on:click="closeMenu"></div>
		  <nav class="main__nav">
		  	<div class="user__info">
		  		<span>Pedro Touzas</span>
		  		<small>pedrotouzas@gmail.com</small>
		  	</div>
		  	<ul>
		  		<li><nuxt-link :to="{ name: 'inicio' }">Inicio</nuxt-link></li>
		  		<li><nuxt-link :to="{ name: 'buscar' }">Buscar</nuxt-link></li>
		  		<li><nuxt-link :to="{ name: 'favoritas' }">Favoritas</nuxt-link></li>
		  		<li><nuxt-link :to="{ name: 'configuracion' }">Configuración</nuxt-link></li>
		  		<li><nuxt-link :to="{ name: 'index' }" exact>Cerrar Sesión</nuxt-link></li>
		  	</ul>
		  	<img src="~/assets/img/logo-blanco-y-negro.svg" class="logo">
		  </nav>
	  </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  props: ['title'],
  data () {
  	return {
  		busqueda: '',
    	menuActivo: false
    }
  },
  methods: {
  	...mapActions([
      'cargando'
    ]),
    ...mapActions('buscar',[
      'buscarNormativas'
    ]),
    async buscar () {
    	this.cargando(true)
    	this.$route.query.busqueda = this.busqueda
    	await this.buscarNormativas(this.busqueda)
    	this.cargando(false)
    },
    openMenu: function () {
      this.menuActivo = !this.menuActivo
    },
    closeMenu: function (event) {
      this.menuActivo = false
    }
  }
}
</script>

<style lang="sass">@import 'sass/components/top.sass'</style>
