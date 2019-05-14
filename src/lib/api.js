import axios from 'axios';
import swal from 'sweetalert2';
import config from '../config';

function getToken() {
  if (typeof window.localStorage.token === "undefined") {
    window.location.href = '/login';
  }
  return window.localStorage.token;
}

const instance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getToken(),
  },
  timeout: 60 * 1000 * 1000,
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response !== null) {
    if (error.response.status === 401) {
      window.location.href = '/login';
      return Promise.reject(error);
    }
    let msg = error.response.data.hasOwnProperty('msg') ? error.response.data.msg : error.response.data.message
    if (error.response.status === 422 && error.response.data.errors) {
      msg = error.response.data.errors[Object.keys(error.response.data.errors)[0]];
    }
    swal({
      type: 'error',
      text: msg || 'Falha ao processar a requisição!',
      showConfirmButton: false,
      toast: true,
      timer: 3000
    });
  } else {
    swal({
      type: 'error',
      text: 'Falha ao processar a requisição!',
      showConfirmButton: false,
      toast: true,
      timer: 3000
    });
  }
  return Promise.reject(error);
});

export default instance;