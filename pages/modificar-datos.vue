<template>
  <div class="modificar-datos">
    <section class="band">
    	<div class="container">
    		<nuxt-link :to="{ name: 'configuracion' }">Volver</nuxt-link>
    		<h1>Modificar datos personales</h1>
    		<form>
    			<fieldset>
	    			<label for="name">Nombre</label>
	    			<input type="text" name="name" id="name" value="Pedro Touzas" placeholder="Ingrese su nombre">
    			</fieldset>
    			<fieldset>
	    			<label for="email">Email</label>
	    			<input type="email" name="email" id="email" value="pedrotouzas@gmail.com" placeholder="Ingrese su email">
    			</fieldset>
    			<fieldset>
	    			<label for="pass">Contraseña</label>
	    			<input type="pass" name="pass" id="pass" value="******" placeholder="Ingrese una contraseña">
    			</fieldset>
    			<button type="submit">Guardar cambios</button>
    		</form>
    	</div>
    </section>
  </div>
</template>

<script>
export default {
	data () {
	  return {
	    title: 'Modificar Datos Personales'
	  }
	},
	head () {
	  return {
	    title: this.title,
	    meta: [
	      { hid: 'description', name: 'description', content: '' }
	    ]
	  }
	}
}
</script>