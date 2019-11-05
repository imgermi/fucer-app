export default function ({app:{$auth, router}, route}) {
  if ($auth.loggedIn) {
    // Restringimos el acceso al contenido
    if (!$auth.user.suscripcion.premium && route.name!=='contenido-no-disponible') {
        router.push({ name: 'contenido-no-disponible' })
    }
  }
}