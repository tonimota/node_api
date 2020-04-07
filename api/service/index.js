const axios = require('axios')
const config  = require('config');
const url = process.env.HOST || config.get('api.host')
const site = process.env.SITE || config.get('api.site')

const getAllProducts = (q, size) => {
  return axios.get(`${url}/sites/${site}/search?q=${q}&limit=${size}`)
}

const getCategory = (id, size) => {
  return axios.get(`${url}/sites/${site}/search?category=${id}&limit=${size}`)
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