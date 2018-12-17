<template>
    <div class="scanning-selected">
        <div class="row">
            <div class="col-8">
                <p class="content-heading pt-0">
                    <i class="si si-arrow-left"></i> <span class="h3">Classificar seleção</span>
                    <router-link :to="'/scanning/'" class="btn btn-dark btn-lg float-right shadow-sm text-uppercase">
                        <i class="fa fa-arrow-left mr-10"></i> Voltar
                    </router-link>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 left-content">
                <div class="block block-rounded shadow-sm pb-10 block-thumbails">
                    <div class="block-header">
                        <h3 class="block-title">
                            <strong>
                                Classificações selecionadas
                                <!--<span>({{ numPendingPages() }})</span>-->
                            </strong>
                        </h3>
                    </div>
                    <div class="block-content category-selected">
                        <div class="row">
                            <div class="mx-3" v-for="(item,i) in selected_category" :key="i">
                                <button type="button" class="btn btn-block btn-outline-primary my-2 text-left" v-bind:title="item.name">
                                    <i class="fa fa-folder mr-5"></i> <span class="text-black">{{ item.name }}</span>
                                    <i class="ml-20 close fa fa-close close" @click="removeCategory(i)"></i>
                                </button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 px-0">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="block block-rounded shadow-sm pb-10 block-group">
                    <div class="block-header">
                        <h3 class="block-title">
                            <strong>
                                Tipo de Classificação
                                <!--<span> ({{ numGroupCreated() }})</span>-->
                            </strong>
                        </h3>
                    </div>
                    <div class="block-content pt-0">
                        <div class="row">
                            <div class="col-12 px-0">
                                <form action="" method="post" onsubmit="return false;" class="col-12">
                                    <div class="row">
                                        <div class="scrumboard js-scrumboard col-12 p-0" v-for="(subCategory, index) in subCategories" :key="index" v-if="subCategory.length > 0">
                                            <div class="scrumboard-items block-content pt-0">
                                                <div class="scrumboard-item badge-pill bg-primary text-black py-0 px-15">
                                                    <div class="scrumboard-item-content pt-5">
                                                        {{subCategory}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-20">
                                            <v-select placeholder="Selecione uma catergoria" multiple ref="selectCategory" v-model="selected_category" :options="categories" label="name" class="btn-sm" :selected="selected_category.categoryId"></v-select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-md-4 right-content">
                <div class="block block-rounded shadow bg-primary student-data" v-if="loading.studentDetail">
                    <div class="block-header">
                        <h4 class="block-title text-center text-white">Dados do aluno</h4>
                    </div>
                    <div class="block-content">
                        <p class="text-white"><i class="fa fa-file-text-o mr-10"></i><strong>Número da
                            Matrícula:</strong> {{student[0].registration}}</p>
                        <p class="text-white"><i class="fa fa-user mr-10"></i><strong>Nome:</strong> {{student[0].name}}
                        </p>
                        <p class="text-white"><i class="fa fa-building mr-10"></i><strong>Unidade:</strong>
                            {{student[0].unity}}</p>
                        <p class="text-white"><i class="fa fa-graduation-cap mr-1"></i><strong>Curso:</strong>
                            {{student[0].course}}</p>
                    </div>
                </div>
                <div v-else>
                    <h2 class="text-center"><i class="fa fa-spinner fa-spin"></i></h2>
                </div>
                <div class="block block-themed block-rounded shadow actions-content">
                    <div class="block-header bg-gd-emerald shadow">
                        <h4 class="block-title text-center text-white">Ações</h4>
                    </div>
                    <div class="block-content bg-primary pt-30 pb-10">
                        <div class="form-group row">
                            <div class="col-12">
                                <button type="button" @click="sendClassification" class="btn btn-alt-primary btn-lg btn-block text-uppercase" data-toggle="modal" data-target="#modalGroup">
                                    <i class="fa fa-send"></i> Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import api from '../lib/api';
  // import config from '../config/index';
  import swal from 'sweetalert2';

  export default {
    data() {
      return {
        loading: {
          studentDetail: false
        },
        student: {
          name: '-',
          unity: '-',
          course: '-',
          registration: '-'
        },
        subCategories: [],
        additionalFields: [],
        categories: [],
        selected_category: [],
      }
    },
    methods: {

      getDetails() {
        let id = this.$route.params.id;
        let unityId = window.localStorage.selectedUnit;
        api.get('/documentDetails/GetDocumentDetailsByRegistration?registration=' + id + '&unityId='+unityId)
          .then(({data}) => {
            this.student = data.result;
            this.loading.studentDetail = true;
          });
      },
      getCategories() {
        api.get('/categories/getCategories')
          .then(({data}) => {
            this.categories = data.result;
          });
      },
      removeCategory(i) {
        this.selected_category.splice(i, 1);
        // console.log(i);
        // splice(0, 1);
      },
      openModal() {
        setTimeout(function(){
          document.getElementById("newSlice").focus()
        }, 500);
      },
      sendClassification() {
        if (this.selected_category.length === 0) {
          return swal({
            title: 'Erro ao enviar',
            text: 'Selecione ao menos uma categoria para salvar.',
            timer: 3000,
            type: "error",
          });
        } else {
          let jobCategories = [];
          this.selected_category.map(item => {
            jobCategories.push({categoryId: item.categoryId});
          });

          let request = {
            registration: this.student[0].registration,
            name: this.student[0].name,
            unityId: localStorage.getItem("selectedUnit"),
            course: this.student[0].course,
            jobCategories
          };
          api.post('/scannings', request)
            .then(() => {
              return swal({
                title: 'Envio de Seleção de classificação',
                text: 'Deseja realmente enviar a seleção de classificação?',
                type: "question",
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
              })
              .then(result => {
                if(result.value){
                  this.confirmationSend();
                }
              });
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
      },
      confirmationSend() {
        return swal({
          title: 'Envio de Seleção de classificação enviado com sucesso',
          toast: true,
          timer: 3000,
          type: "success",
          showConfirmButton: false
        })
          .then(() => this.$router.push('/scanned'));
      }
    },
    mounted() {
      this.getDetails();
      this.getCategories();
      // this.getSlices();
    }
  }
</script>
