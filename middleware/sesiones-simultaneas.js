const strategy = 'local'

export default function ({store, app, route}) {
  const { $axios, $auth } = app

  if (!$auth || !$auth.loggedIn || !$auth.strategies[strategy])
    return

  const options = $auth.strategies.local.options
  let token = $auth.getToken(strategy)

  if (!token)
    return

  // calculate timeout before token expiration (75% from expiration time)
  const tokenParsed = decodeToken.call(this, token)
  const refreshToken = tokenParsed[options.refresh_token_key]

  try {

    const { login, callback } = $auth.options.redirect

    if ($auth.$state.loggedIn) {
      // -- Authorized --
      // Don't validate if inside login page (and login page is not disabled)
      if (login && route.path === login.split('?')[0]) {
        return
      }
    } else {
      // -- Guest --
      // Don't validate if authorized and inside callback page
      // (Those passing `callback` at runtime need to mark their callback component
      // with `auth: false` to avoid an unnecessary redirect from callback to login)
      if (!callback || (callback && route.path === callback.split('?')[0])) {
        return
      }
    }


    const result = $axios.$get(options.endpoints.refreshToken.url).then(result => {
      const newRefreshToken = result.token
      if(refreshToken !== newRefreshToken){
        console.log('Los refresh token no coinciden. Deslogueando...')
        console.log(refreshToken + ' !== ' + newRefreshToken)
        $auth.logout()
      }
    }).catch (error =>{
      $auth.logout()
      console.log(error)
    });

  } catch (error) {
    $auth.logout()
    console.log(error)
    throw new Error('Error while refreshing token')
  }
}

// Properly encode data
function encodeQuery (queryObject) {
  return Object.keys(queryObject)
    .map(
      key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key])
    )
    .join('&')
}

// Decode JWT token
function decodeToken (str) {
  str = str.split('.')[1];

  str = str.replace('/-/g', '+');
  str = str.replace('/_/g', '/');
  switch (str.length % 4) {
    case 0:
      break;
    case 2:
      str += '==';
      break;
    case 3:
      str += '=';
      break;
    default:
      throw 'Invalid token';
  }

  str = (str + '===').slice(0, str.length + (str.length % 4));
  str = str.replace(/-/g, '+').replace(/_/g, '/');

  str = decodeURIComponent(escape(atob(str)));

  str = JSON.parse(str);
  return str;
}