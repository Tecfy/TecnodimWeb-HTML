<template>
  <div class="cut-dossie">
    <div class="row">
      <div class="col-8">
        <p class="content-heading pt-0">
          <i class="si si-arrow-left"></i> <span class="h3">Dossiês Digitalizados</span>
          <router-link :to="'/scanned/'" class="btn btn-dark btn-lg float-right shadow-sm text-uppercase">
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
              <strong>Recortes Pendentes</strong>
            </h3>
          </div>
          <div class="block-content" v-if="!loading.pagesPdf && slices[selectedJob].jobCategoryPages.length > 0">
            <div class="row">
              <div class="col-12 px-0">
                <div class="container">
                  <div class="row">
                    <div v-for="(item, i) in slices[selectedJob].jobCategoryPages" :key="i"
                         class=" col-sm-6 col-xl-3 mb-30 card-thumb">
                      <img width="200" :src="item.thumb"
                           alt="Pdf thumbnail"
                           class="selectable img-fluid shadow" draggable="false">

                      <div class="col-12">
                        <div class="zoom-content text-center">
                          <button @click="zoomImg(i)" data-toggle="modal"
                                  data-target="#modalZoomImg"
                                  class="btn btn-alt-primary btn-md px-4 text-uppercase my-5">
                            <i class="fa fa-search-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="selection-area" class="selection"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="!loading.pagesPdf && slices[selectedJob].jobCategoryPages.length === 0">
            <h5 class="text-center">Nenhum dossiê digitalizado.</h5>
          </div>
          <div v-else>
            <h2 class="text-center"><i class="fa fa-spinner fa-spin"></i></h2>
          </div>
        </div>
        <div class="block block-rounded shadow-sm pb-10 block-group">
          <div class="block-header">
            <h3 class="block-title"><strong>Classificações Realizadas</strong></h3>
          </div>
          <div class="block-content pt-0 pb-20" data-toggle="slimscroll" data-height="160px"
               data-color="#37b78c" data-opacity="1" data-size="8px" data-always-visible="true"
               data-rail-visible="true" data-rail-color="#eee" data-rail-opacity="1"
               v-if="!loading.slicesCategory">
            <div class="row">
              <div class="col-md-3 mt-4" v-for="(item,i) in slices" :key="i">
                <button type="button" class="btn btn-block y-3 text-left btn-outline-primary"
                        v-bind:title="item.category" @click="selectJob(i)"
                        v-bind:class="{'btn-outline-success': slices[i].send && slices[i].received, 'btn-outline-warning': !slices[i].send && slices[i].received, 'btn-outline-danger': !slices[i].received , 'active': classJob[i].selec}">
                  <i class="fa mr-5"
                     v-bind:class="{'fa-check-circle' : slices[i].send && slices[i].received, 'fa-upload': !slices[i].send && slices[i].received, 'fa-times-circle': !slices[i].received}"></i>
                  <span class="text-black">{{ item.category }}</span>
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <h2 class="text-center"><i class="fa fa-spinner fa-spin"></i></h2>
          </div>
        </div>
      </div>
      <div class="col-md-4 right-content">
        <div class="block block-rounded shadow bg-primary student-data">
          <div class="block-header">
            <h4 class="block-title text-center text-white">Dados do aluno</h4>
          </div>
          <div v-if="!loading.studentDetail">
            <div class="block-content">
              <p class="text-white"><i class="fa fa-file-text-o mr-10"></i><strong>Número da
                Matrícula:</strong> {{student.registration}}</p>
              <p class="text-white"><i class="fa fa-user mr-10"></i><strong>Nome:</strong> {{student.name}}
              </p>
              <p class="text-white"><i class="fa fa-building mr-10"></i><strong>Unidade:</strong>
                {{student.unity}}</p>
              <p class="text-white"><i class="fa fa-graduation-cap mr-1"></i><strong>Curso:</strong>
                {{student.course}}</p>
            </div>
          </div>
          <div v-else>
            <h2 class="text-center text-white"><i class="fa fa-spinner fa-spin"></i></h2>
          </div>
        </div>
        <div class="block block-themed block-rounded shadow actions-content">
          <div class="block-header bg-gd-emerald shadow">
            <h4 class="block-title text-center text-white">Ações / Classificação</h4>
          </div>
          <div class="aditionalFields bg-primary"
               v-if="loading.additionalFields && slices[selectedJob].additionalFields.length > 0">
            <div class="block-header rounded-0 px-0">
              <h4 class="block-title bg-green-title py-5 px-15 text-dark text-center">Campos adicionais</h4>
            </div>
            <div class="block-content bg-primary pt-0">
              <div v-for="(e, i) in slices[selectedJob].additionalFields" :key="i">
                <div class="form-group row">
                  <label class="col-12 col-form-label text-white" :for="'field'+i">
                    <b>{{ e.name }}</b>
                  </label>
                  <div class="col-12">
                    <input :ref="'identificador'+i" v-if="e.type==='string'" type="text"
                           :data-vv-as="e.name" :name="e.name.toString()"
                           class="form-control" :id="'field'+i"
                           v-model="slices[selectedJob].additionalFields[i].value"
                           v-validate="{required:e.required}">
                    <input :ref="'identificador'+i" v-if="e.type==='datetime'" type="text"
                           :data-vv-as="e.name" :name="e.name.toString()"
                           class="form-control u-full-width" :id="'field'+i"
                           placeholder="dd/mm/aaaa" v-mask="'##/##/####'"
                           v-model="slices[selectedJob].additionalFields[i].value"
                           v-validate="{required:e.required,date_format:'DD/MM/YYYY'}"/>
                    <div v-if="e.type==='bool'">
                      <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" :id="'yes_field'+i" :data-vv-as="e.name"
                               :name="e.name.toString()"
                               class="custom-control-input" value="SIM"
                               v-model="slices[selectedJob].additionalFields[i].value"
                               v-validate="{required:e.required,included: ['SIM','NÃO']}">
                        <label class="custom-control-label text-white"
                               :for="'yes_field'+i"><strong>Sim</strong></label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" :id="'no_field'+i" :data-vv-as="e.name"
                               :name="e.name.toString()"
                               class="custom-control-input" value="NÃO"
                               v-model="slices[selectedJob].additionalFields[i].value">
                        <label class="custom-control-label text-white"
                               :for="'no_field'+i"><strong>Não</strong></label>
                      </div>
                    </div>
                    <span class="text-danger-light">{{ errors.first(e.name.toString()) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="block-content bg-primary pt-30 pb-10">
            <div class="form-group row" v-if="!loading.slicesCategory">
              <div class="col-xs-12 col-md-6">
                <button type="submit" class="btn btn-alt-primary btn-lg btn-block text-uppercase"
                        :disabled="!loading.pagesPdf && slices[selectedJob].jobCategoryPages.length === 0"
                        @click="disapproveJobs">
                  <i class="fa fa-ban"></i> Recusar
                </button>
              </div>
              <div class="col-xs-12 col-md-6">
                <button type="button" class="btn btn-alt-primary btn-lg btn-block text-uppercase"
                        @click="deleteJobs">
                  <i class="fa fa-trash"></i> Deletar
                </button>
              </div>
              <div class="col-12 pt-20">
                <button type="button" class="btn btn-alt-primary btn-lg btn-block text-uppercase"
                        :disabled="!loading.pagesPdf && slices[selectedJob].jobCategoryPages.length === 0 || slices[selectedJob].send && slices[selectedJob].received"
                        @click="approveJobs">
                  <i class="fa fa-save"></i> Aprovar
                </button>
              </div>
            </div>
            <div v-else>
              <h2 class="text-center text-white"><i class="fa fa-spinner fa-spin"></i></h2>
            </div>
          </div>
        </div>
        <div class="block block-themed block-rounded shadow actions-content mb-200">
          <div class="block-header bg-gd-emerald">
            <h4 class="block-title text-center text-white">Nova classificação</h4>
          </div>
          <div class="block-content bg-primary pt-10 pb-10" v-if="!loading.slicesCategory">
            <form action="" method="post" onsubmit="return false;">
              <div class="form-group row">
                <label class="col-12 col-form-label text-white" for="classification-code"><b>Código</b></label>
                <div class="col-md-9 pr-0">
                  <input type="text" class="form-control" id="classification-code" ref="searchCode"
                         v-model="searchField" placeholder="Ex.: 001, 125.3">
                </div>
                <div class="col-md-3">
                  <button type="submit" class="btn btn-alt-primary btn-block p-0"
                          @click="searchByCode">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-12 text-white my-10">
                <b>Tipo</b>
              </div>
              <form action="" method="post" onsubmit="return false;" class="col-12">
                <div class="form-group row">
                  <div class="col-12">
                    <v-select ref="selectCategory" v-model="selected_category" :options="categories"
                              label="name" :selected="selected_category.categoryId"></v-select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="block-content bg-primary pt-10 pb-10" v-else>
            <h2 class="text-center text-white"><i class="fa fa-spinner fa-spin"></i></h2>
          </div>
          <form action="" method="post" onsubmit="return false;">

            <div class="block-content bg-primary pt-0 pb-10">
              <div class="form-group row">
                <div class="col-12">
                  <button type="submit" ref="saveCategoryButton"
                          class="btn btn-lg btn-dark shadow-sm btn-block text-uppercase"
                          @click="createNewCategory()">
                    <i class="fa fa-plus-square"></i> Nova classificação
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" ref="modalZoomImg" id="modalZoomImg" tabindex="-1" role="dialog"
         aria-labelledby="modalZoomImg" aria-hidden="true" v-if="!loading.pagesPdf">
      <div class="col-1 loadImg vertical-align mx-auto" v-if="loading.loadImg">
        <i class="fa fa-spinner fa-spin fa-4x text-white"></i>
      </div>
      <a @click="navPage('prev')" class="btn btn-lg btn-alt-primary pt-3 nav prev vertical-align pl-20 mb-50"
         data-nav="prev" data-toggle="cropper" data-method="prevPage" title="Voltar página"
         v-show="countPage !== 0">
        <i class="fa fa-angle-double-left"></i>
      </a>
      <a @click="navPage('next')" class="btn btn-lg btn-alt-primary pt-3 nav next vertical-align pl-20 mb-50"
         data-nav="next" data-toggle="cropper" data-method="nextPage" title="Avançar página"
         v-show="countPage !== slices[selectedJob].jobCategoryPages.length - 1">
        <i class="fa fa-angle-double-right"></i>
      </a>
      <div class="block-options mr-15 pull-right">
        <button type="button" class="btn-block-option btn-close" data-dismiss="modal" aria-label="Close">
          <i class="si si-close fa-3x text-white"></i>
        </button>
      </div>
      <div class="modal-dialog modal-dialog-slideup modal-lg" role="document">
        <div class="text-center">
          <img v-bind:src="linkImg" class="img-fluid" @load="imgLoaded" v-show="!loading.loadImg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../lib/api';
  import config from '../config/index';
  import swal from 'sweetalert2';

  export default {
    data() {
      return {
        jobId: '',
        loading: {
          studentDetail: true,
          pagesPdf: true,
          slicesCategory: true,
          hasCategory: false,
          loadImg: false,
          additionalFields: false
        },
        student: {
          name: '-',
          unity: '-',
          course: '-',
          registration: '-'
        },
        slices: [],
        selectedJob: 0,
        classJob: [],
        linkImg: '',
        pages: [],
        countPage: 0,
        itemsSliced: [],
        searchField: '',
        categories: [],
        subCategories: [],
        selected_category: 'Selecione',
        additionalFields: [],
        catFinished: ''
      }
    },
    methods: {
      getDetails() {
        this.loading.studentDetail = true;
        this.jobId = this.$route.params.id;
        api.get('/documentDetails/GetDocumentDetailByJobId/' + this.jobId)
          .then(({data}) => {
            if (data.success === true) {
              this.student = data.result;
              this.loading.studentDetail = false;
              this.selectJob(this.selectedJob);
            }
          });
      },
      getJobs() {
        this.loading.pagesPdf = true;
        this.loading.slicesCategory = true;
        api.get('/JobCategories/GetJobCategoriesByJobId?jobId=' + this.jobId)
          .then(({data}) => {
            this.slices = data.result;
            this.loading.pagesPdf = false;
            this.loading.slicesCategory = false;
            this.loadButtonJob();
            this.finishDossieClassificated();
          });
      },
      getCategories() {
        api.get('/categories/getCategories')
          .then(({data}) => {
            this.categories = data.result;
          });
      },
      loadButtonJob() {
        for (let num = 0; num < this.slices.length; num++) {
          this.classJob.push({
            selec: false
          })
        }
      },
      selectJob(i) {
        this.selectedJob = i;
        for (let num = 0; num < this.slices.length; num++) {
          this.classJob[num].selec = false;
        }
        this.classJob[i].selec = true;
        this.updateSubCategories(i);
      },
      zoomImg(e) {
        this.loading.loadImg = false;
        this.countPage = e;
        this.linkImg = this.slices[this.selectedJob].jobCategoryPages[this.countPage].image;
        this.countPage = e;
        this.selectPage = true;
      },
      imgLoaded() {
        this.loading.loadImg = false;
      },
      navPage: function (e) {
        this.loading.loadImg = true;
        if (e === "next") {
          if (this.countPage !== this.numPages - 1) {
            this.countPage++;
          } else {
            this.countPage = 0;
          }
        } else {
          if (this.countPage >= 1) {
            this.countPage--;
          } else {
            this.countPage = this.numPages - 1;
          }
        }
        this.zoom = 1;
        this.linkImg = this.slices[this.selectedJob].jobCategoryPages[this.countPage].image;
      },
      searchByCode() {
        api.get('/categories/GetCategoryBySearch?code=' + this.searchField)
          .then(({data}) => {
            this.selected_category = {
              categoryId: data.result.categoryId,
              name: data.result.name
            };
          })
          .catch(() => {
            this.loading.pagesPdf = false;
            this.selected_category = 'Selecione';
            return swal({
              title: 'Erro ao localizar Código da Categoria.',
              toast: true,
              timer: 3000,
              type: "error",
              showConfirmButton: false,
            })
          });
      },
      updateSubCategories(i) {
        if (this.slices[i].additionalFields === null || this.slices[i].additionalFields.length === 0) {
          this.loading.additionalFields = false;
        }
        else if (this.slices[this.selectedJob].additionalFields.length >= 1) {
          this.loading.additionalFields = true;
        }
      },
      approveJobs() {
        this.$validator.validate().then((result) => {
          if (result) {
            let request = {
              jobCategoryId: this.slices[this.selectedJob].jobCategoryId,
              additionalFields: this.slices[this.selectedJob].additionalFields
            }
            return swal({
              title: 'Aprovar Classificação',
              text: 'Aprovar classificação do dossiê?',
              type: "info",
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar'
            })
              .then(result => {
                if (result.value) {
                  api.post('/JobCategories/SetJobCategoryApprove', request)
                    .then(() => {
                      this.getJobs();
                      this.getCategories();
                    })
                    .catch(() => {
                      this.loading.pagesPdf = false;
                      this.loading.slicesCategory = false;
                      return swal({
                        title: 'Erro ao aprovar classificação!',
                        toast: true,
                        timer: 3000,
                        type: "error",
                        showConfirmButton: false,
                      })
                    })
                }
              })
          } else {
            return swal({
              title: 'Dossiê não classificado',
              text: 'Preencha todos os campos obrigatórios',
              timer: 3000,
              type: "error",
            });
          }
        })
      },
      deleteJobs: function () {
        if (this.selectedJob !== '') {
          let request = {
            jobCategoryId: this.slices[this.selectedJob].jobCategoryId
          }
          return swal({
            title: 'Apagar Classificação',
            text: 'Deseja realmente excluir grupo de Classificação?',
            type: "info",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          })
            .then(result => {
              if (result.value) {
                api.post('/JobCategories/SetJobCategoryDeleted', request)
                  .then(() => {
                    return swal({
                      title: 'Exclusão de grupo de classificação realizado com sucesso',
                      toast: true,
                      timer: 3000,
                      type: "success",
                      showConfirmButton: false
                    })
                      .then(() => {
                        this.getJobs();
                        this.selectedJob = 0;
                        this.getCategories();
                      })
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
        } else {
          return swal({
            title: 'Nenhuma categoria selecionada',
            toast: true,
            timer: 3000,
            type: "info",
            showConfirmButton: false,
          })
        }
      },
      disapproveJobs: function () {
        if (this.selectedJob !== '') {
          let request = {
            jobCategoryId: this.slices[this.selectedJob].jobCategoryId
          }
          return swal({
            title: 'Desaprovar Dossiê?',
            text: 'Deseja realmente desaprovar grupo de Dossiê?',
            type: "info",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          })
            .then(result => {
              if (result.value) {
                api.post('/JobCategories/SetJobCategoryDisapprove', request)
                  .then(() => {
                    return swal({
                      title: 'Grupo de Dossiê desaprovado com sucesso',
                      toast: true,
                      timer: 3000,
                      type: "success",
                      showConfirmButton: false
                    })
                      .then(() => {
                        this.getJobs();
                        this.getCategories();
                      })
                  })
                  .catch(() => {
                    this.loading.pagesPdf = false;
                    this.loading.slicesCategory = false;
                    return swal({
                      title: 'Erro excluir Dossiê!',
                      toast: true,
                      timer: 3000,
                      type: "error",
                      showConfirmButton: false,
                    })
                  })
              }
            });
        } else {
          return swal({
            title: 'Nenhuma categoria selecionada',
            toast: true,
            timer: 3000,
            type: "info",
            showConfirmButton: false,
          })
        }
      },
      createNewCategory() {
        let request = {
          jobId: this.jobId,
          categoryId: this.selected_category.categoryId
        };

        if (this.selected_category === "Selecione") {
          return swal({
            title: 'Selecione uma categoria para adicionar',
            toast: true,
            timer: 3000,
            type: "info",
            showConfirmButton: false,
          })
        }
        for (let i = 0; i < this.slices.length; i++) {
          if (this.categoryName === this.slices[i].category) {
            this.loading.hasCategory = true;
            break;
          } else {
            this.loading.hasCategory = false;
          }
        }
        if (!this.loading.hasCategory) {
          return swal({
            title: 'Envio de Novo Grupo',
            text: 'Deseja realmente incluir nova classificação?',
            type: "question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          })
            .then(result => {
              if (result.value) {
                api.post('/JobCategories/SetJobCategoryInclude', request)
                  .then(() => {
                    return swal({
                      title: 'Inclusão de nova classificação realizado com sucesso',
                      toast: true,
                      timer: 3000,
                      type: "success",
                      showConfirmButton: false
                    })
                      .then(() => {
                        this.getJobs();
                        this.getCategories();
                      })
                  })
                  .catch(() => {
                    this.loading.pagesPdf = false;
                    this.loading.slicesCategory = false;
                    return swal({
                      title: 'Erro ao salvar classificação!',
                      toast: true,
                      timer: 3000,
                      type: "error",
                      showConfirmButton: false,
                    })
                  })
              }
            })
        } else {
          return swal({
            text: 'Classificação já existe',
            toast: true,
            timer: 3000,
            type: "error",
            showConfirmButton: false,
          })
        }
      },
      finishDossieClassificated() {
        let numCategories = this.slices.length;
        for (let i = 0; i < numCategories; i++) {
          if (this.slices[i].received && this.slices[i].send) {
            this.catFinished++;
          }
        }

        if (this.catFinished === numCategories) {
          let request = {
            jobId: this.jobId,
            jobStatusId: 4
          };
          api.post('/Jobs/SetJobStatus', request)
            .then(() => {
              return swal({
                title: 'Classificação de Dossiê finalizado com sucesso',
                toast: true,
                timer: 3000,
                type: "success",
                showConfirmButton: false
              })

                .then(() => {
                  this.getJobs();
                  this.selectedJob = 0;
                  this.getCategories();
                  this.$router.push('/scanned');
                })
            })
            .catch(() => {
              this.loading.pagesPdf = false;
              this.loading.slicesCategory = false;
              return swal({
                title: 'Erro ao finalizar Dossiê',
                toast: true,
                timer: 3000,
                type: "error",
                showConfirmButton: false,
              })
            })
        }
      }
    },
    mounted() {
      this.getDetails();
      this.getJobs();
      this.getCategories();
    },
    watch: {
      selected_category(newVal) {
        if (newVal === 'Selecione' || newVal === null) {
          this.subCategories = [];
          this.selected_category = 'Selecione';
          this.additionalFields = 0;
        } else {
          this.categoryId = newVal.categoryId;
          this.categoryName = newVal.name;
        }
        this.searchField = '';
      }
    }
  }
</script>
