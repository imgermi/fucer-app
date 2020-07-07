const strategy = "local";

export default async function ({ app, route }) {
  const { $axios, $auth } = app;

  if (!$auth || !$auth.loggedIn || !$auth.strategies[strategy]) return;

  const options = $auth.strategies.local.options;
  let token = $auth.getToken(strategy);

  if (!token) return;

  // no deslogueamos elusuario si está offline
  if (!window.navigator.onLine) return;

  // calculate timeout before token expiration (75% from expiration time)
  const tokenParsed = decodeToken.call(this, token);
  const refreshToken = tokenParsed[options.refresh_token_key];
  const { login, callback } = $auth.options.redirect;

  if ($auth.$state.loggedIn) {
    // -- Authorized --
    // Don't validate if inside login page (and login page is not disabled)
    if (login && route.path === login.split("?")[0]) {
      return;
    }
  } else {
    // -- Guest --
    // Don't validate if authorized and inside callback page
    // (Those passing `callback` at runtime need to mark their callback component
    // with `auth: false` to avoid an unnecessary redirect from callback to login)
    if (!callback || (callback && route.path === callback.split("?")[0])) {
      return;
    }
  }

  try {
    const { token } = await $axios.$get(options.endpoints.refreshToken.url);
    if (refreshToken !== token) {
      console.log("Los refresh token no coinciden. Deslogueando...");
      console.log(refreshToken + " !== " + token);
      $auth.logout();
    }
  } catch (error) {
    $auth.logout();
    console.log(error);
    throw new Error("Error while refreshing token");
  }
}

// Decode JWT token
function decodeToken(str) {
  str = str.split(".")[1];

  str = str.replace("/-/g", "+");
  str = str.replace("/_/g", "/");
  switch (str.length % 4) {
    case 0:
      break;
    case 2:
      str += "==";
      break;
    case 3:
      str += "=";
      break;
    default:
      throw "Invalid token";
  }

  str = (str + "===").slice(0, str.length + (str.length % 4));
  str = str.replace(/-/g, "+").replace(/_/g, "/");

  str = decodeURIComponent(escape(atob(str)));

  str = JSON.parse(str);
  return str;
}
