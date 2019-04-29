<!-- Page JS Plugins CSS -->
<template>
  <div class="rate-dossie-selected-group" v-if="itemsSliced !== null">
    <!-- Page Content -->
    <div class="row">
      <div class="col-8">
        <p class="content-heading pt-0">
          <i class="si si-arrow-left"></i><span class="h3">Classificar Dossiê - <span class="h5"><i>({{ itemsSliced.name }})</i></span></span>
          <router-link :to="'/rate-dossie/'" class="btn btn-dark btn-lg float-right shadow-sm text-uppercase">
            <i class="fa fa-arrow-left mr-10"></i> Voltar
          </router-link>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 left-content">
        <div class="block block-rounded shadow-sm pb-0 block-group">
          <div class="block-header" v-if="!loading.pagesPdf">
            <img class="mx-10" width="80" v-for="(item, i) in itemsSliced.slicePages" :key="i" :src="item.thumb"
                 alt="Pdf thumbnail" v-bind:class="stepClass(i)" @click="thumbNav(i)">
          </div>
          <div v-else>
            <h2 class="text-center">
              <i class="fa fa-spinner fa-spin"></i>
            </h2>
          </div>
          <div class="block-content pr-15 pt-0" v-if="!loading.pagesPdf">
            <div class="row">
              <div class="pt-30 pr-0" v-bind:class="{'col-10': !loading.buttonsPage, 'col-9': loading.buttonsPage}">
                <div class="col-1 loadImg vertical-align mx-auto" v-if="loadImg">
                  <i class="fa fa-spinner fa-spin fa-3x"></i>
                </div>
                <div class="pageContainer">
                  <div class="imgPage" v-dragged="onDragged">
                    <img draggable="false" id="imagePage" class="img-fluid" :src="imageUrl" alt="photo" ref="imagePage"
                         @load="imgLoaded" v-show="!loadImg">
                  </div>
                </div>
              </div>
              <div class="col-1 px-0 mx-0" v-if="loading.buttonsPage">
                <div class="row text-center vertical-align nav-pages">
                  <div class="col-12 px-0">
                    <a @click="navPage('next')" class="btn btn-lg btn-alt-primary pt-3 push"
                       data-title="Próxima página | ctrl + alt + → ">
                      <i class="fa fa-angle-double-right"></i>
                    </a>
                  </div>
                  <div class="col-12 px-0">
                    <a @click="navPage('prev')" class="btn btn-lg btn-alt-primary pt-3 push"
                       data-title="Voltar página | ctrl + alt + ← ">
                      <i class="fa fa-angle-double-left"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-2 bg-gray-lighter image-buttons">
                <div class="row text-center vertical-align">
                  <div class="col-12">
                    <a @click="zoomPage('zoomIn')" class="btn btn-lg btn-success pt-3 push text-white"
                       data-title="Aumentar zoom | ctrl + alt + z ">
                      <i class="fa fa-search-plus"></i>
                    </a>
                  </div>
                  <div class="col-12">
                    <a @click="zoomPage('zoomOut')" class="btn btn-lg btn-success pt-3 push text-white"
                       data-title="Diminuir zoom | ctrl + alt + x ">
                      <i class="fa fa-search-minus"></i>
                    </a>
                  </div>
                  <div class="col-12">
                    <a @click="pageRotate('l')" class="btn btn-lg btn-success pt-3 push text-white"
                       data-title="Rotacionar para esquerda | ctrl + alt + < ">
                      <i class="fa fa-rotate-left"></i>
                    </a>
                  </div>
                  <div class="col-12">
                    <a @click="pageRotate('r')" class="btn btn-lg btn-success pt-3 push text-white"
                       data-title="Rotacionar para direita | ctrl + alt + > ">
                      <i class="fa fa-rotate-right"></i>
                    </a>
                  </div>
                  <div class="col-12" v-if="loading.buttonsPage">
                    <a class="btn btn-lg btn-success js-tooltip pt-3 push text-white"
                       data-title="Excluir página | ctrl + alt + ◄ " data-toggle="modal" data-target="#modal-del-page">
                      <i class="fa fa-trash"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h2 class="text-center">
              <i class="fa fa-spinner fa-spin"></i>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p>
              <small><b>Aumentar Zoom:</b> ctrl + shift + z / <b>Diminuir Zoom:</b> ctrl + shift + x / <b>Rot.
                Esquerda:</b> ctrl + shift + < / <b>Rot. Direita:</b> ctrl + shift + > / <b>Apagar página</b> ctrl +
                shift + backspace / <b>Salvar</b> ctrl + shift + s / <b>Avançar página</b> ctrl + shift + → / <b>Voltar
                  página</b> ctrl + shift + ←
              </small>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 right-content">
        <div class="content-sidebar" ref="contentSidebar">
          <div class="block block-rounded shadow bg-primary student-data">
            <div class="block-header">
              <h4 class="block-title text-center text-white">Dados do aluno</h4>
            </div>
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
          <div class="block block-themed block-rounded shadow actions-content">
            <div class="block-header bg-gd-emerald shadow">
              <h4 class="block-title text-center text-white">Ações</h4>
            </div>
            <div class="block-content bg-primary pt-30 pb-10">
              <div class="form-group row actions-selected">
                <div class="col-md-6">
                  <router-link v-bind:to="'/rate-dossie-selected/' + id"
                               class="btn btn-sm btn-block btn-gray-300 mr-5 mb-5 shadow">
                    <b>Pendentes: </b><span>{{ student.notClassificated }}</span>
                  </router-link>
                </div>
                <div class="col-md-6">
                  <router-link v-bind:to="'/rate-dossie-selected/'+id"
                               class="btn btn-sm btn-block btn-gray-500 text-black mr-5 mb-5 shadow">
                    <b>Classificados: </b> <span>{{ student.classificated }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="block block-themed block-rounded shadow actions-content">
            <div class="block-header bg-gd-emerald">
              <h4 class="block-title text-center text-white">Campos para classificação</h4>
            </div>
            <div class="block-content bg-primary pt-10 pb-10">
              <form action="" method="post" onsubmit="return false;">
                <div class="form-group row">
                  <label class="col-12 col-form-label text-white" for="classification-code"><b>Código</b></label>
                  <div class="col-md-9 pr-0">
                    <input type="text" class="form-control" id="classification-code" ref="searchCode"
                           v-model="searchField" placeholder="Ex.: 001, 125.3">
                  </div>
                  <div class="col-md-3">
                    <button type="submit" class="btn btn-alt-primary btn-block p-0" @click="searchByCode">
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
                    <div class="scrumboard js-scrumboard col-12 p-0" v-for="(subCategory, index) in subCategories"
                         :key="index" v-if="subCategory.length > 0">
                      <div class="scrumboard-items block-content pt-0">
                        <div class="scrumboard-item badge-pill bg-primary text-black py-0 px-15">
                          <div class="scrumboard-item-content pt-5">
                            {{subCategory}}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12" v-bind:class="{'mt-20': this.additionalFields !== 0}">
                      <v-select ref="selectCategory" v-model="selected_category" :options="categories" label="name"
                                :selected="selected_category.name">
                        <span slot="no-options">Nenhum resultado encontrado</span>
                      </v-select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <form action="" method="post" onsubmit="return false;">
              <div class="aditionalFields bg-primary" v-if="additionalFields.length > 0">
                <div class="block-header rounded-0 px-0">
                  <h4 class="block-title bg-green-title py-5 px-15 text-dark text-center">Campos adicionais</h4>
                </div>

                <div class="block-content bg-primary pt-0">
                  <div v-for="(e, i) in additionalFields" :key="i">
                    <div class="form-group row">
                      <label class="col-12 col-form-label text-white" :for="'field'+i"><b>{{ e.name }}</b></label>
                      <div class="col-12">
                        <div v-if="itemsSliced.additionalFields.length === 0">
                          <input :ref="'identificador'+i" v-if="e.type==='string'" type="text" :data-vv-as="e.name"
                                 :name="e.categoryAdditionalFieldId.toString()" class="form-control" :id="'field'+i"
                                 v-model="additionalFields[i].value" v-validate="{required:e.required}">
                          <input :ref="'identificador'+i" v-if="e.type==='datetime'" type="text" :data-vv-as="e.name"
                                 :name="e.categoryAdditionalFieldId.toString()" class="form-control u-full-width"
                                 :id="'field'+i" placeholder="dd/mm/aaaa" v-mask="'##/##/####'"
                                 v-model="additionalFields[i].value"
                                 v-validate="{required:e.required,date_format:'DD/MM/YYYY'}"/>
                          <div v-if="e.type==='bool'">
                            <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" :id="'yes_field'+i" :data-vv-as="e.name"
                                     :name="e.categoryAdditionalFieldId.toString()" class="custom-control-input"
                                     value="SIM" v-model="additionalFields[i].value"
                                     v-validate="{required:e.required,included: ['SIM','NÃO']}">
                              <label class="custom-control-label text-white"
                                     :for="'yes_field'+i"><strong>Sim</strong></label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" :id="'no_field'+i" :data-vv-as="e.name"
                                     :name="e.categoryAdditionalFieldId.toString()" class="custom-control-input"
                                     value="NÃO" v-model="additionalFields[i].value">
                              <label class="custom-control-label text-white"
                                     :for="'no_field'+i"><strong>Não</strong></label>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <input :ref="'identificador'+i" v-if="e.type==='string'" type="text" :data-vv-as="e.name"
                                 :name="e.categoryAdditionalFieldId.toString()" class="form-control" :id="'field'+i"
                                 v-model="itemsSliced.additionalFields[i].value" v-validate="{required:e.required}">
                          <input :ref="'identificador'+i" v-if="e.type==='datetime'" type="text" :data-vv-as="e.name"
                                 :name="e.categoryAdditionalFieldId.toString()" class="form-control u-full-width"
                                 :id="'field'+i" placeholder="dd/mm/aaaa" v-mask="'##/##/####'"
                                 v-model="itemsSliced.additionalFields[i].value"
                                 v-validate="{required:e.required,date_format:'DD/MM/YYYY'}"/>
                          <div v-if="e.type==='bool'">
                            <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" :id="'yes_field'+i" :data-vv-as="e.name"
                                     :name="e.categoryAdditionalFieldId.toString()" class="custom-control-input"
                                     value="SIM" v-model="itemsSliced.additionalFields[i].value"
                                     v-validate="{required:e.required,included: ['SIM','NÃO']}">
                              <label class="custom-control-label text-white"
                                     :for="'yes_field'+i"><strong>Sim</strong></label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" :id="'no_field'+i" :data-vv-as="e.name"
                                     :name="e.categoryAdditionalFieldId.toString()" class="custom-control-input"
                                     value="NÃO" v-model="itemsSliced.additionalFields[i].value">
                              <label class="custom-control-label text-white"
                                     :for="'no_field'+i"><strong>Não</strong></label>
                            </div>
                          </div>
                        </div>
                        <span
                            class="text-danger-light">{{ errors.first(e.categoryAdditionalFieldId.toString()) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block-content bg-primary pt-0 pb-10">
                <div class="form-group row">
                  <div class="col-12 pt-20 mt-5">
                    <!--<button type="submit" class="btn btn-lg btn-dark shadow-sm btn-block text-uppercase" data-toggle="modal" data-target="#modal-save">-->
                    <!--<i class="fa fa-save"></i> Salvar-->
                    <!--</button>-->
                    <button type="submit" ref="saveCategoryButton"
                            class="btn btn-lg btn-dark shadow-sm btn-block text-uppercase"
                            @click="sendClassification()">
                      <i class="fa fa-save"></i> Salvar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Page Content -->
    <!-- Modal Agrupar -->
    <div class="modal fade" id="modal-save" tabindex="-1" role="dialog" aria-labelledby="modal-save"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-slideup" role="document">
        <div class="modal-content">
          <div class="block block-themed block-transparent mb-0 ">
            <div class="block-header bg-white p-0 pt-10 ml-20">
              <h3 class="block-title text-black"><b>Salvar classificação?</b></h3>
              <div class="block-options mr-15">
                <button type="button" class="btn-block-option text-dark" data-dismiss="modal"
                        aria-label="Close">
                  <i class="si si-close"></i>
                </button>
              </div>
            </div>
            <hr>
            <div class="block-content pt-0">
              <p>Você realmente deseja finalizar a classificação? Você não poderá retornar para o grupo de
                classificação atual.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-dark btn-lg float-right shadow-sm text-uppercase"
                    data-dismiss="modal"><i class="si si-check mr-10"></i> Salvar Grupo
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END Modal Agrupar -->

    <!-- Modal Delete Pages -->
    <div class="modal fade" ref="delmodal" id="modal-del-page" tabindex="-1" role="dialog"
         aria-labelledby="modal-del-page" aria-hidden="true">
      <div class="modal-dialog modal-dialog-slideup" role="document">
        <div class="modal-content">
          <div class="block block-themed block-transparent mb-0 ">
            <div class="block-header p-0 pt-10 mb-30">
              <h4 class="text-white mx-auto pt-10 pl-50"><b>Deletar página?</b></h4>
              <div class="block-options mr-15">
                <button type="button" class="btn-block-option text-dark" data-dismiss="modal" aria-label="Close">
                  <h5><i class="si si-close"></i></h5>
                </button>
              </div>
            </div>

            <div class="block-content pt-0">
              <h6 class="mb-20 mt-50">
                <small><i class="fa fa-chevron-right"></i></small>
                Deseja realmente remover a página?
              </h6>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-dark btn-lg float-right shadow-sm text-uppercase" data-dismiss="modal"
                    @click="deletePage()">
              <i class="si si-check mr-10"></i> Apagar página
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END Modal Delete Pages -->
  </div>
</template>

<script>
  import api from '../lib/api';
  import config from '../config/index';
  import swal from 'sweetalert2';

  export default {
    data() {
      return {
        apiUrl: config.apiUrl,
        id: this.$route.params.id,
        slice_id: this.$route.params.slice_id,
        categoryId: null,
        categories: [],
        itemsSliced: [],
        loading: {
          pagesPdf: false,
          pagesThumb: false,
          buttonsPage: false
          // addFields: false
        },
        imageUrl: '',
        countPage: 0,
        numPages: 1,
        slicePages: [],
        additionalFields: [],
        valClassFields: [],
        student: {
          name: '-',
          unity: '-',
          course: '-',
          registration: '-'
        },
        selected_category: 'Selecione',
        rotatePage: 0,
        zoom: 1,
        subCategories: [],
        validateSubCategories: false,
        searchField: '',
        loadImg: true,
        dragged: false,
        keys: []
      }
    },
    methods: {
      onDragged({el, deltaX, deltaY, first, last}) {
        if (first) {
          this.dragged = true;
          return
        }
        if (last) {
          this.dragged = false;
          return
        }
        let l = +window.getComputedStyle(el)['left'].slice(0, -2) || 0;
        let t = +window.getComputedStyle(el)['top'].slice(0, -2) || 0;
        el.style.left = l + deltaX + 'px';
        el.style.top = t + deltaY + 'px';
      },
      getPdf() {
        this.id = this.$route.params.id;
        this.slice_id = this.$route.params.slice_id;
        this.loading.pagesPdf = true;
        if (!this.slice_id) {
          api.get('/slices/GetSlicePending/' + this.id)
            .then(({data}) => {
              if(data.success === true) {
                if (data.result === null) {
                  let requestFinish = {
                    documentId: this.id,
                    documentStatusId: 6
                  };
                  api.post('/Documents/PostDocumentUpdateSatus', requestFinish)
                    .then(() => {
                    })
                    .catch(() => {
                    });
                  return swal({
                    title: 'Classificação de Dossiê finalizado!',
                    text: 'Todas os recortes foram classificadas com sucesso.',
                    type: "success",
                  })
                    .then(() => this.$router.push('/rate-dossie'))
                } else {
                  this.itemsSliced = data.result;
                  this.slice_id = this.itemsSliced.sliceId;
                  this.numPages = this.itemsSliced.slicePages.length;
                  this.loading.pagesPdf = false;
                  this.imageUrl = this.itemsSliced.slicePages[this.countPage].image;
                  this.$refs.searchCode.focus();

                  if (this.itemsSliced.slicePages.length >= 2) {
                    this.loading.buttonsPage = true;
                  } else {
                    this.loading.buttonsPage = false;
                  }
                }
              } else {
                return swal({
                  title: 'Erro desconhecido!',
                  text: 'Tente novamente mais tarde.',
                  type: "error",
                })
              }
            });
        } else {
          api.get('/slices/GetSliceById/' + this.slice_id)
            .then(({data}) => {
              if (this.itemsSliced === null) {
                let requestFinish = {
                  documentId: this.id,
                  documentStatusId: 6
                };
                api.post('/Documents/PostDocumentUpdateSatus', requestFinish)
                  .then(() => {

                  })
                  .catch(() => {

                  });

                return swal({
                  title: 'Classificação de Dossiê finalizado!',
                  text: 'Todas os recortes foram classificadas com sucesso.',
                  type: "success",
                })
                  .then(() => this.$router.push('/rate-dossie'))

              } else {
                this.itemsSliced = data.result;
                this.slice_id = this.itemsSliced.sliceId;
                this.numPages = this.itemsSliced.slicePages.length;
                this.loading.pagesPdf = false;
                this.imageUrl = this.itemsSliced.slicePages[this.countPage].image;
                this.$refs.searchCode.focus();
                this.$router.push('/rate-dossie-selected-single/' + this.id);

                if (this.itemsSliced.slicePages.length >= 2) {
                  this.loading.buttonsPage = true;
                } else {
                  this.loading.buttonsPage = false;
                }
                this.categoryId = this.itemsSliced.categoryId;
                this.updateSubCategories(this.categoryId);
              }
              this.updateSubCategories(this.categoryId);
            });
        }
      },
      getDetails() {
        this.id = this.$route.params.id;
        api.get('/documentDetails/GetDocumentDetailByDocumentId/' + this.id)
          .then(({data}) => {
            if(data.success === true) {
              this.student = data.result;
            }
          });
      },
      getCategories() {
        api.get('/categories/getCategories')
          .then(({data}) => {
            this.categories = data.result;
          });
      },
      updateSubCategories() {
        if (this.categoryId === null || this.categoryId === undefined) {
          this.categoryId = this.itemsSliced.categoryId;
        } else {
          api.get('/Categories/GetCategoryById/' + this.categoryId)
            .then(({data}) => {
              console.log('data', data.result)
              this.subCategories = data.result.parents;
              this.additionalFields = data.result.additionalFields;
              this.validateSubCategories = true;
              this.selected_category = data.result.name;
              let i;
              let numCat;
              if (this.additionalFields === null || this.additionalFields.length === 0) {
                this.$refs.saveCategoryButton.focus();
              }
              else if (this.additionalFields.length >= 1 && this.itemsSliced.additionalFields.length >= 1) {
                for (i = 0; i < 3; i++) {
                  this.additionalFields[i].value = this.itemsSliced.additionalFields[i].value;
                  this.$refs.identificador.focus();
                }
                numCat = this.categories.length;
                for (i = 0; i < numCat; i++) {
                  if (this.categories[i].categoryId === this.itemsSliced.categoryId) {
                    this.selected_category = this.categories[i].name;
                  }
                }
              }
              // else {
              //   this.selected_category =
              // }
            });
        }
      },
      thumbNav(stepElement) {
        this.loadImg = true;
        this.countPage = stepElement;
        this.imageUrl = this.itemsSliced.slicePages[this.countPage].image;
        this.stepClass(stepElement);
        this.pageRotate();
      },
      navPage: function (e) {
        this.loadImg = true;
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
        this.imageUrl = this.itemsSliced.slicePages[this.countPage].image;
        this.stepClass(this.countPage);
        this.pageRotate();
      },
      imgLoaded() {
        this.loadImg = false;
      },
      stepClass(stepElement) {
        if (stepElement === this.countPage) {
          return 'active';
        }
        if (stepElement !== this.countPage) {
          return '';
        }
      },
      zoomPage: function (e) {
        if (e === 'zoomIn' && this.zoom <= 2) {
          this.zoom += 0.1;
        } else if (e === 'zoomOut' && this.zoom > 0.3) {
          this.zoom -= 0.1;
        }
        this.$refs.imagePage.style.transform = ("scale(" + this.zoom + ") rotate(" + this.rotatePage + "deg)");
      },
      pageRotate(e) {
        let rotate = 0;

        this.rotatePage = this.itemsSliced.slicePages[this.countPage].rotate;

        if (this.rotatePage == null) {
          this.rotatePage = 0;
        }

        if (this.itemsSliced.slicePages[this.countPage].rotate === null) {
          this.rotatePage = 0
        } else {
          this.rotatePage = this.itemsSliced.slicePages[this.countPage].rotate
        }

        if (e === 'l') {
          rotate -= 90;
        } else if (e === 'r') {
          rotate += 90;
        } else {
          rotate = 0;
        }

        if ((this.rotatePage + rotate) > 270) {
          this.rotatePage = 0;
        } else if ((this.rotatePage + rotate) < 0) {
          this.rotatePage = 270;
        } else {
          this.rotatePage += rotate;
        }

        this.itemsSliced.slicePages[this.countPage].rotate = this.rotatePage;
        this.$refs.imagePage.style.transform = "rotate(" + this.rotatePage + "deg)";
      },
      sendClassification() {
        this.$validator.validate().then((result) => {
          if (result && this.validateSubCategories) {
            this.loading.pagesPdf = false;
            this.loading.pagesThumb = false;
            return swal({
              title: 'Confirmar classificação',
              text: 'Deseja realmente fazer a classificação?',
              showCancelButton: true,
              cancelButtonText: 'Cancelar'
              // timer: 3000,
              //type: "success",
            }).then(result => {
              if (result.value) {
                return this.postSubmit();
              }
            });
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
      postSubmit() {
        let request = {
          sliceId: this.slice_id,
          categoryId: this.categoryId,
          slicePages: this.itemsSliced.slicePages,
          additionalFields: this.additionalFields
        };
        this.loading.pagesPdf = true;
        this.loading.pagesThumb = true;

        api.post('/classifications', request)
          .then(() => {
            this.loading.pagesPdf = false;
            this.countPage = 0;
            this.itemsSliced = [];
            this.subCategories = [];
            this.selected_category = 'Selecione';
            this.additionalFields = 0;
            this.validateSubCategories = false;

            this.getDetails();
            this.getCategories();
            this.getPdf();
            return swal({
              title: 'Classificação do Dossiê salvo com sucesso!',
              toast: true,
              timer: 3000,
              type: "success",
              showConfirmButton: false,
            }).then(() => {

            })
          })
          .catch(() => {
            this.loading.pagesPdf = false;
            return swal({
              title: 'Erro ao salvar classificação!',
              toast: true,
              timer: 3000,
              type: "error",
              showConfirmButton: false,
            })
              .then(() => window.location.reload());
          })
      },
      deletePage() {
        let pageToDelete = {
          slicePageId: this.itemsSliced.slicePages[this.countPage].slicePageId
        };

        this.loading.pagesPdf = true;
        api.post('/SlicePages', pageToDelete)
          .then(() => {
            this.loading.pagesPdf = false;
            this.countPage = 0;
            this.getPdf();
            // this.getCategories();
            return swal({
              title: 'Página apagada com sucesso!',
              toast: true,
              timer: 3000,
              type: "success",
              showConfirmButton: false,
            });
          })
      },
      searchByCode() {
        api.get('/categories/GetCategoryBySearch?code=' + this.searchField)
          .then(({data}) => {
            this.categoryId = data.result.categoryId;
            this.updateSubCategories(this.categoryId);
            this.selected_category = {
              categoryId: data.result.categoryId,
              name: data.result.name
            }
            this.$refs.saveCategoryButton.focus();
            setTimeout(function () {
              window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            }, 800);
          })
          .catch(() => {
            this.loading.pagesPdf = false;
            return swal({
              title: 'Erro ao localizar Código da Categoria.',
              toast: true,
              timer: 3000,
              type: "error",
              showConfirmButton: false,
            })
          });
      },
      shortCut(e) {
        if (!e.shiftKey || !e.ctrlKey) {
          return
        }
        switch (e.code) {
          // Zoom In
          case "KeyZ":
            this.zoomPage('zoomIn');
            break;

          // Zoom Out
          case "KeyX":
            this.zoomPage('zoomOut');
            break;

          // Rotate Left
          case "Comma":
            this.pageRotate('l');
            break;

          // Rotate Right
          case "Period":
            this.pageRotate('r');
            break;

          // Navegation Left
          case "ArrowLeft":
            if (this.numPages > 1) {
              this.navPage('prev');
            }
            break;

          // Navegation Right
          case "ArrowRight":
            if (this.numPages > 1) {
              this.navPage('next');
            }
            break;

          // Navegation Left
          case "Backspace":
            if (this.numPages > 1) {
              $('#modal-del-page').modal('show');
              // this.$refs.delModal.modal('show');
            }
            break;
          // Focus on search code
          case "Space":
            this.$refs.searchCode.focus();
            break;

          // Save Button Classification
          case "KeyS":
            this.sendClassification();
            break;
        }
      },
      showSvg1() {
        const wrapper = this.$refs.contentSidebar;

        if (window.scrollY > 145) {
          wrapper.setAttribute('class', 'content-sidebar onScreen');
          window.onscroll = null;
        } else {
          wrapper.setAttribute('class', 'content-sidebar');
          window.onscroll = null;
        }
      }
    },
    watch: {
      selected_category(newVal) {
        if (newVal === 'Selecione' || newVal === null) {
          this.subCategories = [];
          this.selected_category = 'Selecione';
          this.additionalFields = 0;
          this.validateSubCategories = false;
        } else {
          this.categoryId = newVal.categoryId;
          this.updateSubCategories();
        }
        this.searchField = '';
      }
    },
    mounted() {
      if (this.sliceId !== null) {
        this.getDetails();
        this.getCategories();
        this.getPdf();
        this.updateSubCategories();
        this.$refs.searchCode.focus();
      }
    },
    created() {
      window.addEventListener('keyup', this.shortCut);
      window.addEventListener('scroll', this.showSvg1);
      setTimeout(function () {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
      }, 800);
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.shortCut);
      window.removeEventListener('scroll', this.showSvg1);
    }
  }
</script>
