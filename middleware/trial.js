import moment from 'moment'

export default function ({store, app, route}) {
  if (app.$auth.state.loggedIn) {

    // Restringimos el acceso al contenido a los usuarios con plan
    // básico con trial vencido
    if (app.$auth.state.user.pago!==1 && route.name!=='trial-vencido') {
      let fechaActivacion = moment(app.$auth.state.user.activo_fecha)
      let hoy = moment()
      if (hoy.diff(fechaActivacion, 'days') > 7) {
        app.router.push({ name: 'trial-vencido' })
        return
      }
    }
  }
}