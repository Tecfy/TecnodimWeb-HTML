<template>
  <!-- Page Container -->
  <div id="page-container" v-bind:class="{notLogged}" class="sidebar-o enable-page-overlay side-scroll page-header-modern main-content-boxed">
    <!-- Sidebar -->
    <nav id="sidebar">
      <!-- Sidebar Scroll Container -->
      <div id="sidebar-scroll">
        <!-- Sidebar Content -->
        <div class="sidebar-content">
          <!-- Side Header -->
          <div class="shadow content-header-fullrow px-15 pt-50 bg-black-op-90">
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
              <button type="button" class="btn btn-circle btn-dual-secondary d-lg-none align-v-r" data-toggle="layout" data-action="sidebar_close"> <i class="fa fa-times text-danger"></i></button>
              <!-- END Close Sidebar -->
              <!-- Logo -->
              <div class="logo-content">
                <router-link to="/dashboard">
                  <img src="assets/codebase/media/logo_tecfy.png" alt="Tecfy - Business Solutions" class="img-fluid">
                </router-link>
              </div>
              <div class="top-navegation py-30">
                <div class="row">
                  <div class="col-6"><a href="#" class="link-effect text-uppercase">Unidade I</a>
                  </div>
                  <div class="col-5 text-center"><a @click="logout" href="#" class="link-effect text-uppercase">Sair
                    <i class="fa fa-sign-out"></i></a></div>
                </div>
              </div>
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

              <router-link tag="li" to="/cut-dossie" active-class="active">
                <a><span><img src="assets/codebase/media/various/link-label.svg" alt=""></span><i
                        class="fa fa-crop"></i><span class="sidebar-mini-hide">Recortar Dossiê</span></a>
              </router-link>

              <router-link tag="li" to="/rate-dossie" active-class="active">
                <a><span><img src="assets/codebase/media/various/link-label.svg" alt=""></span><i
                        class="fa fa-file-text-o"></i><span class="sidebar-mini-hide">Classificar Dossiê</span></a>
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

    export default {
        data() {
            return {
                notLogged: !window.localStorage.token,
                logged: false,
                tokenAccess: false
            }
        },
        methods:{
          logout(){
              Auth.logout();
              this.notLogged = true;
              this.$router.push('login');
              //this.classStyle();
          }
          // classStyle() {
          //     if (window.localStorage.token) {
          //         this.notLogged = false;
          //         console.log('nope');
          //     } else {
          //         this.notLogged = true;
          //         console.log('nope');
          //     }
          // }
        }
    }
</script>
