<template>
  <div class="bienvenido">
    <SecondaryTop/>
    <main class="band">
      <div class="container">
        <h1 ref="pageFocusTarget">Contenido no disponible</h1>
        <p>Lo sentimos, este contenido solo está disponible para los usuarios premium.</p>
        <nuxt-link :to="{ name: 'modificar-plan' }" class="rounded__btn--full white">Actualizar plan</nuxt-link>
      </div>
    </main>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
  components: {
    SecondaryTop
  },
  data() {
    return {
      title: 'Contenido no disponible'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
    })
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ],
      bodyAttrs: {
          class: 'bg__gradient'
      }
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/bienvenido.sass'</style>