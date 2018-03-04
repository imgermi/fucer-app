import moment from 'moment'

export default function ({store, app, route}) {
  if (app.$auth.state.loggedIn) {

    // Restringimos el acceso al contenido a los usuarios con plan
    // básico con trial vencido
    if (!store.getters.usuarioPremium && route.name!=='trial-vencido') {
      let fechaActivacion = moment(app.$auth.state.user.activo_fecha)
      let hoy = moment()
      console.log('Usuario activado hace ' + hoy.diff(fechaActivacion, 'days') + 'días')
      if (hoy.diff(fechaActivacion, 'days') > 7) {
        app.router.push({ name: 'trial-vencido' })
        return
      }
    }
  }
}