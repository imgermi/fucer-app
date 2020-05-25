<template>
  <div class="index">
    <div class="columns">
      <div class="columns__text">
        <header>
          <div class="container">
            <nuxt-link :to="{ name: 'index' }" class="logo logotop">
              <img src="~/assets/img/logo-fucernet.svg" alt="">
            </nuxt-link>
          </div>
        </header>
        <main id="contenido" class="band">
          <div class="container">
            <h1 class="intro__heading" ref="pageFocusTarget">Consulte el <br> contenido de la <br> normativa aplicable a la <br> registración de automotores</h1>
            <nuxt-link :to="{ name: 'seleccione-su-plan' }" class="rounded__btn--full green">Iniciar 15 días gratis</nuxt-link>
            <p class="signup__agregados"><nuxt-link :to="{ name: 'login' }">¿Ya tiene una cuenta? <b>Ingrese aquí</b></nuxt-link></p>
          </div>
        </main>
      </div>
      <div class="columns__img">
          
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'signup',
  auth: false,
  data () {
    return {
      title: 'Index',
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
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
}
</script>

<style lang="sass">@import 'sass/pages/index.sass'</style>