<template>
    <!-- Page Container -->
    <div id="page-container" v-bind:class="{notLogged}"
         class="sidebar-o enable-page-overlay side-scroll page-header-modern main-content-boxed">
        <!-- Sidebar -->
        <nav id="sidebar">
            <!-- Sidebar Scroll Container -->
            <div id="sidebar-scroll">
                <!-- Sidebar Content -->
                <div class="sidebar-content">
                    <!-- Side Header -->
                    <div class="shadow content-header-fullrow px-15 pt-50 pb-50 bg-black-op-90">
                        <!-- Mini Mode -->
                        <div class="content-header-section sidebar-mini-visible-b">
                            <!-- Logo -->
                            <span class="content-header-item font-w700 font-size-xl float-left animated fadeIn">
                                <span class="text-dual-primary-dark">c</span>
                                <span class="text-primary">b</span>
                            </span>
                            <!-- END Logo -->
                        </div>
                        <!-- END Mini Mode -->

                        <!-- Normal Mode -->
                        <div class="content-header-section text-center align-parent sidebar-mini-hidden">
                            <!-- Close Sidebar, Visible only on mobile screens -->
                            <!-- Layout API, functionality initialized in Codebase() -> uiApiLayout() -->
                            <button type="button" class="btn btn-circle btn-dual-secondary d-lg-none align-v-r"
                                    data-toggle="layout" data-action="sidebar_close"><i
                                    class="fa fa-times text-danger"></i></button>
                            <!-- END Close Sidebar -->
                            <!-- Logo -->
                            <div class="logo-content">
                                <router-link to="/home">
                                    <img src="assets/codebase/media/logo_tecfy.png" alt="Tecfy - Business Solutions"
                                         class="img-fluid">
                                </router-link>
                            </div>
                            <!--<div class="top-navegation py-30">-->
                            <!--<div class="row">-->
                            <!--<div class="col-12">-->
                            <!--<div class="form-group text-center">-->
                            <!--<select class="form-control" id="exampleFormControlSelect1" v-model="selectedUnit" >-->
                            <!--<option selected value="Selecione">Selecione</option>-->
                            <!--<option :value="unit.unityId" v-for="(unit, index) in units" :key="index">{{ unit.name }}</option>-->
                            <!--</select>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="col-12 text-center">-->
                            <!--<a @click="logout" href="#" class="link-effect text-uppercase">-->
                            <!--Sair <i class="fa fa-sign-out"></i>-->
                            <!--</a>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!-- END Logo -->
                        </div>
                        <!-- END Normal Mode -->
                    </div>
                    <!-- END Side Header -->

                    <!-- Side Navigation -->
                    <div class="content-side content-side-full bg-primary">
                        <ul class="nav-main">
                            <router-link tag="li" to="/home" active-class="active" exact>
                                <a><span><img src="assets/codebase/media/various/link-label.svg" alt=""></span><i
                                        class="fa fa-home"></i><span class="sidebar-mini-hide">Dashboard</span></a>
                            </router-link>

                            <router-link tag="li" to="/cut-dossie" active-class="active" v-if="claims.recortar">
                                <a><span><img src="assets/codebase/media/various/link-label.svg" alt=""></span><i
                                        class="fa fa-crop"></i><span
                                        class="sidebar-mini-hide">Recortar Dossiê</span></a>
                            </router-link>

                            <router-link tag="li" to="/rate-dossie" active-class="active" v-if="claims.classificar">
                                <a><span><img src="assets/codebase/media/various/link-label.svg" alt=""></span><i
                                        class="fa fa-file-text-o"></i><span
                                        class="sidebar-mini-hide">Classificar Dossiê</span></a>
                            </router-link>

                            <router-link tag="li" to="/scanning" active-class="active" v-if="claims.digitalizar">
                                <a><span><img src="assets/codebase/media/various/link-label.svg" alt=""></span>
                                    <i class="fa fa-clone"></i>
                                    <span class="sidebar-mini-hide">Digitalizar</span></a>
                            </router-link>
                        </ul>
                    </div>
                    <!-- END Side Navigation -->
                </div>
                <!-- Sidebar Content -->
            </div>
            <!-- END Sidebar Scroll Container -->
        </nav>
        <!-- END Sidebar -->
        <!-- Main Container -->
        <main id="main-container">
            <div class="row py-10 px-20 bg-white top-menu" v-if="!notLogged">
                <div class="col-11 pl-20 pt-5 text-white text-right">
                    <h6 class="mb-0 vertical-align">
                        <i class="fa fa-graduation-cap text-primary"></i> <span class="text-primary"> {{ unity }}</span>
                    </h6>
                </div>
                <div class="col-1 text-right">
                    <div class="btn-group" role="group">
                        <a id="btnGroupDrop1" class="btn btn-lg btn-alt-primary dropdown-toggle h4 mb-0" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-user-circle-o"></i>
                        </a>
                        <div class="dropdown-menu mr-20 mt-10 text-center p-0 pb-10" aria-labelledby="btnGroupDrop1">
                            <p class="mb-0 py-5 bg-primary p-0 text-white">
                                {{ fullName }}
                            </p>
                            <hr class="m-0 py-5 ">
                            <router-link @click="changeUnity()" :to="'/select-unity'" class="btn link-effect">
                                Alterar unidade
                            </router-link>
                            <hr class="mb-0 py-2">
                            <a @click="logout" class="btn link-effect">
                                Sair
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Page Content -->
            <div class="content">
                <!-- Header
                <div id="nav">
                  <router-link to="/">Home</router-link> |
                  <router-link to="/about">About</router-link>
                </div>-->
                <router-view/>
                <!-- END Header -->
            </div>
            <!-- END Page Content -->
        </main>
        <!-- END Main Container -->

        <!-- Footer -->
        <footer id="page-footer" class="opacity-0">
            <div class="content py-20 font-size-xs clearfix">
            </div>
        </footer>
        <!-- END Footer -->
    </div>
    <!-- END Page Container -->
