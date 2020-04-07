const config  = require('config');
const limitStd = process.env.limit || config.get('api.limit')

const httpStatus = require('http-status')

const { getAllProducts, getProductDetail } = require('../service')

const { normalizeProduct, productDescription, normalizeItems, productCategory } = require('../../helper/')

class productsController {

  async listProducts(req, res) {
    let { q, limit } = req.query
    limit ? limit : limitStd
    try {
      let response = await getAllProducts(q, limit)
      let category = response.data.filters[0].values[0].id ? response.data.filters[0].values[0].id : response[0].category_id
      response = normalizeItems(response.data.results, await productCategory(category, limit))
      return res.send(response)
    } catch (ex) {
      return res
        .sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        .send(ex)
    }
  }

  async productDetail(req, res) {
    const { id } = req.params
    try {
      const response = await getProductDetail(id)
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