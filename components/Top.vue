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
	      <button class="buscar"><nuxt-link to="/buscar" class="rounded__btn--full">Buscar</nuxt-link></button>
	      <form class="form__buscar">
			<label for="buscar" class="form__buscar--icon"></label>
	      	<input type="text" name="buscar" id="buscar" placeholder="Buscar en Fucer">
	      </form>
	    </div>
	  </header>
	  <div class="main__nav--container">
	  	 <div class="overlay" v-on:click="closeMenu"></div>
		  <nav class="main__nav">
		  	<div class="user__info">
		  		<span>Pedro Touzas</span>
		  		<small>pedrotouzas@gmail.com</small>
		  	</div>
		  	<ul>
		  		<li><nuxt-link to="/inicio">Inicio</nuxt-link></li>
		  		<li><nuxt-link to="/buscar">Buscar</nuxt-link></li>
		  		<li><nuxt-link to="/favoritas">Favoritas</nuxt-link></li>
		  		<li><nuxt-link to="/configuracion">Configuración</nuxt-link></li>
		  		<li><nuxt-link to="/" exact>Cerrar Sesión</nuxt-link></li>
		  	</ul>
		  	<img src="~/assets/img/logo-blanco-y-negro.svg" class="logo">
		  </nav>
	  </div>
  </div>
</template>


<script>

export default {
  props: ['title'],
  methods: {
    openMenu: function (event) {
      document.querySelector('.main__nav--container').classList.toggle('active');
    },
    closeMenu: function (event) {
      document.querySelector('.main__nav--container').classList.remove('active');
    }
  }
}
</script>