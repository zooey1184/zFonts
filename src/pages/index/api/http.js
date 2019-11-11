// import env from '@/common/js/global/env'

const axios = require('axios');
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // if (env().isDev()) {
  //   config.url = `http://127.0.0.1:3000${config.url}`
  // }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

export default axios
