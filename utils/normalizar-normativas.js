export default function (normativas) {
  return normativas.map(item => ({
    ...item,
    url: {
      name: 'normativa',
      params: {
        id: item.id,
        slug: decodeURIComponent(item.uri)
      }
    }
  }))
}