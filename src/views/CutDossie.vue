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
                            <input v-model="searchRegistration" type="text" class="form-control form-control-lg" id="registration-number" name="registration-number" v-mask="'#####################'">
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
                            <button @click="getDossies(1)"  class="btn btn-alt-primary btn-lg btn-block">Buscar <i class="fa fa-search ml-5"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="block mt-50">
            <div class="block-content">
                <table class="table table-vcenter" v-if="!loadingDossies">
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
                    <tfoot>
                        <nav>
                            <ul class="pagination justify-content-center mx-auto">
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
                    </tfoot>
                </table>
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
                totalShow: 2,
                numPagination: 0,
                newUrlApi: '',
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
                if (this.searchRegistration.length === 0 && this.searchName.length === 0) {
                    this.createPagination('/Documents/getDocumentSlices?unityId=' + unityId);
                    this.newUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId + '&currentPage=' + this.currentPage + '&qtdEntries=' + this.totalShow;
                } else if (this.searchRegistration.length !== 0) {
                    this.createPagination('/Documents/getDocumentSlices?unityId=' + unityId + '&registration=' + this.searchRegistration);
                    this.newUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId + '&currentPage=' + this.currentPage + '&qtdEntries=' + this.totalShow + '&registration=' + this.searchRegistration;
                } else if (this.searchName.length !== 0) {
                    this.createPagination('/Documents/getDocumentSlices?unityId=' + unityId + '&name=' + this.searchName);
                    this.newUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId + '&currentPage=' + this.currentPage + '&qtdEntries=' + this.totalShow + '&name=' + this.searchName;
                }
                if (this.selected.id === 1 || this.selected.id === 0) {
                    this.createPagination('/Documents/getDocumentSlices?unityId=' + unityId + '&documentStatusId=' + 1);
                    this.newUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId + '&currentPage=' + this.currentPage + '&qtdEntries=' + this.totalShow + '&documentStatusId=' + 1;
                }
                else if (this.selected.id === 2) {
                    this.createPagination('/Documents/getDocumentSlices?unityId=' + unityId + '&documentStatusId=' + 2);
                    this.newUrlApi = '/Documents/getDocumentSlices?unityId=' + unityId + '&currentPage=' + this.currentPage + '&qtdEntries=' + this.totalShow + '&documentStatusId=' + 2;
                }
                api.get(this.newUrlApi).then(({data}) => {
                    this.loadingDossies = false;
                    this.searchResult = data.result;
                });
            },
            createPagination(url) {
                api.get(url).then(({data}) => {
                    console.log('url', url);
                    this.loadingDossies = false;
                    this.totalCount = data.result.length;
                    this.numPagination = Math.ceil(this.totalCount / this.totalShow);
                });
            }
        },
        mounted(){
            this.getDossies(this.currentPage);
        }
    }
</script>
