const axios = require('axios')
const config  = require('config');
const url = process.env.HOST || config.get('api.host')
const site = process.env.SITE || config.get('api.site')

const getAllProducts = (q) => {
  return axios.get(`${url}/sites/${site}/search?q=${q}`)
}

const getCategory = (id) => {
  return axios.get(`${url}/sites/${site}/search?category=${id}&limit=4`)
}

const getProductDetail = (id) => {
  return axios.get(`${url}/items/${id}`)
}

const getDescription = (id) => {
  return axios.get(`${url}/items/${id}/descriptions`)
}


module.exports = {
  getAllProducts,
  getCategory,
  getProductDetail,
  getDescription
}