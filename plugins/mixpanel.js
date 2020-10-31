if (process.env.NODE_ENV === "production") {
  import(/* webpackChunkName: "mixpanel" */ "mixpanel-browser")
    .then((mixpanel) =>
      mixpanel.default.init("cc308c6e70b5a662fdaf1064fec2a023")
    )
    .catch((e) => console.log(e));
}
