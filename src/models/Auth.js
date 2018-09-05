import api from '../lib/api'
// import config from '../config';


export default {
    login(UserName, Password) {
        return api.post('/Account/Login', {
            UserName,
            Password
        });
    },
    logout() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("units");
        window.localStorage.removeItem("claims");
        window.localStorage.removeItem("fullName");
    },
    changeUnity() {
        // window.localStorage.removeItem("token");
        window.localStorage.removeItem("units");
        // window.localStorage.removeItem("claims");
        window.localStorage.removeItem("fullName");
    },
    recoveryPassword(request, successHandler) {
        return window.axios.post('/password/recovery', request)
            .then(successHandler)
            .catch(errorHandler);
    },
    profile() {
        return api.get('/profile')
    }
};

const errorHandler = error => {
    var msg = null;
    if (error.response && error.response.status === 401 && error) {
        msg = error.response.data.errors[Object.keys(error.response.data.errors)[0]];
    }

    window.swal({
        type: 'error',
        text: msg || 'Falha ao processar a requisição!',
        showConfirmButton: false,
        toast: true,
        timer: 3000
    })
};