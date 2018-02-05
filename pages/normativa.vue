<template>
  <div class="normativa">
    <Alerta/>
    <header class="goBack__header">
      <div class="container">
        <a @click="$router.go(-1)"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></a>
        <FavoriteStar/>
      </div>
    </header>
    <section class="top">
      <div class="container">
        <h1>Resolución MJ y DH Nº 238/2003 (Concursos)</h1>
        <small>2003</small>
      </div>
    </section>
    <section class="band cuerpo">
      <div class="container">
        <h6>Introducción</h6>
        <span>Por Javier Cornejo</span>
        <p>The entire starfleet couldn’t destroy the whole planet. It’d take a thousand ships with more fire power than I’ve… There’s another ship coming in. Maybe they know what happened. It’s an Imperial fighter. It followed us! No. It’s a short range fighter. There aren’t any bases around here. Where did it come from? It sure is leaving in a big hurry. If they identify us, we’re in big trouble. Not if I can help it. Chewie…jam it’s transmissions. It’d be as well to let it go. It’s too far out of range. Not for long…</p>
        <p>The entire starfleet couldn’t destroy the whole planet. It’d take a thousand ships with more fire power than I’ve… There’s another ship coming in. Maybe they know what happened. It’s an Imperial fighter. It followed us! No. It’s a short range fighter. There aren’t any bases around here. Where did it come from? It sure is leaving in a big hurry. If they identify us, we’re in big trouble. Not if I can help it. Chewie…jam it’s transmissions. It’d be as well to let it go. It’s too far out of range. Not for long…</p>
        <button class="rounded__btn--full" v-on:click="LeerNormativa">Leer normativa</button>
        <div :class="'cuerpo__principal' + (cuerpoActivo ? ' active' : '')">
          <p>Holding her is dangerous. If word of this gets out, it could generate sympathy for the Rebellion in the senate. I have traced the Rebel spies to her. Now she is my only link to find their secret base! She'll die before she tells you anything. Leave that to me. Send a distress signal and then inform the senate that all aboard were killed! Lord Vader, the battle station plans are not aboard this ship! And no transmissions were made. An escape pod was jettisoned during the fighting, but no life forms were aboard. She must have hidden the plans in the escape pod. Send a detachment down to retrieve them. See to it personally, Commander. There'll be no one to stop us this time. Yes, sir.</p>
        </div>
      </div>
    </section>
    <Foot/>
  </div>
</template>

<script>
import Alerta from '~/components/Alerta.vue'
import FavoriteStar from '~/components/FavoriteStar.vue'
import Foot from '~/components/Foot.vue'

export default {
  components: {
    Alerta,
    FavoriteStar,
    Foot
  },
  data () {
    return {
      title: 'Normativa',
      cuerpoActivo: false
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  methods: {
    LeerNormativa: function(event) {
      this.cuerpoActivo = !this.cuerpoActivo
    }
  }
}
</script>