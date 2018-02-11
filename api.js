import axios from 'axios'

const BASE_URL = 'https://fucer.com.ar/app/api/'

export default {
  async getNormativasDestacadas() {
    const response = await axios.get(BASE_URL + 'normativas/destacadas')
    return response.data.map(item => {
    	item.url = {
    		name: 'normativa',
    		params: {
    			id: item.id,
    			slug: decodeURIComponent(item.uri)
    		}
    	}
    	return item
    })
  },
  async getNormativasMasNuevas(limit = 3) {
    const response = await axios.get(BASE_URL + 'normativas/ultimas/' + limit)
    return response.data.map(item => {
      item.url = {
        name: 'normativa',
        params: {
          id: item.id,
          slug: decodeURIComponent(item.uri)
        }
      }
      return item
    })
  },
  async buscarNormativas(palabra = '') {
    if (!palabra) {
      return []
    }
    const response = await axios.get(BASE_URL + 'normativas/buscar/' + palabra)
    return response.data.map(item => {
      item.url = {
        name: 'normativa',
        params: {
          id: item.id,
          slug: decodeURIComponent(item.uri)
        }
      }
      return item
    })
  },
  async getNormativa(id) {
    const response = await axios.get(BASE_URL + 'normativas/id/' + id)
    response.data.url = {
      name: 'normativa',
      params: {
        id: response.data.id,
        slug: decodeURIComponent(response.data.uri)
      }
    }
    return response.data
  }
}
