import mixpanel from 'mixpanel-browser'

if (process.env.NODE_ENV === 'production') {
  mixpanel.init("cc308c6e70b5a662fdaf1064fec2a023");
}

