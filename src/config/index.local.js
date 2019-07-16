const environmentBase = "http://localhost:9098";
const environmentLogin = "http://localhost:8080/login";
export default {
    apiUrl: environmentBase + '/api',
    externalLoginUlr: environmentBase,
    externalLoginUlrRedirect: environmentLogin,
}