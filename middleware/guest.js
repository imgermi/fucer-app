export default function ({ app: { $auth, router }, route }) {
  // Bloqueo el acceso si el usuario está logueado
  let redirigir = route.name;
  if ($auth.loggedIn) {
    if ($auth.user.suscripcion.premium) {
      redirigir = "inicio";
    } else {
      // Si tiene suscripción activa pero no es premium es que
      // no o está teniedo un problema con el pago
      if ($auth.user.suscripcion.activa) {
        redirigir = "estado-suscripcion";
        // Un usuario sin suscrición tiene que elegir un medio de pago
        // para activar una suscripción
      } else {
        redirigir = "medio-de-pago";
      }
    }
  }

  if (route.name !== redirigir) {
    router.push({ name: redirigir });
  }
}
