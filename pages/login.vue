<template>
  <div class="registro">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <!-- action provisorio para probar el flujo de la app -->
        <form action="/inicio" method="post" class="main__form">
          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input type="email" name="email" id="email" placeholder="Email">
          </fieldset>
          <fieldset>
            <label for="password">¿Cúal es su contraseña?</label>
            <input type="password" name="password" id="password" placeholder="contraseña">
          </fieldset>
          <input type="submit" class="rounded__btn--full" value="Ingresar">
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