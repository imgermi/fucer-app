<template>
  <div class="normativa">
    <Alerta/>
    <InternalTop/>
    <section>
      <div class="container">
        <h1>Resolución MJ y DH Nº 238/2003 (Concursos)</h1>
        <nuxt-link to="/">Volver</nuxt-link>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis optio dolorem obcaecati enim quia quos laborum neque, sint, quasi dolore, ad suscipit odit quae maiores facere atque. Error nam, impedit.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil rem rerum nemo debitis consequatur eos aperiam quasi modi ducimus fugiat, temporibus dolore similique nisi dolor quaerat ex optio, minus velit?</p>
      </div>
    </section>
  </div>
</template>

<script>
import InternalTop from '~/components/InternalTop.vue'
import Alerta from '~/components/Alerta.vue'

export default {
  components: {
    InternalTop,
    Alerta
  },
  data () {
    return {
      title: 'Normativa'
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