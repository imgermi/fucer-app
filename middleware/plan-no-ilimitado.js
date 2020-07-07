export default function ({ redirect, app: { $auth } }) {
  if ($auth.loggedIn && $auth.user.suscripcion.tipo === "ilimitado") {
    return redirect("/inicio");
  }
}
