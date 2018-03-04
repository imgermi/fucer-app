import moment from 'moment'

export default function ({store, app, route}) {
  if (app.$auth.state.loggedIn) {

    // Restringimos el acceso al contenido a los usuarios con plan
    // básico con trial vencido
    let usuarioPremium = false
    if(app.$auth.state.user.pago==1){
      usuarioPremium = true
    }else{
      let premiumHasta = moment(app.$auth.state.user.pago_fecha).add(1, 'month')
      let hoy = moment()
      if (premiumHasta.diff(hoy, 'days') >= 0) {
        usuarioPremium = true
      }
    }
    if (!usuarioPremium && route.name!=='trial-vencido') {
      let fechaActivacion = moment(app.$auth.state.user.activo_fecha)
      let hoy = moment()
      if (hoy.diff(fechaActivacion, 'days') > 7) {
        app.router.push({ name: 'trial-vencido' })
        return
      }
    }
  }
}