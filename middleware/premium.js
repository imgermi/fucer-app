export default function ({ app: { $auth, router }, route }) {
  // Restringimos el acceso al contenido
  if (
    $auth.loggedIn &&
    !$auth.user.suscripcion.premium &&
    route.name !== "contenido-no-disponible"
  ) {
    router.push({ name: "contenido-no-disponible" });
  }
}
