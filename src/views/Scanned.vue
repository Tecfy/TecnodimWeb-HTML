<template>
    <div class="cut-dossie">
        <p class="content-heading">
            <i class="si si-arrow-left"></i> <span class="h3">Dossiês digitalizados</span>
        </p>
        <div class="block block-themed block-rounded shadow-lg">
            <div class="block-header bg-gd-emerald shadow">
                <h5 class="text-black mb-0">Utilize a busca abaixo para localizar um dossiê por matrícula ou por
                    nome.</h5>
            </div>
            <div class="block-content bg-primary">
                <form action="" method="post" onsubmit="return false;">
                    <div class="form-group row">
                        <div class="col-lg-4 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="registration-number">Número da
                                matrícula</label>
                            <input ref="fieldRegistration" v-model="searchRegistration" type="text"
                                   class="form-control form-control-lg" id="registration-number"
                                   name="registration-number" v-mask="'#####################'">
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="student-name">Nome do aluno</label>
                            <input v-model="searchName" type="text" class="form-control form-control-lg"
                                   id="student-name" name="student-name">
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2">Status</label>
                            <v-select :options="status" v-model="selected" @selected="focusButton"></v-select>
                        </div>
                        <div class="col-lg-2 col-md-6 pt-20 mt-5">
                            <button @click="getDossies(1)" ref="searchButton"
                                    class="btn btn-alt-primary btn-lg btn-block mt-1">Buscar <i
                                    class="fa fa-search ml-5"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="block mt-50">
            <div class="block mt-50">
                <div class="block-content" v-if="!loadingDossies">
                    <h5 class="pt-1 text-right">
                        <span class="mr-10"><strong>{{ totalCount }}</strong></span>
                        <small>registros encontrados</small>
                    </h5>
                    <table class="table table-vcenter">
                        <thead class="thead-light mb-50">
                        <tr class="p-50">
                            <th class="py-20"><b>Matrícula</b></th>
                            <th class="py-20"><b>Nome</b></th>
                            <th class="py-20"><b>Curso</b></th>
                            <th class="py-20"><b>Status</b></th>
                            <th class="py-20"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(customer, i) in searchResult" :key="i">
                            <th scope="row">{{ customer.registration }}</th>
                            <td>{{ customer.name }}</td>
                            <td>
                                {{ customer.course }}
                            </td>
                            <td>
                                <span v-if="customer.status === 'Novo'" class="badge badge-danger">Novo</span>
                                <span v-if="customer.status === 'Parcialmente Digitalizado'"
                                      class="badge badge-primary">Parcialmente Digitalizado</span>
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <router-link :to="'/scanned-selected/'+customer.jobId"
                                                 class="btn btn-lg btn-success mr-2" data-title="Iniciar classificação">
                                        <i class="fa fa-arrow-circle-right"></i></router-link>
                                    <button class="btn btn-lg btn-alt-primary mr-2" data-title="Excluir classificação"
                                            @click="deletePage(i)"><i class="fa fa-trash-o"></i></button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h2 class="text-center">
                        <i class="fa fa-spinner fa-spin"></i>
                    </h2>
                </div>
            </div>
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
        loadingDossies: true,
        searchName: '',
        searchRegistration: '',
        searchStatus: '',
        status: [
          {id: 0, label: 'Selecione'},
          {id: 1, label: 'Não iniciado'},
          {id: 2, label: 'Iniciado'}
        ],
        selected: {id: 0, label: 'Selecione'},
        totalCount: null,
        totalShow: 10,
        numPagination: 0,
        searchActivate: false
      }
    },
    methods: {
      focusButton() {
        this.$refs.searchButton.focus();
      },
      getDossies() {
        this.loadingDossies = true;

        let newUrlApi = '/Jobs/GetJobsByUser';
        api.get(newUrlApi).then(({data}) => {
          this.loadingDossies = false;
          this.searchResult = data.result;
          this.totalCount = this.searchResult.length;
          this.$refs.fieldRegistration.focus();
        });
      },

      // Deletar Dossiê
      deletePage(i) {
        let pageToDelete = {
          jobId: this.searchResult[i].jobId
        };
        return swal({
          title: 'Apagar Classificação',
          text: 'Deseja realmente excluir grupo de Dossiê?',
          type: "info",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        })
          .then(result => {
            if (result.value) {
              api.post('/Jobs/SetJobDelete', pageToDelete)
                .then(() => {
                  this.loadingDossies = false;
                  this.getDossies(0);
                })
                .catch(() => {
                  this.loading.pagesPdf = false;
                  this.loading.slicesCategory = false;
                  return swal({
                    title: 'Erro ao salvar recorte!',
                    toast: true,
                    timer: 3000,
                    type: "error",
                    showConfirmButton: false,
                  })
                })
            }
          })
      }
    },
    mounted() {
      this.getDossies();
    },
    watch: {
      selected: function () {
        if (this.selected !== 'Selecione') {
          this.$refs.searchButton.focus();
        }
      }
    }
  }
</script>