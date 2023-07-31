import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://localhost:4000/api',/* `${location.origin}/api` */
  //`http://${location.hostname}:2323/api`,
  timeout: 10000,
  timeoutErrorMessage:'tempo de pedido esgotou!',
  // headers: { Authorization:!token?`Bearer ${token}`:null }
})

// Vue.prototype.$http = axiosIns

export default axiosIns