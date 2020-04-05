const httpStatus = require('http-status')
const axios = require('axios')
const config  = require('config');
const host = process.env.PORT || config.get('api.host')
const { normalizeProduct, productDescription, normalizeItems, productCategory } = require('../../helper/')

class productsController {

  async listProducts(req, res) {
    const { q } = req.query
    try {
      const response = await axios.get(`${host}/sites/MLA/search?q=${q}`)
      response.data = normalizeItems(response.data.results.slice(0,4), await productCategory(response.data.results[0].category_id))
      return res
        .send(response.data)
    } catch (ex) {
      return res
        .sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        .send(ex)
    }
  }

  async productDetail(req, res) {
    const { id } = req.params
    try {
      const response = await axios.get(`${host}/items/${id}`)
      response.data = normalizeProduct(response.data, await productDescription(id))
      return res.send(response.data)
    } catch (ex) {
      return res
        .sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        .send(ex)
    }
  }

}

module.exports = productsController