<template>
  <div class="inicio">
  	<Top/>
    <section>
      <div class="container">
        <h1>Home</h1>
        <nuxt-link to="/normativa">
        	<h3>Resolución MJ y DH Nº 238/2003 (Concursos)</h3>
        	<p>The entire starfleet couldn’t destroy the whole planet. Not for long…</p>
        	<small>2001</small>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'

export default {
  components: {
    Top
  }
}
</script>