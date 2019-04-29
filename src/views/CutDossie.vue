<template>
    <div class="cut-dossie">
        <p class="content-heading">
            <i class="si si-arrow-left"></i> <span class="h3">Dossiês à recortar</span>
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
                            <label class="col-12 pl-0 text-white h5 mb-2" for="registration-number">Número da matrícula</label>
                            <input ref="fieldRegistration" v-model="searchRegistration" type="text" class="form-control form-control-lg" id="registration-number" name="registration-number" v-mask="'#####################'">
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="student-name">Nome do aluno</label>
                            <input v-model="searchName" type="text" class="form-control form-control-lg" id="student-name" name="student-name">
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2">Status</label>
                            <v-select :options="status" v-model="selected"></v-select>
                            <!--<input v-model="searchStatus" type="text" class="form-control form-control-lg" id="dossie-status" name="dossie-status">-->
                        </div>
                        <div class="col-lg-2 col-md-6 pt-20 mt-5">
                            <button @click="getDossies(1)" ref="searchButton" class="btn btn-alt-primary btn-lg btn-block mt-1">Buscar <i class="fa fa-search ml-5"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="block mt-50">
            <div class="block-content" v-if="!loadingDossies">
                <h5 class="pt-1 text-right">
                    <span class="mr-10"><strong>{{ totalCount }}</strong></span><small>registros encontrados</small>
                </h5>
                <table class="table table-vcenter" >
                    <thead class="thead-light mb-50">
                    <tr class="p-50">
                        <th class="py-20"><b>Matrícula</b></th>
                        <th class="py-20"><b>Nome</b></th>
                        <th class="py-20"><b>Status</b></th>
                        <th class="py-20"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in searchResult" >
                            <th scope="row">{{ customer.registration }}</th>
                            <td>{{ customer.name }}</td>
                            <td>
                                <span v-if="customer.statusId === 1" class="badge badge-danger">Não iniciado</span>
                                <span v-if="customer.statusId === 2" class="badge badge-primary">Iniciado</span>
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <router-link :to="'/cut-selected/'+customer.documentId" class="btn btn-lg btn-success js-tooltip-enabled" data-title="Iniciar recorte"><i class="fa fa-crop"></i></router-link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="row">
                    <div class="col-12">
                        <nav>
                            <ul class="pagination float-right mt-20">
                                <li class="">

                                </li>
                                <li class="page-item" :class="{'disabled': currentPage === 1}">
                                    <a class="page-link" @click="getDossies('back')">Anterior</a>
                                </li>
                                <li v-for="n in numPagination" class="page-item" :class="{'disabled': currentPage === n}">
                                    <a class="page-link" href="#" @click="getDossies(n)">{{ n }}</a>
                                </li>
                                <li class="page-item" :class="{'disabled': currentPage === numPagination}">
                                    <a class="page-link" @click="getDossies('next')">Próximo</a>
                                </li>
                            </ul>
                        </nav>
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
</template>

<script>
    import api from '../lib/api';

    export default {
        data() {
            return {
                searchResult: [],
                loadingDossies: true,
                searchName: '',
                searchRegistration: '',
                searchStatus: '',
                status: [
                    { id: 0, label: 'Selecione' },
                    { id: 1, label: 'Não iniciado' },
                    { id: 2, label: 'Iniciado' }
                ],
                selected: {id: 0, label: 'Selecione'},
                currentPage: 1,
                totalCount: null,
                totalShow: 10,
                numPagination: 0,
                searchActivate: false
            }
        },
        methods: {
            getDossies(p) {
                let unityId = window.localStorage.selectedUnit;
                this.loadingDossies = true;

                if (p === 'back') {
                    this.currentPage--;
                } else if (p === 'next') {
                    this.currentPage++;
                } else {
                    this.currentPage = p;
                }

                let newPageUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId;
                let newUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId + '&currentPage=' + this.currentPage + '&qtdEntries=' + this.totalShow;

                if (this.searchRegistration.length !== 0) {
                    newPageUrlApi += '&registration=' + this.searchRegistration;
                    newUrlApi += '&registration=' + this.searchRegistration;
                }
                if (this.searchName.length !== 0) {
                    newPageUrlApi += '&name=' + this.searchName;
                    newUrlApi += '&name=' + this.searchName;
                }
                if (this.selected.id === 1) {
                    newPageUrlApi += '&documentStatusId=' + 1;
                    newUrlApi += '&documentStatusId=' + 1;
                }
                if (this.selected.id === 2) {
                    newPageUrlApi += '&documentStatusId=' + 2;
                    newUrlApi += '&documentStatusId=' + 2;
                }
                this.createPagination(newPageUrlApi);
                api.get(newUrlApi).then(({data}) => {
                    this.loadingDossies = false;
                    this.searchResult = data.result;
                });
                this.$refs.fieldRegistration.focus();
            },
            createPagination(url) {
                api.get(url).then(({data}) => {
                    this.loadingDossies = false;
                    this.totalCount = data.totalCount;
                    this.numPagination = Math.ceil(this.totalCount / this.totalShow);
                });
            }
        },
        mounted(){
            this.getDossies(this.currentPage);
        },
        watch: {
            selected: function () {
                if(this.selected !== 'Selecione') {
                    this.$refs.searchButton.focus();
                }
            }
        }
    }
</script>
