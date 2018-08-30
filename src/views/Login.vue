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

                <form class="js-validation-signin" @click="onSubmit" method="post" novalidate="novalidate">
                    <div class="block block-themed block-rounded block-shadow">
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
                                <div class="col-6 offset-3 text-center">
                                    <button type="submit" class="btn btn-block btn-alt-primary">
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
                </form>
                <!-- END Sign In Form -->
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert2';
    import Auth from '../models/Auth';
    import api from '../lib/api';

    export default {
        name: 'login',

        data: function () {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            onSubmit(evt) {
                this.error = null;

                evt.preventDefault();
                if (!this.email || !this.password) return;

                let login = Auth.login(this.email, this.password);

                login
                    .then(({ data }) => {
                        let token = data.result.access_token;
                        if(token) {
                            window.localStorage.setItem("token", token);
                            // Set authorization of api global instance, to get profile at first time
                            api.defaults.headers.common["Authorization"] = "Bearer " + token;
                            this.$router.push('home');
                            return window.location.reload(); // todo: ajustar
                        }else{
                            throw new Error()
                        }
                    })
                    .catch(() => {
                        swal({
                            type: "error",
                            text: "Usuário ou senha inválidos!",
                            showConfirmButton: false,
                            toast: true,
                            position: 'top-end',
                            timer: 3000
                        });
                    });
            }
        }
    }
</script>