</template>

<style lang="scss" scoped>
    @import "./assets/_scss/main.scss";
</style>

<script>
    import Auth from './models/Auth';
    // import swal from 'sweetalert2';

    export default {
        data() {
            return {
                notLogged: !window.localStorage.token,
                tokenAccess: false,
                claims: {
                    recortar: false,
                    classificar: false,
                    digitalizar: false
                },
                fullName: window.localStorage.fullName,
                units: [],
                unity: '',
                selectedUnit: null,
                loadingLogin: false
            }
        },
        methods: {
            logout() {
                Auth.logout();
                this.notLogged = true;
                this.$router.push('/login');
                // this.selectedUnit = 0;
                //this.classStyle();
            },
            changeUnity() {
                Auth.changeUnity();
                this.notLogged = true;
                this.$router.push('select-unity');
                this.selectedUnit = 0;
                return window.location.assign('select-unity');
            },
            classStyle() {
                if (window.localStorage.token) {
                    this.notLogged = false;
                } else {
                    this.notLogged = true;
                }
            },
            loadClaims() {
                if (typeof window.localStorage.claims === 'string') {
                    let claims = JSON.parse(window.localStorage.claims);
                    claims.map(claim => {
                        if (claim.ClaimType === "Recortar") {
                            this.claims.recortar = true;
                        } else if (claim.ClaimType === "Classificar") {
                            this.claims.classificar = true;
                        } else if (claim.ClaimType === "Digitalizar") {
                            this.claims.digitalizar = true;
                        }
                    });
                }
            },
            loadUnitsFromStorage() {
                try {
                    let selUnitStorage = window.localStorage.selectedUnit;
                    this.units = JSON.parse(window.localStorage.units);

                    if (selUnitStorage === null || selUnitStorage === "undefined" || selUnitStorage === "Selecione") {
                        this.selectedUnit = "Selecione";
                    } else {
                        this.selectedUnit = this.units[window.localStorage.selectedUnit - 1].unityId;
                        this.unity = this.units[this.selectedUnit - 1].name;
                    }
                } catch (e) {
                    // console.log(e);
                    // return swal({
                    //     type: 'error',
                    //     text: 'Não foi possível carregar as unidades.',
                    // });
                }
            }
        },
        mounted() {
            this.loadClaims();
            this.loadUnitsFromStorage();
        },
        created() {
            this.classStyle();
        },
        watch: {
            selectedUnit(newVal) {
                window.localStorage.setItem("selectedUnit", newVal);
                this.$router.push('/home');
            }
        }
    }
</script>
