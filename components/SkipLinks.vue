<template>
  <ul class="skip-links">
    <li>
      <a
        href="#menu-principal"
        class="screen-reader-shortcut"
        @click="navegarAMenu"
        @keyup.enter="navegarAMenu"
      >
        Saltar a navegación principal
      </a>
    </li>
    <li>
      <nuxt-link :to="{ hash: '#contenido' }" class="screen-reader-shortcut">
        Saltar a contenido principal
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    navegarAMenu() {
      // Para que el menú se abra y el foco se desplace automáticamente
      // el menú tiene que estar visible antes de producirse la navegación.
      this.$store.dispatch("setMenuActivo", true);
    },
  },
};
</script>

<style lang="sass">
.screen-reader-shortcut
  border: 0
  clip: rect(0,0,0,0)
  height: 1px
  overflow: hidden
  position: absolute !important
  width: 1px
  word-wrap: normal !important

.screen-reader-shortcut:focus
  background: #fff
  box-shadow: 0 0 2px 2px rgba(0,0,0,.6)
  clip: auto !important
  color: #333
  display: block
  font-size: 1em
  font-weight: 700
  height: auto
  padding: 15px 23px 14px
  text-decoration: none
  width: auto
  z-index: 100000
</style>
