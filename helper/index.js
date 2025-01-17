const { getCategory, getDescription } = require('../api/service')

const getItems = (array) => {
  let items = []
  array.forEach(index => {
    let decimals = index.price.toFixed(2);
    let item = {
      id: index.id,
      title: index.title,
      price: {
        currency: index.currency_id,
        amount: index.price,
        decimals: (decimals + "").split(".")[1]
      },
      picture: index.thumbnail,
      condition: index.condition,
      free_shipping: index.shipping.free_shipping
    }
    items.push(item)
  })
  return items
}

const normalizeItems = (data, category) => {
  const listItems = {
    author: {
      name: "N/A",
      lastname: "N/A"
    },
    categories: category,
    items: getItems(data)
  }
  return listItems
}

const normalizeProduct = (data, description) => {
  let decimals = data.price.toFixed(2);
  const productDetail =  {
      author: {
        name: "N/A",
        lastname: "N/A"
      },
      item: {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: data.price,
          decimals: (decimals + "").split(".")[1]
        },
        picture: data.pictures[0].url,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: description.data[0].plain_text
      }
  }
  return productDetail
}

const productCategory = async (id, limit) => {
  let arr = []
  response = await getCategory(id, limit)
  response = response.data.results
  response.forEach(index => {
    arr.push(index.title)
  })
  return arr
}

const productDescription = async (id) => {
  return response = await getDescription(id)
}

module.exports = { normalizeProduct, productDescription, normalizeItems, productCategory }