
const productsController = require('../controllers/products')


module.exports = app => {
  const products = new productsController()

  app.route('/api/items/').get(products.listProducts);
  app.route('/api/items/:id').get(products.productDetail)
}