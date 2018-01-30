<template>
  <div class="inicio">
  	<Top :title="title" />
    <section>
      <div class="container">
        <h1>Configuracion</h1>
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