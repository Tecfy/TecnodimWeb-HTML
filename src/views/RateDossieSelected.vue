<style>
    .selected img {
        outline: 2px solid #00422c;
    }
    .selected .custom-checkbox label:before {
        background-color: #37b78c;
    }
    .selected .custom-checkbox label:after {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
    }
</style>

<template>
    <div class="rate-dossie-selected">
        <div class="content">
            <div class="row">
                <div class="col-8">
                    <p class="content-heading pt-0">
                        <i class="si si-arrow-left"></i> <span class="h3"> Classificar Dossiê</span>
                        <a href="cut_dossie.html" class="btn btn-dark btn-lg float-right shadow-sm text-uppercase"><i class="fa fa-arrow-left mr-10"></i> Voltar</a>
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 left-content">
                    <div class="block block-rounded shadow-sm pb-10 block-group">
                        <div class="block-header">
                            <h3 class="block-title">
                                <strong>Recortes pendentes de classificação <span>({{ notClassificatedGroups.length }})</span></strong>
                            </h3>
                        </div>

                        <div class="block-content pt-0 pb-20" data-toggle="slimscroll" data-height="160px" data-color="#37b78c" data-opacity="1" data-size="8px" data-always-visible="true" data-rail-visible="true" data-rail-color="#eee" data-rail-opacity="1">
                            <div class="row">
                                <div class="col-md-3 mb-10" v-for="(item, i) in notClassificatedGroups" :key="i">
                                    <router-link v-bind:to="'/rate-dossie-selected-group/' + id+ '/' + item.sliceId" class="btn btn-block btn-outline-primary my-1 " data-toggle="tooltip" data-placement="bottom" v-bind:title="item.name">
                                        <i class="fa fa-folder mr-5 vertical-align"></i> <div class="text-black vertical-align text-left">{{ item.name }}</div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block block-rounded shadow-sm pb-10 block-group dossie-classificated">
                        <div class="block-header">
                            <h3 class="block-title">
                                <strong>Recortes classificados <span>({{ classificatedGroups.length }})</span></strong>
                            </h3>
                        </div>
                        <div class="block-content pt-0 pb-20" data-toggle="slimscroll" data-height="160px" data-color="#37b78c" data-opacity="1" data-size="8px" data-always-visible="true" data-rail-visible="true" data-rail-color="#eee" data-rail-opacity="1">
                            <div class="row">
                                <div class="col-md-3" v-for="(item, i) in classificatedGroups" :key="i">
                                    <router-link v-bind:to="'/rate-dossie-selected-group/' + id+ '/' + item.sliceId" class="btn btn-block btn-outline-primary my-1" data-toggle="tooltip" data-placement="bottom" v-bind:title="item.name">
                                        <i class="fa fa-folder mr-5 vertical-align"></i> <div class="text-black vertical-align text-left">{{ item.name }}</div>
                                    </router-link>
                                </div>
                            </div>
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
                                    <a class="btn btn-sm btn-block btn-gray-300 mr-5 mb-5 shadow">
                                        <b>Pendentes: </b><span>{{ notClassificatedGroups.length }}</span>
                                    </a>
                                </div>
                                <div class="col-md-6">
                                    <a class="btn btn-sm btn-block btn-gray-500 text-black mr-5 mb-5 shadow">
                                        <b>Classificados: </b> <span>{{ classificatedGroups.length }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-group" tabindex="-1" role="dialog" aria-labelledby="modal-group" aria-hidden="true">
            <div class="modal-dialog modal-dialog-slideup" role="document">
                <div class="modal-content">
                    <div class="block block-themed block-transparent mb-0 ">
                        <div class="block-header bg-white p-0 pt-10 ml-20">
                            <h3 class="block-title text-black"><b>Finalizar classificação?</b></h3>
                            <div class="block-options mr-15">
                                <button type="button" class="btn-block-option text-dark" data-dismiss="modal" aria-label="Close">
                                    <i class="si si-close"></i>
                                </button>
                            </div>
                        </div>
                        <hr>
                        <div class="block-content pt-0">
                            <p>Você realmente deseja finalizar a classificação? Você não poderá retornar para o grupo de classificação atual.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-dark btn-lg float-right shadow-sm text-uppercase" data-dismiss="modal"><i class="si si-check mr-10"></i> Salvar Grupo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../lib/api';
    import config from '../config/index';

    export default {
        data() {
            return {
                apiUrl: config.apiUrl,
                id: this.$route.params.id,
                notClassificatedGroups: [],
                numNotClassificatedGroups: '-',
                classificatedGroups: [],
                numClassificatedGroups: '-',
                loading: {
                    notClassificated: true,
                    classificated: true
                },
                student: {
                    name: '-',
                    unity: '-',
                    course: '-',
                    registration: '-'
                }
            }
        },
        methods: {
            slicesNotClassificated() {
                this.id = this.$route.params.id;
                this.loading.notClassificated = true;
                api.get('/slices/getSlicesNotClassificatedByDocumentId/' + this.id)
                    .then(({data}) => {
                        this.notClassificatedGroups = data.result;
                        this.loading.notClassificated = false;
                        this.numNotClassificatedGroups = this.notClassificatedGroups.length;
                    });
            },
            slicesClassificated() {
                this.id = this.$route.params.id;
                this.loading.classificated = true;
                api.get('/slices/getSlicesClassificatedByDocumentId/' + this.id)
                    .then(({data}) => {
                       this.classificatedGroups = data.result;
                        this.loading.classificated = false;
                        this.numClassificatedGroups = this.classificatedGroups.length;
                    });
            },
            getDetails() {
                this.id = this.$route.params.id;
                api.get('/documentDetails/GetDocumentDetailByDocumentId/' + this.id)
                    .then(({data}) => {
                        this.student = data.result;
                    });
            }
        },
        mounted() {
            this.slicesNotClassificated();
            this.slicesClassificated();
            this.getDetails();
        }
    }
</script>
