<!-- Page JS Plugins CSS -->
<template>
    <div class="rate-dossie-selected-group">
        <!-- Page Content -->
        <div class="row">
            <div class="col-8">
                <p class="content-heading pt-0">
                    <i class="si si-arrow-left"></i><span class="h3">Classificar Dossiê - <span class="h5"><i>({{ itemsSliced.name }})</i></span></span>
                    <a href="#" class="btn btn-dark btn-lg float-right shadow-sm text-uppercase">
                        <i class="fa fa-arrow-left mr-10"></i> Voltar
                    </a>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 left-content">
                <div class="block block-rounded shadow-sm pb-0 block-group">
                    <div class="block-header" v-if="!loading.pagesPdf">
                        <img class="mx-10" width="80" v-for="(item, i) in itemsSliced.slicePages" :key="i" :src="apiUrl+item.thumb" alt="Pdf thumbnail" v-bind:class="stepClass(i)" @click="thumbNav(i)">
                    </div>
                    <div v-else>
                        <h2 class="text-center">
                            <i class="fa fa-spinner fa-spin"></i>
                        </h2>
                    </div>
                    <div class="block-content pr-15 pt-0" v-if="!loading.pagesPdf">
                        <div class="row">
                            <div class="pt-30 pr-0" v-bind:class="{'col-10': itemsSliced.slicePages.length === 1, 'col-9': itemsSliced.slicePages.length !== 1}">
                                <div class="col-1 loadImg vertical-align mx-auto" v-if="loadImg">
                                    <i class="fa fa-spinner fa-spin fa-3x"></i>
                                </div>
                                <div class="pageContainer">
                                    <div class="imgPage" v-dragged="onDragged">
                                        <img id="imagePage" class="img-fluid" :src="apiUrl+itemsSliced.slicePages[countPage].image" alt="photo" ref="imagePage" @load="imgLoaded" v-show="!loadImg">
                                    </div>
                                </div>
                            </div>
                            <div class="col-1 px-0 mx-0" v-if="itemsSliced.slicePages.length !== 1">
                                <div class="row text-center vertical-align nav-pages" >
                                    <div class="col-12 px-0">
                                        <a @click="navPage('next')" class="btn btn-lg btn-alt-primary pt-3 push" title="Próxima página">
                                            <i class="fa fa-angle-double-right"></i>
                                        </a>
                                    </div>
                                    <div class="col-12 px-0">
                                        <a @click="navPage('prev')" class="btn btn-lg btn-alt-primary pt-3 push" title="Voltar página">
                                            <i class="fa fa-angle-double-left"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 bg-gray-lighter image-buttons">
                                <div class="row text-center vertical-align">
                                    <div class="col-12">
                                        <a @click="zoomPage('zoomIn')" class="btn btn-lg btn-success pt-3 push text-white" title="Aumentar zoom">
                                            <i class="fa fa-search-plus"></i>
                                        </a>
                                    </div>
                                    <div class="col-12">
                                        <a @click="zoomPage('zoomOut')" class="btn btn-lg btn-success pt-3 push text-white" title="Diminuir zoom">
                                            <i class="fa fa-search-minus"></i>
                                        </a>
                                    </div>
                                    <div class="col-12">
                                        <a @click="pageRotate('l')" class="btn btn-lg btn-success pt-3 push text-white" title="Rotacionar para esquerda">
                                            <i class="fa fa-rotate-left"></i>
                                        </a>
                                    </div>
                                    <div class="col-12">
                                        <a @click="pageRotate('r')" class="btn btn-lg btn-success pt-3 push text-white" title="Rotacionar para direita">
                                            <i class="fa fa-rotate-right"></i>
                                        </a>
                                    </div>
                                    <div class="col-12" v-if="itemsSliced.slicePages.length > 1">
                                        <a class="btn btn-lg btn-success js-tooltip pt-3 push text-white" title="Excluir página" data-toggle="modal" data-target="#modal-del-page">
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
            </div>
            <div class="col-md-4 right-content">
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
                                <router-link v-bind:to="'/rate-dossie-selected/' + id" class="btn btn-sm btn-block btn-gray-300 mr-5 mb-5 shadow">
                                    <b>Pendentes: </b><span>{{ student.notClassificated }}</span>
                                </router-link>
                            </div>
                            <div class="col-md-6">
                                <router-link v-bind:to="'/rate-dossie-selected/'+id" class="btn btn-sm btn-block btn-gray-500 text-black mr-5 mb-5 shadow">
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
                                <label class="col-12 col-form-label text-white"
                                       for="classification-code"><b>Código</b></label>
                                <div class="col-md-9 pr-0">
                                    <input type="text" class="form-control" id="classification-code" name="example-text-input" v-model="searchField">
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
                                    <div class="scrumboard js-scrumboard col-12 p-0" v-for="(subCategory, index) in subCategories" :key="index" v-if="subCategory.length > 0">
                                        <div class="scrumboard-items block-content pt-0">
                                            <div class="scrumboard-item badge-pill bg-primary text-black py-0 px-15">
                                                <div class="scrumboard-item-content pt-5">
                                                    {{subCategory}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-20">
                                        <v-select ref="selectCategory" v-model="selected_category" :options="categories" label="name"></v-select>
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
                                            <input v-if="e.type==='string'" type="text" :data-vv-as="e.name" :name="e.categoryAdditionalFieldId.toString()" class="form-control" :id="'field'+i" v-model="additionalFields[i].value" v-validate="{required:e.required}">
                                            <input v-if="e.type==='datetime'" type="text" :data-vv-as="e.name" :name="e.categoryAdditionalFieldId.toString()" class="form-control u-full-width" :id="'field'+i" placeholder="dd/mm/aaaa" v-mask="'##/##/####'" v-model="additionalFields[i].value" v-validate="{required:e.required,date_format:'DD/MM/YYYY'}"/>
                                            <div v-if="e.type==='bool'" >
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" :id="'yes_field'+i" :data-vv-as="e.name"  :name="e.categoryAdditionalFieldId.toString()" class="custom-control-input" value="SIM" v-model="additionalFields[i].value" v-validate="{required:e.required,included: ['SIM','NÃO']}">
                                                    <label class="custom-control-label text-white" :for="'yes_field'+i"><strong>Sim</strong></label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" :id="'no_field'+i" :data-vv-as="e.name"  :name="e.categoryAdditionalFieldId.toString()" class="custom-control-input" value="NÃO" v-model="additionalFields[i].value">
                                                    <label class="custom-control-label text-white" :for="'no_field'+i"><strong>Não</strong></label>
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
                                <div class="col-12 pt-20 mt-5">
                                    <!--<button type="submit" class="btn btn-lg btn-dark shadow-sm btn-block text-uppercase" data-toggle="modal" data-target="#modal-save">-->
                                        <!--<i class="fa fa-save"></i> Salvar-->
                                    <!--</button>-->
                                    <button type="submit" class="btn btn-lg btn-dark shadow-sm btn-block text-uppercase" @click="sendClassification()" :disabled="loading.pagesPdf">
                                        <i class="fa fa-save"></i> Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
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
        <div class="modal fade" id="modal-del-page" tabindex="-1" role="dialog" aria-labelledby="modal-del-page" aria-hidden="true">
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
                        <button type="button" class="btn-dark btn-lg float-right shadow-sm text-uppercase" data-dismiss="modal" @click="deletePage()">
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
                    pagesPdf: true,
                    pagesThumb: true
                },
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
                dragged: false
            }
        },
        methods: {
            onDragged({ el, deltaX, deltaY, first, last }) {
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
                this.loading.pagesPdf = true;
                if(!this.slice_id) {
                    api.get('/slices/GetSlicePending/' + this.id)
                        .then(({data}) => {
                            this.itemsSliced = data.result;
                            this.loading.pagesPdf = false;
                            // this.numPages = this.itemsSliced.slicePages.length;
                            // this.slice_id = this.itemsSliced.sliceId;
                        });
                } else {
                    api.get('/slices/GetSliceById/' + this.slice_id)
                        .then(({data}) => {
                            this.itemsSliced = data.result;
                            this.loading.pagesPdf = false;
                            // this.numPages = this.itemsSliced.slicePages.length;
                            // this.slice_id = this.itemsSliced.sliceId;
                        });
                }
            },
            getDetails() {
                this.id = this.$route.params.id;
                api.get('/documentDetails/GetDocumentDetailByDocumentId/' + this.id)
                    .then(({data}) => {
                        this.student = data.result;
                    });
            },
            getCategories() {
                api.get('/categories/getCategories')
                    .then(({data}) => {
                        this.categories = data.result;
                    });
            },
            updateSubCategories(categoryId) {
                api.get('/Categories/GetCategoryById/' + categoryId)
                    .then(({data}) => {
                        this.subCategories = data.result.parents;
                        this.additionalFields = data.result.additionalFields;
                        this.validateSubCategories = true;
                    });
                this.categoryId = categoryId;
            },
            thumbNav(stepElement) {
                this.countPage = stepElement;
                this.stepClass(stepElement);
                this.pageRotate();
            },
            navPage: function(e) {
                this.loadImg = true;
                if (e === "next") {
                    if (this.countPage !== this.numPages - 1) {
                        this.countPage ++;
                    } else {
                        this.countPage = 0;
                    }
                } else {
                    if (this.countPage >= 1) {
                        this.countPage --;
                    } else {
                        this.countPage = this.numPages - 1;
                    }
                }
                this.zoom = 1;
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
            zoomPage: function(e) {
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

                if (e === 'l') {
                    rotate -= 90;
                } else if (e === 'r') {
                    rotate += 90;
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
                this.zoom = 1;
            },
            sendClassification() {
                this.$validator.validate().then((result) => {
                    if (result && this.validateSubCategories) {
                        return this.postSubmit();
                    } else {
                        return swal({
                            title: 'Dossiê não classificado',
                            text: 'Erro na classificação do dossiê',
                            timer: 3000,
                            type: "error",
                        });
                    }
                })
            },
            postSubmit(){
                let request = {
                    sliceId: this.slice_id,
                    categoryId: this.categoryId,
                    slicePages: this.itemsSliced.slicePages,
                    additionalFields: this.additionalFields
                };

                this.loading.pagesPdf = true;
                api.post('/classifications', request)
                    .then(() => {
                        this.loading.pagesPdf = false;
                        this.getPdf();
                        if (this.student.notClassificated === 0) {
                            // let requestFinish = {
                            //     documentId: this.$route.params.id,
                            //     // documentStatusId: 3
                            // };
                            return swal({
                                title: 'Classificação de Dossiê finalizado!',
                                text: 'Todas os recortes foram classificadas com sucesso.',
                                type: "success",
                            })
                                .then(() => this.$router.push('/rate-dossie'))
                        } else {
                            return swal({
                                title: 'Classificação do Dossiê salvo com sucesso!',
                                toast: true,
                                timer: 3000,
                                type: "success",
                                showConfirmButton: false,
                            })
                                .then(() => {
                                    this.countPage = 0;
                                    this.itemsSliced.slicePages = [];
                                    this.getPdf();

                                    this.subCategories = [];
                                    this.selected_category = 'Selecione';
                                    this.additionalFields = 0;
                                    this.validateSubCategories = false;
                                });

                        }
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
                    })
                    .catch(() => {
                        this.loading.pagesPdf = false;
                        return swal({
                            title: 'Erro ao localizar Categoria!',
                            toast: true,
                            timer: 3000,
                            type: "error",
                            showConfirmButton: false,
                        })
                    });
            }
        },
        watch: {
            selected_category(newVal) {
                if (newVal === 'Selecione' || newVal === null) {
                    // this.saveButton = false;
                    this.subCategories = [];
                    this.selected_category = 'Selecione';
                    this.additionalFields = 0;
                    this.validateSubCategories = false;
                } else {
                    // this.saveButton = true;
                    this.updateSubCategories(newVal.categoryId);
                }
                this.searchField = '';
            }
        },
        mounted() {
            this.getPdf();
            this.getCategories();
            this.getDetails();
        }
    }
</script>
