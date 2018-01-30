<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <section>
      <div class="container">
        <h1>Favoritas</h1>
      </div>
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'

export default {
  components: {
    Top,
    Alerta
  },
  data () {
    return {
      title: 'Favoritas'
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