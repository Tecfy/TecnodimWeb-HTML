<template>
    <div class="login-page">
        <div class="hero-static col-lg-6 col-xl-4 mx-auto">
            <div class="content content-full overflow-hidden">
                <!-- Header -->
                <div class="py-30 text-center bg-black-op-90">
                    <img src="assets/codebase/media/logo_tecfy.png" alt="Tecfy - Business Solutions" class="img-fluid">
                </div>
                <!-- END Header -->

                <!-- Sign In Form -->
                <!-- <form class="js-validation-signin" v-on:submit.prevent="onSubmit" method="post" novalidate="novalidate" > -->
                    <div class="block block-themed block-rounded block-shadow" v-if="loadingLogin">
                        <div class="block-header bg-gd-dusk">
                            <h3 class="block-title"><i class="fa fa-chevron-right mr-5"></i> Faça seu login para
                                prosseguir</h3>
                        </div>
                        <div class="block-content">
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="login-username">Usuário</label>
                                    <input type="text" class="form-control" id="login-username" v-model="email" name="login-username">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="login-password">Senha</label>
                                    <input type="password" class="form-control" id="login-password" v-model="password"
                                           name="login-password">
                                </div>
                            </div>
                             <div class="form-group row">
                                <div class="col-6 text-center">
                                    <button class="btn btn-block btn-alt-primary" @click="externalLogin">
                                        <i class="si si-login mr-10"></i> Login Integrado
                                    </button>
                                </div>
                                <div class="col-6 text-center">
                                    <button class="btn btn-block btn-alt-primary" @click="postLogin" :disabled="!numSelected()">
                                        <i class="si si-login mr-10"></i> Entrar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!--<div class="block-content bg-body-light">-->
                            <!--<div class="form-group text-center">-->
                                <!--<a class="link-effect text-muted mr-10 mb-5 d-inline-block"-->
                                   <!--href="op_auth_reminder3.html">-->
                                    <!--<i class="fa fa-warning mr-5"></i> Esqueci minha senha-->
                                <!--</a>-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="block block-themed block-rounded block-shadow" v-else>
                        <div class="block-header bg-gd-dusk">
                            <h3 class="block-title"><i class="fa fa-chevron-right mr-5"></i> Carregando usuário</h3>
                        </div>
                        <div class="block-content bg-white">
                            <div class="form-group row">
                                <h2 class="text-center mx-auto">
                                    <i class="fa fa-spinner fa-spin"></i>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <!--<div class="load-login" v-else>-->
                        <!--<div class="block-header bg-gd-dusk">-->
                            <!--<h3 class="block-title"><i class="fa fa-chevron-right mr-5"></i> Carregando usuário</h3>-->
                        <!--</div>-->
                        <!--<div class="block-content">-->

                        <!--</div>-->
                    <!--</div>-->
                <!-- </form> -->
                <!-- END Sign In Form -->
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert2';
    // import api from '../lib/api';
    import uuid from 'uuid/v1';
    import config from '../config/'
    import sweetalert2 from 'sweetalert2';
    import axios from 'axios';

    export default {
        name: 'login',
        data: function () {
            return {
                email: "",
                password: "",
                loadingLogin: true,
                validaForm: false
            }
        },
        mounted: function () {
            let token = this.$route.query.token;
            if(token){
                return this.tryExternalPost(token);
            }
        },
        methods: {
            tryExternalPost(token){               
                let url = `${config.apiUrl}/Account/LoginExternal`;
                let request = {
                    token
                }
                axios.post(url,request)
                .then(({data}) => {
                    if(!data.success){
                        return this.showInvalidToken()
                    }
                    return this.handleLogin(data);
                })
                .catch(this.showInvalidToken)
            },
            showInvalidToken(){
                return sweetalert2({
                    type: 'error',
                    text: 'Token inválido!'
                })
            },
            externalLogin(e){
                e.preventDefault();
                let token = uuid();
                window.localStorage.setItem('tec-token', token);
                let url = `${config.externalLoginUlr}/Account/ExternalLogin?provider=Saml2&token=${token}&ReturnUrl=${config.externalLoginUlrRedirect}`;

                sweetalert2({
                    type: 'info',
                    showCancelButton:true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Sim',
                    title: 'Você será redirecionado para uma URL externa. Tem certeza?'
                })
                .then((result) => {
                    if(result.value){
                        window.location.href = url;
                    }
                })
            },
            handleLogin(data){
                let token = data.result.access_token;
                        let name = data.result.name;
                        if(token) {
                            let claims = data.result.claims;

                            let units = JSON.stringify(data.result.units);
                            window.localStorage.setItem("token", token);
                            window.localStorage.setItem("claims", claims);
                            window.localStorage.setItem("units", units);
                            window.localStorage.setItem("fullName", name)
                            // Set authorization of api global instance, to get profile at first time
                            // api.defaults.headers.common["Authorization"] = "Bearer " + token;
                            this.$router.push('/select-unity');
                            // return window.location.reload(); // todo: ajustar
                        } else {

                            throw new Error()
                        }
            },
            postLogin(evt) {
                this.error = null;
                evt.preventDefault();
                if (!this.email || !this.password) return;

                if (this.loadLogin) {
                    this.loadingLogin = false;
                } else {
                    this.loadingLogin = true;
                }

                let request = {
                    userName:this.email,
                    password :this.password
                }

                axios.post(`${config.apiUrl}/Account/Login`,request)
                    .then(({ data }) => {
                        this.loadLogin = false;
                        return this.handleLogin(data)
                    })
                    .catch(() => {
                        this.loadingLogin = true;
                        this.email = '';
                        this.password = '';
                        swal({
                            type: "error",
                            text: "Usuário ou senha inválidos!",
                            showConfirmButton: false,
                            toast: true,
                            position: 'top-end',
                            timer: 3000
                        });
                    });
            },
            numSelected() {
                if (this.email !== '' && this.password !== '') {
                    return true;
                } else {
                    return false;
                }
            },
        }
    }
</script>
