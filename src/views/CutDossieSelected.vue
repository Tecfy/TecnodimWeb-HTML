<style>
  .selection {
    position: absolute;
    border: 1px solid #37b78c;
    background-color: rgba(55, 183, 140, 0.4);
    z-index: 1;
    top: 0;
    left: 0;
    cursor: default;
    display: none;
  }

  .selectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .selected img {
    outline: 2px solid #00422c;
  }

  .selected .custom-checkbox label:before {
    background-color: #37b78c;
  }

  .selected .custom-checkbox label:after {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
  }

  .custom-control-label {
    z-index: 2;
  }
</style>

<template>
  <div class="cut-dossie">
    <div class="row">
      <div class="col-8">
        <p class="content-heading pt-0">
          <i class="si si-arrow-left"></i> <span class="h3">Recortar Dossiê</span>
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
            <h3 class="block-title"><strong>Recortes Pendentes
              <span>({{ numPendingPages() }})</span></strong>
            </h3>
          </div>
          <div class="block-content" v-if="!loading.pagesPdf">
            <div class="row">
              <div class="col-12 px-0">
                <div v-selectable="{ selectedGetter, selectedSetter, selectingSetter }" class="container" id="vsel">
                  <div class="row gutters-tiny js-gallery">
                    <div v-for="(item, i) in pages" :key="i" class=" col-sm-6 col-xl-3 mb-30 card-thumb"
                         :class="{ selected: !!selected[i], selecting: !!selecting[i] }">
                      <img width="200" :src="pathThumb.replace('{0}', item)" @mouseover="zoomImg('out')" alt="Pdf thumbnail"
                           class="selectable img-fluid shadow" draggable="false">
                      <div class="form-group">
                        <div class="custom-control custom-checkbox custom-control-inline">
                          <input title="check" class="custom-control-input" type="checkbox">
                          <label class="custom-control-label"></label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="zoom-content text-center">
                          <button @click="zoomImg(item)" @mouseover="zoomImg('over')" data-toggle="modal"
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
              <span> ({{ numGroupCreated() }})</span></strong></h3>
          </div>
          <div class="block-content pt-0 pb-20" data-toggle="slimscroll" data-height="160px"
               data-color="#37b78c" data-opacity="1" data-size="8px" data-always-visible="true"
               data-rail-visible="true" data-rail-color="#eee" data-rail-opacity="1"
               v-if="!loading.slicesCategory">
            <div class="row">
              <div class="col-md-3" v-for="(item,i) in slices" :key="i">
                <button type="button" class="btn btn-block btn-outline-primary my-3 text-left" v-bind:title="item.name">
                  <i class="fa fa-folder mr-5"></i> <span class="text-black">{{ item.name }}</span>
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
          <div class="block-header bg-gd-emerald shadow">
            <h4 class="block-title text-center text-white">Ações</h4>
          </div>
          <div class="block-content bg-primary pt-30 pb-10">
            <div class="form-group row actions-selected">
              <div class="col-md-6">
                <button type="button" class="btn btn-sm btn-block btn-gray-300 mr-5 mb-5 shadow">
                  <b>Selecionados: </b><span>{{ numSelected() }}</span>
                </button>
              </div>
              <div class="col-md-6">
                <button type="button"
                        class="btn btn-sm btn-block btn-gray-500 text-black mr-5 mb-5 shadow">
                  <b>Recortados: </b> <span>{{ numGroupCreated() }}</span>
                </button>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 mt-5">
                <hr>
              </div>
              <div class="col-12 pt-20">
                <button type="button" @click="openModal" class="btn btn-alt-primary btn-lg btn-block text-uppercase"
                        data-toggle="modal" data-target="#modalGroup" :disabled="!numSelected()">
                  <i class="fa fa-crop"></i> Recortar
                </button>
              </div>
              <div class="col-12 pt-20 mt-5">
                <button type="submit" @click="openModal" class="btn btn-alt-primary btn-lg btn-block text-uppercase"
                        data-toggle="modal" data-target="#modal-del-pages" :disabled="!numSelected()">
                  <i class="fa fa-trash"></i> Deletar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalGroup" tabindex="-1" role="dialog" aria-labelledby="modalGroup" aria-hidden="true"
         ref="modalTeste">
      <div class="modal-dialog modal-dialog-slideup" role="document">
        <div class="modal-content">
          <form>
            <div class="block block-themed block-transparent mb-0 ">
              <div class="block-header p-0 pt-10 mb-30">
                <h4 class="text-white mx-auto pt-10 pl-50"><b>Identificar novo recorte</b></h4>
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
                    <h4 class="block-title text-center text-dark">Você tem <strong>{{ numSelected() }}</strong> página{{
                      pluralAditional()}} selecionada{{ pluralAditional()}}.</h4>
                  </div>
                </div>
                <h6 class="mb-10 mt-50">
                  <small><i class="fa fa-chevron-right"></i></small>
                  Digite o <b>nome </b>para identificação do novo recorte.
                </h6>
                <div class="form-group mb-3">
                  <label class="mr-2 font-weight-bold" for="newSlice">{{ slices.length + 1 }} - </label>
                  <input type="text" class="form-control" v-model="newGroupName" placeholder="Digite aqui..."
                         ref="identificationField" tabindex="1" id="newSlice">
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
                  <h4 class="block-title text-center text-dark">Você tem <strong>{{ numSelected() }}</strong> página{{
                    pluralAditional()}} selecionada{{ pluralAditional()}}.</h4>
                </div>
              </div>
              <h6 class="mb-20 mt-50">
                <small><i class="fa fa-chevron-right"></i></small>
                Você tem <b>certeza</b> que deseja exluir a{{ pluralAditional()}} página{{ pluralAditional() }}?
              </h6>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-dark btn-lg float-right shadow-sm text-uppercase"
                    data-dismiss="modal" @click="deletePages"><i class="si si-check mr-10"></i> Apagar
              página{{ pluralAditional()}}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" ref="modalZoomImg" id="modalZoomImg" tabindex="-1" role="dialog"
         aria-labelledby="modalZoomImg" aria-hidden="true">
      <div class="col-1 loadImg vertical-align mx-auto" v-if="loadImg">
        <i class="fa fa-spinner fa-spin fa-4x text-white"></i>
      </div>
      <a @click="navPage('prev')" class="btn btn-lg btn-alt-primary pt-3 nav prev vertical-align pl-20 mb-50"
         data-nav="prev" data-toggle="cropper" data-method="prevPage" title="Voltar página" v-show="activePrevArrow">
        <i class="fa fa-angle-double-left"></i>
      </a>
      <a @click="navPage('next')" class="btn btn-lg btn-alt-primary pt-3 nav next vertical-align pl-20 mb-50"
         data-nav="next" data-toggle="cropper" data-method="nextPage" title="Avançar página"
         v-show="activeNextArrow">
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
          <img v-bind:src="linkImg" class="img-fluid" @load="imgLoaded" v-show="!loadImg">
        </div>
      </div>
    </div>
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
        selected: [],
        selecting: [],
        selectable: [],
        loading: {
          pagesPdf: true,
          slicesCategory: true
        },
        pages: [],
        path: '',
        pathThum: '',
        student: {
          name: '-',
          unity: '-',
          course: '-',
          registration: '-'
        },
        cutGroups: [],
        newGroupName: "",
        selectPage: false,
        apiUrl: config.apiUrl,
        slices: [],
        linkImg: '',
        linkPos: null,
        loadImg: false,
        activeNextArrow: true,
        activePrevArrow: true,
      }
    },
    methods: {
      zoomImg(e) {
        this.loadImg = true;
        let numPages = this.pages.length - 1;

        if (e === 'over') {
          this.selectPage = true;
        } else if (e === 'out') {
          this.selectPage = false;
        } else {
          this.linkImg = this.path.replace("{0}", e);
          this.loadImg = false;
          this.linkPos = e;
          this.selectPage = true;
          $('#modalZoomImg').modal({
            backdrop: 'static'
          });
        }
        this.pages.map((e, i) => {
          if (this.linkPos === e) {
            if (i === 0) {
              this.activePrevArrow = false;
            } else {
              this.activePrevArrow = true;
            }
            if (i === numPages) {
              this.activeNextArrow = false;
            } else {
              this.activeNextArrow = true;
            }
          }
        });
      },
      imgLoaded() {
        this.loadImg = false;
      },
      navPage(nav) {
        let numPages = this.pages.length;
        this.loadImg = true;

        if (nav === 'prev' && this.linkPos > 0) {
          this.linkPos--;
          this.linkImg = this.path.replace("{0}", this.linkPos);
        }

        if (nav === 'next' && this.linkPos < numPages) {
          this.linkPos++;
          this.linkImg = this.path.replace("{0}", this.linkPos);
        }

        this.pages.map((e, i) => {
          if (this.linkPos === e) {
            if (i === 0) {
              this.activePrevArrow = false;
            } else {
              this.activePrevArrow = true;
            }
            if (i === numPages - 1) {
              this.activeNextArrow = false;
            } else {
              this.activeNextArrow = true;
            }
          }

        });
      },
      async getValidate() {
        let id = this.$route.params.id;
        let sucesso = false;
        api.get('/documents/GetDocumentValidateSlice/' + id)
          .then(async ({data}) => {
            if(data.success === true) {
              this.getDetails();
              await this.getSlices();
              this.getPdf();              
            }
            else {
              let errorMessage = data.messages[0];
              return swal({
                text: errorMessage,
                timer: 10000,
                type: "error",
              })
              .then(() => this.$router.push('/cut-dossie'))
            }
          });
      },
      getDetails() {
        let id = this.$route.params.id;
        api.get('/documentDetails/GetDocumentDetailByDocumentId/' + id)
          .then(({data}) => {
            if(data.success === true) {
              this.student = data.result;
            }
          });
      },
      getPdf() {
        let id = this.$route.params.id;
        this.loading.pagesPdf = true;
        api.get('/PDFs/GetPDFs/' + id)
          .then(({data}) => {
            if (!data.success) {
              let errorMessage = data.messages[0];
              return swal({
                text: errorMessage,
                timer: 3000,
                type: "error",
              })
                .then(() => this.$router.push('/cut-dossie'))
            }
            if (data.result.pages.length === 0 && this.slices.length > 0) {
              let documentStatusId = this.slices.length > 0 ? 3 : 8;
              let requestFinish = {
                documentId: this.$route.params.id,
                documentStatusId: documentStatusId,
              };
              api.post('/Documents/PostDocumentUpdateSatus', requestFinish)
                .then(() => {
                })
                .catch(() => {
                });
              return swal({
                title: 'Dossiê finalizado!',
                text: 'Todas as páginas foram recortadas.',
                timer: 3000,
                type: "success",
              })
                .then(() => this.$router.push('/cut-dossie'))
            }
            else{
              this.pages = data.result.pages;
              this.path = data.result.path;
              this.pathThumb = data.result.pathThumb;
              this.loading.pagesPdf = false;
            }
          })
      },
      async getSlices() {
        let id = this.$route.params.id;
        this.loading.slicesCategory = true;
        await api.get('/slices/getSlicesByDocumentId/' + id)
          .then(({data}) => {
            this.slices = data.result;
            this.loading.slicesCategory = false;
          });
      },
      selectedGetter() {
        return this.selected;
      },
      selectedSetter(v) {
        if (!this.selectPage) {
          this.selected = v;
        }
      },
      selectingSetter(v) {
        if (!this.selectPage) {
          this.selecting = v;
        }
      },
      createGroup: function () {
        let itemsR = [];
        let itemsA = [];
        this.pages.map((page, index) => {
          let isSelected = this.selected[index];
          if (isSelected) {
            itemsR.push(this.pages[index]);
          } else {
            itemsA.push(this.pages[index]);
          }
        });
        this.pages = itemsA;

        let newCut = {
          name: (this.slices.length + 1) + " - " + this.newGroupName,
          items: itemsR
        };
        this.cutGroups.push(newCut);

        this.selected = Array(this.pages.length).fill(false);
        this.newGroupName = "";
        this.selectPage = false;

        return this.postCut(newCut);
      },
      postCut(newCut) {
        let pages = [];
        newCut.items.map(item => {
          pages.push({page: item});
        });

        let request = {
          documentId: this.$route.params.id,
          name: newCut.name,
          pages
        };

        this.loading.pagesPdf = true;
        this.loading.slicesCategory = true;
        api.post('/slices', request)
          .then(() => {
            this.loading.pagesPdf = false;
            this.loading.slicesCategory = false;
            this.getSlices();
            if (this.pages.length === 0) {
              let requestFinish = {
                documentId: this.$route.params.id,
                documentStatusId: 3
              };
              api.post('/Documents/PostDocumentUpdateSatus', requestFinish)
                .then(() => {

                })
                .catch(() => {

                });
              return swal({
                title: 'Dossiê finalizado!',
                text: 'Todas as páginas foram recortadas.',
                timer: 3000,
                type: "success",
              })
                .then(() => this.$router.push('/cut-dossie'))
            }
            return swal({
              title: 'Recorte salvo com sucesso!',
              toast: true,
              timer: 3000,
              type: "success",
              showConfirmButton: false,
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
              .then(() => window.location.reload());
          })
      },
      deletePages: function () {
        let itemsR = [];
        let itemsA = [];
        this.pages.map((page, index) => {
          let isSelected = this.selected[index];
          if (isSelected) {
            itemsR.push(this.pages[index]);
          } else {
            itemsA.push(this.pages[index]);
          }
        });
        let pages = [];
        itemsR.map(item => {
          pages.push({page: item.page});
        });

        let request = {
          documentId: this.$route.params.id,
          pages
        };

        this.loading.pagesPdf = true;
        this.loading.slicesCategory = true;
        api.post('/DeletedPages', request)
          .then(() => {
            this.pages = itemsA;
            this.loading.pagesPdf = false;
            this.loading.slicesCategory = false;

            this.selected = Array(this.pages.length).fill(false);
            this.selectPage = false;

            if (this.pages.length === 0) {
              let documentStatusId = this.slices.length > 0 ? 3 : 8;
              let requestFinish = {
                documentId: this.$route.params.id,
                documentStatusId: documentStatusId,
              };
              api.post('/Documents/PostDocumentUpdateSatus', requestFinish)
                .then(() => {
                  if (this.slices.length > 0) {
                    return swal({
                      title: 'Dossiê finalizado!',
                      text: 'Todas as páginas foram recortadas.',
                      timer: 3000,
                      type: "success",
                    })
                  } else {
                    return swal({
                      title: 'Dossiê sem recorte',
                      text: 'Dossiê não possui páginas para recorte',
                      timer: 3000,
                      type: "error",
                    })
                  }
                })
                .catch(() => {})
                .then(() => this.$router.push('/cut-dossie'))
            }
            return swal({
              title: 'Página' + this.pluralAditional() + ' apagada' + this.pluralAditional() + ' com sucesso!',
              toast: true,
              timer: 3000,
              type: "success",
              showConfirmButton: false,
            });
          })
          .catch(() => {
            this.loading.pagesPdf = false;
            this.loading.slicesCategory = false;
            return swal({
              title: 'Erro ao apagar página',
              toast: true,
              timer: 3000,
              type: "error",
              showConfirmButton: false,
            })
              .then(() => window.location.reload());
          })
      },
      allowSelectPages: function () {
        this.newGroupName = "";
        this.selectPage = false;
      },
      numSelected() {
        return this.selected.filter(e => {
          return e;
        }).length
      },
      numPendingPages() {
        return this.pages.length;
      },
      numGroupCreated() {
        return this.slices.length;
      },
      pluralAditional() {
        if (this.numSelected() === 1) {
          return ""
        } else {
          return "s"
        }
      },
      openModal() {
        setTimeout(function () {
          document.getElementById("newSlice").focus()
        }, 500);
        this.selectPage = true;
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

          // Save Button Recorta
          case "KeyS":
            this.sendClassification();
            break;
        }
      }
    },
    directives: {
      selectable
    },
    mounted() {
      this.getValidate();
    },
    created() {
      window.addEventListener('keyup', this.shortCut);
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.shortCut);
    }
  }
</script>
