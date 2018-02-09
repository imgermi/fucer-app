<template>
  <div class="registro">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <!-- action provisorio para probar el flujo de la app -->
        <form method="post" class="main__form">
          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input type="email" name="email" id="email" placeholder="Email">
          </fieldset>
          <fieldset>
            <label for="password">¿Cúal es su contraseña?</label>
            <input type="password" name="password" id="password" placeholder="contraseña">
          </fieldset>
          <nuxt-link :to="{name: 'inicio'}" class="rounded__btn--full">Ingresar</nuxt-link>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
  components: {
    SecondaryTop
  }
}
</script>