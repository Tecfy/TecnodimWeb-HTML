<template>
    <div class="cut-dossie">
        <div class="row">
            <div class="col-8">
                <p class="content-heading pt-0">
                    <i class="si si-arrow-left"></i> <span class="h3">Dossiês Digitalizados</span>
                    <router-link :to="'/cut-dossie/'" class="btn btn-dark btn-lg float-right shadow-sm text-uppercase">
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
                            <strong>Recortes Pendentes
                                <!--<span>({{ numPendingPages() }})</span>-->
                            </strong>
                        </h3>
                    </div>
                    <div class="block-content" v-if="!loading.pagesPdf">
                        <div class="row">
                            <div class="col-12 px-0">
                                <div class="container">
                                    <div class="row">
                                        <div v-for="(item, i) in pages" :key="i"
                                             class=" col-sm-6 col-xl-3 mb-30 card-thumb">
                                            <img width="200" :src="apiUrl+item.thumb" alt="Pdf thumbnail"
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
                    <div v-else>
                        <h2 class="text-center"><i class="fa fa-spinner fa-spin"></i></h2>
                    </div>
                </div>

                <div class="block block-rounded shadow-sm pb-10 block-group" @mouseover="zoomImg('over')">
                    <div class="block-header">
                        <h3 class="block-title"><strong>Recortes Realizados
                            <!--<span> ({{ numGroupCreated() }})</span>-->
                        </strong></h3>
                    </div>
                    <div class="block-content pt-0 pb-20" data-toggle="slimscroll" data-height="160px"
                         data-color="#37b78c" data-opacity="1" data-size="8px" data-always-visible="true"
                         data-rail-visible="true" data-rail-color="#eee" data-rail-opacity="1"
                         v-if="!loading.slicesCategory">
                        <div class="row">
                            <div class="col-md-3" v-for="(item,i) in slices" :key="i">
                                <button type="button" class="btn btn-block btn-outline-primary my-3 text-left"
                                        v-bind:title="item.category">
                                    <i class="fa fa-folder mr-5"></i> <span class="text-black">{{ item.category }}</span>
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
                <div class="block block-rounded shadow bg-primary student-data ">
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
                                    <div class="scrumboard js-scrumboard col-12 p-0"
                                         v-for="(subCategory, index) in subCategories" :key="index"
                                         v-if="subCategory.length > 0">
                                        <div class="scrumboard-items block-content pt-0">
                                            <div class="scrumboard-item badge-pill bg-primary text-black py-0 px-15">
                                                <div class="scrumboard-item-content pt-5">
                                                    {{subCategory}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <v-select ref="selectCategory" v-model="selected_category" :options="categories"
                                                  label="name" :selected="selected_category.categoryId"></v-select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <form action="" method="post" onsubmit="return false;">
                        <div class="aditionalFields bg-primary" v-if="additionalFields.length > 0">
                            <div class="block-header rounded-0 px-0">
                                <h4 class="block-title bg-green-title py-5 px-15 text-dark text-center">Campos
                                    adicionais</h4>
                            </div>

                            <div class="block-content bg-primary pt-0">
                                <div v-for="(e, i) in additionalFields" :key="i">
                                    <div class="form-group row">
                                        <label class="col-12 col-form-label text-white" :for="'field'+i"><b>{{ e.name
                                            }}</b></label>
                                        <div class="col-12">
                                            <input :ref="'identificador'+i" v-if="e.type==='string'" type="text"
                                                   :data-vv-as="e.name" :name="e.categoryAdditionalFieldId.toString()"
                                                   class="form-control" :id="'field'+i"
                                                   v-model="additionalFields[i].value"
                                                   v-validate="{required:e.required}">
                                            <input :ref="'identificador'+i" v-if="e.type==='datetime'" type="text"
                                                   :data-vv-as="e.name" :name="e.categoryAdditionalFieldId.toString()"
                                                   class="form-control u-full-width" :id="'field'+i"
                                                   placeholder="dd/mm/aaaa" v-mask="'##/##/####'"
                                                   v-model="additionalFields[i].value"
                                                   v-validate="{required:e.required,date_format:'DD/MM/YYYY'}"/>
                                            <div v-if="e.type==='bool'">
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" :id="'yes_field'+i" :data-vv-as="e.name"
                                                           :name="e.categoryAdditionalFieldId.toString()"
                                                           class="custom-control-input" value="SIM"
                                                           v-model="additionalFields[i].value"
                                                           v-validate="{required:e.required,included: ['SIM','NÃO']}">
                                                    <label class="custom-control-label text-white" :for="'yes_field'+i"><strong>Sim</strong></label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" :id="'no_field'+i" :data-vv-as="e.name"
                                                           :name="e.categoryAdditionalFieldId.toString()"
                                                           class="custom-control-input" value="NÃO"
                                                           v-model="additionalFields[i].value">
                                                    <label class="custom-control-label text-white"
                                                           :for="'no_field'+i"><strong>Não</strong></label>
                                                </div>
                                            </div>
                                            <span class="text-danger-light">{{ errors.first(e.categoryAdditionalFieldId.toString()) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="block-content bg-primary pt-0 pb-10">
                            <div class="form-group row">
                                <div class="col-12">
                                    <button type="submit" ref="saveCategoryButton"
                                            class="btn btn-lg btn-dark shadow-sm btn-block text-uppercase"
                                            @click="createNewCategory()">
                                        <i class="fa fa-plus-square"></i> Adicionar nova categoria
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="block block-themed block-rounded shadow actions-content">
                    <div class="block-header bg-gd-emerald shadow">
                        <h4 class="block-title text-center text-white">Ações</h4>
                    </div>
                    <div class="block-content bg-primary pt-30 pb-10">
                        <div class="form-group row">
                            <div class="col-12">
                                <button type="submit" @click="openModal"
                                        class="btn btn-alt-primary btn-lg btn-block text-uppercase" data-toggle="modal"
                                        data-target="#modal-del-pages">
                                    <i class="fa fa-ban"></i> Recusar categoria
                                </button>
                            </div>
                            <div class="col-12 pt-20 mt-5">
                                <button type="submit" @click="openModal"
                                        class="btn btn-alt-primary btn-lg btn-block text-uppercase" data-toggle="modal"
                                        data-target="#modal-del-pages">
                                    <i class="fa fa-trash"></i> Deletar categoria
                                </button>
                            </div>
                            <div class="col-12 pt-20">
                                <button type="button" @click="openModal"
                                        class="btn btn-alt-primary btn-lg btn-block text-uppercase" data-toggle="modal"
                                        data-target="#modalGroup">
                                    <i class="fa fa-save"></i> Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END Page Content -->

        <!-- Modal Agrupar -->
        <div class="modal fade" id="modalGroup" tabindex="-1" role="dialog" aria-labelledby="modalGroup"
             aria-hidden="true" ref="modalTeste">
            <div class="modal-dialog modal-dialog-slideup" role="document">
                <div class="modal-content">
                    <form>
                        <div class="block block-themed block-transparent mb-0 ">
                            <div class="block-header p-0 pt-10 mb-30">
                                <h4 class="text-white mx-auto pt-10 pl-50"><b>Identificar novo recorte</b></h4>
                                <div class="block-options mr-15">
                                    <button type="button" class="btn-block-option text-dark" data-dismiss="modal"
                                            aria-label="Close">
                                        <h5><i class="si si-close"></i></h5>
                                    </button>
                                </div>
                            </div>
                            <div class="block-content pt-0">
                                <div class="block block-themed block-rounded shadow actions-content">
                                    <div class="block-header bg-white shadow">
                                        <h4 class="block-title text-center text-dark">Você tem
                                            <!--<strong>{{ numSelected() }}</strong> -->
                                            página selecionada.</h4>
                                    </div>
                                </div>
                                <h6 class="mb-10 mt-50">
                                    <small><i class="fa fa-chevron-right"></i></small>
                                    Digite o <b>nome </b>para identificação do novo recorte.
                                </h6>
                                <div class="form-group mb-3">
                                    <label class="mr-2 font-weight-bold" for="newSlice">{{ slices.length + 1 }}
                                        - </label>
                                    <input type="text" class="form-control" v-model="newGroupName"
                                           placeholder="Digite aqui..." ref="identificationField" tabindex="1"
                                           id="newSlice">
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer text-center">
                            <button type="submit" class="btn-dark btn-lg shadow-sm text-uppercase" data-dismiss="modal"
                                    @click="createGroup()"><i class="si si-check mr-10"></i> Salvar Grupo
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- END Modal Agrupar -->

        <!-- Modal Delete Pages -->
        <div class="modal fade" id="modal-del-pages" tabindex="-1" role="dialog" aria-labelledby="modal-del-pages"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-slideup" role="document">
                <div class="modal-content">
                    <div class="block block-themed block-transparent mb-0 ">
                        <div class="block-header p-0 pt-10 mb-30">
                            <h4 class="text-white mx-auto pt-10 pl-50"><b>Deletar seleção?</b></h4>
                            <div class="block-options mr-15">
                                <button type="button" class="btn-block-option text-dark" data-dismiss="modal"
                                        aria-label="Close" @click="allowSelectPages">
                                    <h5><i class="si si-close"></i></h5>
                                </button>
                            </div>
                        </div>

                        <div class="block-content pt-0">
                            <div class="block block-themed block-rounded shadow actions-content">
                                <div class="block-header bg-white shadow">
                                    <h4 class="block-title text-center text-dark">Você tem
                                        <!--<strong>{{ numSelected() }}</strong> -->
                                        página selecionada.</h4>
                                </div>
                            </div>

                            <h6 class="mb-20 mt-50">
                                <small><i class="fa fa-chevron-right"></i></small>
                                Você tem <b>certeza</b> que deseja exluir a página?
                            </h6>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-dark btn-lg float-right shadow-sm text-uppercase"
                                data-dismiss="modal" @click="deletePages"><i class="si si-check mr-10"></i> Apagar
                            página.
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- END Modal Delete Pages -->

        <!-- Modal Zoom Image -->
        <div class="modal fade" ref="modalZoomImg" id="modalZoomImg" tabindex="-1" role="dialog"
             aria-labelledby="modalZoomImg" aria-hidden="true">
            <div class="col-1 loadImg vertical-align mx-auto" v-if="loadImg">
                <i class="fa fa-spinner fa-spin fa-4x text-white"></i>
            </div>
            <a @click="navPage('prev')" class="btn btn-lg btn-alt-primary pt-3 nav prev vertical-align pl-20 mb-50"
               data-nav="prev" data-toggle="cropper" data-method="prevPage" title="Voltar página"
               v-show="linkPos !== 0">
                <i class="fa fa-angle-double-left"></i>
            </a>
            <a @click="navPage('next')" class="btn btn-lg btn-alt-primary pt-3 nav next vertical-align pl-20 mb-50"
               data-nav="next" data-toggle="cropper" data-method="nextPage" title="Avançar página"
               v-show="linkPos !== pages.length - 1">
                <i class="fa fa-angle-double-right"></i>
            </a>
            <div class="block-options mr-15 pull-right">
                <button type="button" class="btn-block-option btn-close" data-dismiss="modal" aria-label="Close"
                        @click="allowSelectPages">
                    <i class="si si-close fa-3x text-white"></i>
                </button>
            </div>
            <div class="modal-dialog modal-dialog-slideup modal-lg" role="document">
                <div class="text-center">
                    <img v-bind:src="apiUrl+linkImg" class="img-fluid" @load="imgLoaded" v-show="!loadImg">
                </div>
            </div>
        </div>
        <!-- END Modal Zoom Image -->
    </div>
</template>

<script>
  import selectable from 'vue-selectable';
  import api from '../lib/api';
  import config from '../config/index';
  import swal from 'sweetalert2';

  export default {
    data() {
      return {
        jobId: '',
        loading: {
          pagesPdf: true,
          slicesCategory: true
        },
        pages: [],
        student: {
          name: '-',
          unity: '-',
          course: '-',
          registration: '-'
        },
        // cutGroups: [],
        // newGroupName: "",
        // selectPage: false,
        apiUrl: config.apiUrl,
        slices: [],
        linkImg: '',
        linkPos: null,
        loadImg: false,
        searchField: '',
        subCategories: [],
        selected_category: 'Selecione',
        additionalFields: [],
        categoryId: '',
        categoryName: '',
        // itemsSliced: [],
        categories: [],
        // selectedNewCategory: '',
        // selectedNewCategoryId: '',
        newGroupName: '',
        // newGroupId: ''
      }
    },
    methods: {
      // Carrega Dados do Aluno
      getDetails() {
        this.jobId = this.$route.params.id;
        api.get('/documentDetails/GetDocumentDetailByDocumentId/' + this.jobId)
          .then(({data}) => {
            this.student = data.result;
          });
      },
      // Carrega Recortes Realizados
      getSlices() {
        this.loading.slicesCategory = true;
        api.get('/JobCategories/GetJobCategoriesByJobId?jobId=' + this.jobId)
          .then(({data}) => {
            this.slices = data.result;
            this.loading.slicesCategory = false;
          });
      },
      getCategories() {
        api.get('/categories/getCategories')
          .then(({data}) => {
            this.categories = data.result;
          });
      },
      // Busca por código Campo de classificação
      searchByCode() {
        api.get('/categories/GetCategoryBySearch?code=' + this.searchField)
          .then(({data}) => {

            this.selected_category = {
              categoryId: data.result.categoryId,
              name: data.result.name
            };

            this.$refs.saveCategoryButton.focus();
            setTimeout(function () {
              window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            }, 800);
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
      // updateSubCategories() {
      //   if (this.categoryId === null || this.categoryId === undefined) {
      //     this.categoryId = this.itemsSliced.categoryId;
      //   } else {
      //     api.get('/Categories/GetCategoryById/' + this.categoryId)
      //       .then(({data}) => {
      //
      //         this.subCategories = data.result.parents;
      //         this.additionalFields = data.result.additionalFields;
      //
      //         // let i;
      //         //let numCat;
      //         if (this.additionalFields === null || this.additionalFields.length === 0) {
      //           console.log('opre');
      //           this.$refs.saveCategoryButton.focus();
      //         }
      //
      //         else if (this.additionalFields.length >= 1) {
      //           for (var i = 0; i < 3; i++) {
      //             console.log('this.additionalFields', this.additionalFields);
      //             //this.additionalFields[i].value = this.additionalFields[i].value;
      //             this.$refs.identificador.focus();
      //             //console.log('aqui');
      //           }
      //           for (i = 0; i < this.additionalFields.length; i++) {
      //             if (this.categories[i].categoryId === this.itemsSliced.categoryId) {
      //               this.selected_category = this.categories[i].name;
      //               //console.log(this.selected_category)
      //               // this.$refs.Identificador0.focus();
      //             }
      //           }
      //         }
      //
      //       });
      //   }
      // },
      zoomImg(e) {
      //   this.loadImg = true;
      //   if (e === 'over') {
      //     this.selectPage = true;
      //   } else if (e === 'out') {
      //     this.selectPage = false;
      //   } else {
      //     this.linkImg = this.pages[e].image;
      //     this.linkPos = e;
      //     this.selectPage = true;
      //     $('#modalZoomImg').modal({
      //       backdrop: 'static'
      //
      //     });
      //   }
      },
      imgLoaded() {
      //   this.loadImg = false;
      },
      // navPage(nav) {
      //   let numPages = this.pages.length;
      //   this.loadImg = true;
      //
      //   if (nav === 'prev' && this.linkPos > 0) {
      //     this.linkPos--;
      //     this.linkImg = this.pages[this.linkPos].image;
      //   } else if (nav === 'next' && this.linkPos < numPages - 1) {
      //     this.linkPos++;
      //     this.linkImg = this.pages[this.linkPos].image;
      //   }
      // },

      // getPdf() {
      //   let id = this.$route.params.id;
      //   this.loading.pagesPdf = true;
      //   api.get('/PDFs/GetPDFs/' + id)
      //     .then(({data}) => {
      //       this.pages = data.result;
      //       this.loading.pagesPdf = false;
      //     });
      // },

      // createGroup: function () {
      //   let itemsR = [];
      //   let itemsA = [];
      //   this.pages.map((page, index) => {
      //     let isSelected = this.selected[index];
      //     if (isSelected) {
      //       itemsR.push(this.pages[index]);
      //     } else {
      //       itemsA.push(this.pages[index]);
      //     }
      //   });
      //   this.pages = itemsA;
      //
      //   let newCut = {
      //     name: (this.slices.length + 1) + " - " + this.newGroupName,
      //     items: itemsR
      //   };
      //   this.cutGroups.push(newCut);
      //
      //   //this.selected = Array(this.pages.length).fill(false);
      //   this.newGroupName = "";
      //   this.selectPage = false;
      //
      //   return this.postCut(newCut);
      // },
      // postCut(newCut) {
      //   let pages = [];
      //   newCut.items.map(item => {
      //     pages.push({page: item.page});
      //   });
      //
      //   // this.getPdf();
      //   let request = {
      //     documentId: this.$route.params.id,
      //     name: newCut.name,
      //     pages
      //   };
      //
      //   this.loading.pagesPdf = true;
      //   this.loading.slicesCategory = true;
      //   api.post('/slices', request)
      //     .then(() => {
      //       this.loading.pagesPdf = false;
      //       this.loading.slicesCategory = false;
      //       this.getSlices();
      //       if (this.pages.length === 0) {
      //         let requestFinish = {
      //           documentId: this.$route.params.id,
      //           documentStatusId: 3
      //         };
      //         api.post('/Documents/PostDocumentUpdateSatus', requestFinish)
      //           .then(() => {
      //
      //           })
      //           .catch(() => {
      //
      //           });
      //         return swal({
      //           title: 'Dossiê finalizado!',
      //           text: 'Todas as páginas foram classificadas.',
      //           timer: 3000,
      //           type: "success",
      //         })
      //           .then(() => this.$router.push('/cut-dossie'))
      //       }
      //       return swal({
      //         title: 'Recorte salvo com sucesso!',
      //         toast: true,
      //         timer: 3000,
      //         type: "success",
      //         showConfirmButton: false,
      //       });
      //     })
      //     .catch(() => {
      //       this.loading.pagesPdf = false;
      //       this.loading.slicesCategory = false;
      //       return swal({
      //         title: 'Erro ao salvar recorte!',
      //         toast: true,
      //         timer: 3000,
      //         type: "error",
      //         showConfirmButton: false,
      //       })
      //         .then(() => window.location.reload());
      //     })
      // },
      allowSelectPages() {
      //   this.newGroupName = "";
      //   this.selectPage = false;
      },



      deletePages: function () {
      //   // let itemsR = [];
      //   // let itemsA = [];
      //   // this.pages.map((page, index) => {
      //   //     let isSelected = this.selected[index];
      //   //     if (isSelected) {
      //   //         itemsR.push(this.pages[index]);
      //   //     } else {
      //   //         itemsA.push(this.pages[index]);
      //   //     }
      //   // });
      //   // // Paginas a deletar
      //   // let pages = [];
      //   // itemsR.map(item => {
      //   //     pages.push({page: item.page});
      //   // });
      //   //
      //   // let request = {
      //   //     documentId: this.$route.params.id,
      //   //     pages
      //   // };
      //   //
      //   // this.loading.pagesPdf = true;
      //   // this.loading.slicesCategory = true;
      //   // api.post('/DeletedPages', request)
      //   //     .then(() => {
      //   //         //Só atualiza localmente (this.pages) se a requisição for feita com sucesso
      //   //         this.pages = itemsA;
      //   //         this.loading.pagesPdf = false;
      //   //         this.loading.slicesCategory = false;
      //   //
      //   //
      //   //         this.selected = Array(this.pages.length).fill(false);
      //   //         this.selectPage = false;
      //   //
      //   //         if (this.pages.length === 0) {
      //   //             return swal({
      //   //                 title: 'Dossiê finalizado!',
      //   //                 text: 'Todas as páginas foram classificadas.',
      //   //                 timer: 3000,
      //   //                 type: "success",
      //   //             })
      //   //                 .then(() => this.$router.push('/cut-dossie'))
      //   //         }
      //   //         return swal({
      //   //             title: 'Página' + this.pluralAditional() +' apagada'+ this.pluralAditional() +' com sucesso!',
      //   //             toast: true,
      //   //             timer: 3000,
      //   //             type: "success",
      //   //             showConfirmButton: false,
      //   //         });
      //   //     })
      //   //     .catch(() => {
      //   //         this.loading.pagesPdf = false;
      //   //         this.loading.slicesCategory = false;
      //   //         return swal({
      //   //             title: 'Erro ao apagar página',
      //   //             toast: true,
      //   //             timer: 3000,
      //   //             type: "error",
      //   //             showConfirmButton: false,
      //   //         })
      //   //             .then(() => window.location.reload());
      //   //     })
      },
      // numGroupCreated() {
      //   return this.slices.length;
      // },
      openModal() {
      //   setTimeout(function () {
      //     document.getElementById("newSlice").focus()
      //   }, 500);
      //   this.selectPage = true;
      },
      // shortCut(e) {
      //     if (!e.shiftKey || !e.ctrlKey) {
      //         return
      //     }
      //     switch (e.code) {
      //         // Zoom In
      //         case "KeyZ":
      //             this.zoomPage('zoomIn');
      //             break;
      //
      //         // Zoom Out
      //         case "KeyX":
      //             this.zoomPage('zoomOut');
      //             break;
      //
      //         // Rotate Left
      //         case "Comma":
      //             this.pageRotate('l');
      //             break;
      //
      //         // Rotate Right
      //         case "Period":
      //             this.pageRotate('r');
      //             break;
      //
      //         // Navegation Left
      //         case "ArrowLeft":
      //             if (this.numPages > 1) {
      //                 this.navPage('prev');
      //             }
      //             break;
      //
      //         // Navegation Right
      //         case "ArrowRight":
      //             if (this.numPages > 1) {
      //                 this.navPage('next');
      //             }
      //             break;
      //
      //         // Navegation Left
      //         case "Backspace":
      //             if (this.numPages > 1) {
      //                 $('#modal-del-page').modal('show');
      //                 // this.$refs.delModal.modal('show');
      //             }
      //             break;
      //
      //         // Focus on search code
      //         case "Space":
      //             this.$refs.searchCode.focus();
      //             break;
      //
      //         // Save Button Classification
      //         case "KeyS":
      //             this.sendClassification();
      //             break;
      //     }
      // }
      createNewCategory() {
        // this.selectedNewCategory = this.selected_category;

        let request = {
          jobId: this.jobId,
          categoryId: this.selected_category.categoryId
        };

        api.post('/JobCategories/SetJobCategoryInclude', request)
          .then(() => {
            return swal({
              title: 'Envio de Novo Grupo',
              text: 'Deseja realmente enviar a seleção de classificação?',
              type: "success",
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar'
            })
              .then(result => {
                if(result.value){
                  //this.confirmationSend();
                  console.log('enviado')
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


        // if (this.selectedNewCategory === "" || this.selectedNewCategory === undefined || this.selectedNewCategory === 'Selecione') {
        //   return swal({
        //     title: 'Nenhum tipo de classificação selecionado.',
        //     toast: true,
        //     timer: 3000,
        //     type: "error",
        //     showConfirmButton: false,
        //   })
        // } else {
        //   // this.selectedNewCategory = this.selected_category;
        //   // this.newGroupName = this.selected_category.name;
        //   // this.newGroupId = this.selected_category.categoryId;
        //
        //   // console.log(this.newGroupId);
        //
        //   let newGroup = {
        //     category: this.selected_category.name,
        //     jobCategoryId: this.selected_category.categoryId
        //   };
        //   console.log(newGroup);
          // this.slices.push(newGroup);

          // this.slices.push(this.selectedNewCategory);

            //console.log();
        // }
      },
    },
    mounted() {
      this.getDetails();
      this.getSlices();
      this.getCategories();
      this.getPdf();
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
          // this.updateSubCategories();
          setTimeout(function () {
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          }, 800);
        }
        this.searchField = '';
        //console.log('this.additionalFields', this.additionalFields);
      }
    }
  }
</script>
