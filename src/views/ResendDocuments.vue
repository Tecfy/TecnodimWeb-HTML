<template>
    <div class="cut-dossie">
        <p class="content-heading">
            <i class="si si-arrow-left"></i> <span class="h3"> Reenviar Dossiês</span>
        </p>
        <div class="block block-themed block-rounded shadow-lg">
            <div class="block-header bg-gd-emerald shadow">
                <h5 class="text-black mb-0">Faça a busca do aluno pela matrícula, e selecione quais documentos deseja reenviar.</h5>
            </div>
            <div class="block-content bg-primary">
                <form action="" method="post" onsubmit="return false;">
                    <div class="form-group row">
                        <div class="col-lg-4 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="registration-number">Número da matrícula</label>
                            <input ref="fieldRegistration" v-model="searchRegistration" type="text" class="form-control form-control-lg" id="registration-number" name="registration-number" v-mask="'#####################'">
                        </div>
                        <div class="col-lg-2 col-md-6 pt-20 mt-5">
                            <button @click="getDossies()" ref="searchButton" class="btn btn-alt-primary btn-lg btn-block mt-1">Buscar <i class="fa fa-search ml-5"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="mt-50" v-if="!loadingDossies && !noDossies && searchRegistration != ''">
          <div class="row">
            <div class="col-md-4">
              <div class="block">
                <div class="block-content pb-4 text-center">
                  <h5 class="mb-0">
                    <b>Nome:</b> {{ this.searchResult[0].name }}
                  </h5>
                </div>
              </div>
            </div>                          
            <div class="col-md-4">
              <div class="block">
                <div class="block-content pb-4 text-center">
                  <h5 class="mb-0">
                    <b>CPF:</b> {{ this.searchResult[0].cpf }}                            
                  </h5>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="block">
                <div class="block-content pb-4 text-center">
                  <h5 class="mb-0">
                    <b>Matrícula:</b> {{ this.searchResult[0].registration }}
                  </h5>
                </div>
              </div>
            </div>                  
          </div>
        </div>

        <div class="block mt-30" v-if="!loadingDossies && !noDossies && searchRegistration != ''">
            <div class="block-content" >
                <table class="table table-vcenter mb-20" v-for="(customer, index) in searchResult" v-bind:key="index">
                    <thead class="thead-light mb-50">
                      <tr class="p-50">
                          <th class="py-10 align-middle" style="width: 40%;">
                            <b>Identificador SE</b><br>
                            {{ customer.documentId }}
                          </th>
                          <th class="py-10 align-middle" style="width: 40%;">
                            <b>Título do documento</b><br>
                            {{ customer.title }}                            
                          </th>
                          <th class="py-10 align-middle" style="width: 20%;"><b>Selecionar</b></th>
                          <th class="py-10 align-middle">
                            <button class="btn btn-lg btn-success" @click="openResendDocuments(index)">
                              <small class="text-white">Reenviar</small>
                            </button>
                          </th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(result, key) in customer.itens" v-bind:key="key">
                        <td style="width: 40%;">{{ result.title }}</td>
                        <!-- <td>{{ customer.name }}</td> -->
                        <td class="text-right" style="width: 40%;"></td>
                        <td style="width: 20%;">
                          <div class="custom-control custom-checkbox my-1 mr-sm-2">
                            <input type="checkbox" class="custom-control-input" :value="'check-'+index+'-'+key" :id="'check-'+index+'-'+key" v-model="checkedDocuments">
                            <label class="custom-control-label" :for="'check-'+index+'-'+key"></label>
                          </div>
                        </td>
                        <td class="text-right"></td>
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
        searchRegistration: '',
        totalShow: 10,
        searchActivate: false,
        checkedDocuments: [],
      }
    },
    methods: {
      getDossies() {
        let unityId = window.localStorage.selectedUnit;
        this.loadingDossies = true;
        let newUrlApi  = '/ResendDocuments/GetResendDocuments?registration=' + this.searchRegistration + '&unityId=' + unityId;

        if (this.searchRegistration.length !== 0) {
          newUrlApi += '&registration=' + this.searchRegistration;
        }

        api.get(newUrlApi).then(({data}) => {
          if(data.success === true) {
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
              console.log(data.result);
              this.loadingDossies = false;
              this.noDossies = false;
              this.searchResult = data.result;
            }
          } else {
            this.loadingDossies = false;
            this.noDossies = true;
            return swal({
              title: 'Erro desconhecido!',
              text: 'Tente novamente mais tarde.',
              type: "error",
            })
          }

        });
        this.$refs.fieldRegistration.focus();
      },

      openResendDocuments(index) {
        let documents = [];

        this.checkedDocuments.map((val, key) => {
          let posCheckSelected = parseInt(val.substr(6, 1));
          let posItemResult = parseInt(val.substr(8, 1));
          
          if (posCheckSelected === index) {
            documents.push(this.searchResult[posCheckSelected].itens[posItemResult]);
          }          
        });  
        
        if (documents.length !== 0) {
          let resendDocuments = {
            documentId: this.searchResult[index].documentId,
            unityId: window.localStorage.selectedUnit,
            registration: this.searchResult[0].registration,
            itens: documents,
          };
          // console.log(resendDocuments);
          return swal({
              title: 'Confirmação de reenvio',
              text: 'Deseja realmente reenviar os documentos selecionados?',
              type: "info",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Reenviar',
              cancelButtonText: 'Cancelar'
            })
            .then(result => {
              if (result.value) {
                api.post('/resendDocuments', resendDocuments)
                  .then((response) => {
                    this.loadingDossies = false;
                    this.checkedDocuments = [];
                    this.searchResult = [];
                    this.searchRegistration = '';
                    // this.getDossies();
                    debugger
                    if (response.data.success) {
                      return swal({
                        title: 'Documento reenviado para fila de recorte. Por favor, aguarde o tempo de processamento.',
                        toast: true,
                        timer: 10000,
                        type: "success",
                        showConfirmButton: false,
                      }).then(() => {                      
                        this.loadingDossies = false;
                        this.noDossies = true;
                      })
                    } else {
                      this.loadingDossies = false;
                      return swal({
                        title: 'Erro ao reenviar documentos!',
                        toast: true,
                        timer: 3000,
                        type: "error",
                        showConfirmButton: false,
                      }).then(() => {                      
                        this.loadingDossies = false;
                        this.noDossies = true;
                      })
                    }                
                  })
                  .catch(() => {
                    this.loadingDossies = false;
                    return swal({
                      title: 'Erro ao reenviar documentos!',
                      toast: true,
                      timer: 3000,
                      type: "error",
                      showConfirmButton: false,
                    })
                  })
              }
            })
        }           

               
        // console.log("documents", documents);
      }        
    },
    mounted() {
        this.$refs.fieldRegistration.focus();
    }
  }
</script>
