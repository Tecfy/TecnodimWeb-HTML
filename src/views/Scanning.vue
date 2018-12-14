<template>
    <div class="cut-dossie">
        <p class="content-heading">
            <i class="si si-arrow-left"></i> <span class="h3">Digitalizar Dossiês</span>
        </p>
        <div class="block block-themed block-rounded shadow-lg">
            <div class="block-header bg-gd-emerald shadow">
                <h5 class="text-black mb-0">Para iniciar a digitalização, faça a busca do aluno.</h5>
            </div>
            <div class="block-content bg-primary">
                <form action="" method="post" onsubmit="return false;">
                    <div class="form-group row">
                        <div class="col-lg-4 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="registration-number">Número da matrícula</label>
                            <input ref="fieldRegistration" v-model="searchRegistration" type="text" class="form-control form-control-lg" id="registration-number" name="registration-number" v-mask="'#####################'">
                        </div>
                        <div class="col-lg-2 col-md-6 pt-20 mt-5">
                            <button @click="getDossies(1)" ref="searchButton" class="btn btn-alt-primary btn-lg btn-block mt-1">Buscar <i class="fa fa-search ml-5"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="block mt-50" v-if="!loadingDossies && !noDossies && searchRegistration != ''">
            <div class="block-content" >
                <table class="table table-vcenter" >
                    <thead class="thead-light mb-50">
                    <tr class="p-50">
                        <th class="py-20"><b>Matrícula</b></th>
                        <th class="py-20"><b>Nome</b></th>
                        <th class="py-20"><b>Curso</b></th>
                        <th class="py-20"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="customer in searchResult" >
                        <th scope="row">{{ customer.registration }}</th>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.course }}</td>
                        <td class="text-right">
                            <div class="btn-group">
                                <router-link :to="'/scanning-selected/' + customer.registration" class="btn btn-lg btn-success js-tooltip-enabled" data-title="Continuar"><i class="fa fa-play"></i></router-link>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="noDossies && !loadingDossies">

        </div>
        <div v-else>
            <h2 class="text-center">
                <i class="fa fa-spinner fa-spin"></i>
            </h2>
        </div>
    </div>
</template>

<script>
  import api from '../lib/api';
  import swal from 'sweetalert2';

  export default {
    data() {
      return {
        searchResult: [],
        loadingDossies: false,
        noDossies: true,
        searchRegistration: '01169866',
        totalShow: 10,
        searchActivate: false
      }
    },
    methods: {
      getDossies() {
        let unityId = window.localStorage.selectedUnit;
        this.loadingDossies = true;
        let newUrlApi  = '/documentDetails/GetDocumentDetailsByRegistration?registration=' + this.searchRegistration + '&unityId=' + unityId;
        // let newUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId + '&currentPage=' + this.currentPage + '&qtdEntries=' + this.totalShow;

        if (this.searchRegistration.length !== 0) {
          newUrlApi += '&registration=' + this.searchRegistration;
        }

        api.get(newUrlApi).then(({data}) => {
          if (data.result == null) {
            this.loadingDossies = false;
            this.noDossies = true;
            return swal({
              title: 'Matrícula não encontrada',
              text: 'Verifique o número da matrícula e tente novamente.',
              timer: 3000,
              type: "error",
            });

          } else {
            this.loadingDossies = false;
            this.noDossies = false;
            this.searchResult = data.result;
          }

        });
        this.$refs.fieldRegistration.focus();
      }
    }
  }
</script>
