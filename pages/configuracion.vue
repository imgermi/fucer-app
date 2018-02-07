<template>
  <div class="configuracion">
  	<Top :title="title" />
    <section class="band datos">
      <div class="container">
        <div class="datos__personales">
          <h2>Datos personales</h2>
          <div class="datos__personales--dato">
            <p>Nombre</p>
            <span>Pedro Touzas</span>
          </div>
          <div class="datos__personales--dato">
            <p>Email</p>
            <span>pedrotouzas@gmail.com</span>
          </div>
          <div class="datos__personales--dato">
            <p>Contraseña</p>
            <span>*******</span>
          </div>
          <button class="rounded__btn--medium"><nuxt-link :to="{ name: 'modificar-datos' }">Modificar</nuxt-link></button>
        </div>
        <div class="datos__plan">
          <h2>Mi plan</h2>
          <div class="datos__plan--dato">
            <span>Plan básico</span>
            <small>$0</small>
          </div>
          <button class="rounded__btn--medium"><nuxt-link :to="{ name: 'modificar-plan' }">Modificar plan</nuxt-link></button>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'

export default {
  components: {
    Top
  },
  data () {
    return {
      title: 'Configuración'
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

<style lang="sass">@import 'sass/pages/configuracion.sass'</style>