<template>
  <div class="registro">
    <SecondaryTop/>
    <section>
      <div class="container">
        <!-- action provisorio para probar el flujo de la app -->
        <form action="/confirme-su-email" method="post">
          <fieldset>
            <label for="name">¿Cúal es su nombre?</label>
            <input type="text" name="name" id="name" placeholder="Nombre completo">
          </fieldset>
          <fieldset>
            <label for="email">¿Cúal es su email?</label>
            <input type="email" name="email" id="email" placeholder="Email">
          </fieldset>
          <fieldset>
            <label for="password">Ingrese una contraseña</label>
            <input type="password" name="password" id="password" placeholder="Contraseña">
          </fieldset>
          <fieldset>
            <label for="password-repeat">Repita la contraseña</label>
            <input type="password" name="password-repeat" id="password-repeat" placeholder="Contraseña">
          </fieldset>
          <input type="submit" value="Siguiente">
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
