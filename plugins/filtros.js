import Vue from 'vue'
import moment from 'moment'

Vue.filter('fecha', (value, format) => {
  if (value) {
    return moment(String(value)).format(format)
  }
})
