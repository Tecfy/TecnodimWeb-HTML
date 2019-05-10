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
                        <div class="col-md-4">
                        <!-- <label class="col-12 pl-0 text-white h5 mb-2" for="student-name">ID</label> -->
                        <input v-model="searchId" type="text" class="form-control form-control-lg" id="student-name"
                                name="student-name" placeholder="ID">
                        </div>
                        <div class="col-md-4">
                        <!-- <label class="col-12 pl-0 text-white h5 mb-2" for="registration-number">Nº. da matrícula</label> -->
                        <input ref="fieldRegistration" v-model="searchRegistration" type="text"
                                class="form-control form-control-lg" id="registration-number" name="registration-number"
                                v-mask="'#####################'" placeholder="Nº. da matrícula">
                        </div>
                        <div class="col-md-4">
                        <!-- <label class="col-12 pl-0 text-white h5 mb-2" for="external-id">Identificador SE</label> -->
                        <input v-model="searchExternalId" type="text" class="form-control form-control-lg" id="external-id"
                                name="external-id" placeholder="Identificador SE">
                        </div>
                        <div class="col-md-4 mt-3">
                        <!-- <label class="col-12 pl-0 text-white h5 mb-2" for="student-name">Nome do aluno</label> -->
                        <input v-model="searchName" type="text" class="form-control form-control-lg" id="student-name"
                                name="student-name" placeholder="Nome do aluno">
                        </div>

                        <div class="col-md-4 mt-3">
                        <!-- <label class="col-12 pl-0 text-white h5 mb-2">Status</label> -->
                            <v-select :options="status" v-model="selected"></v-select>
                        </div>
                        <div class="col-md-4 pt-5 mt-5">
                        <button @click="getDossies(1)" ref="searchButton" class="btn btn-alt-primary btn-lg btn-block mt-1">Buscar
                            <i class="fa fa-search ml-5"></i></button>
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
                        <th class="py-20"><b>ID</b></th>
                        <th class="py-20"><b>Matrícula</b></th>
                        <th class="py-20"><b>Identificador SE</b></th>
                        <th class="py-20"><b>Nome</b></th>
                        <th class="py-20"><b>Status</b></th>
                        <th class="py-20"><b>Criado</b></th>
                        <th class="py-20"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(customer, index) in searchResult" >
                            <th scope="row">{{ customer.documentId }}</th>
                            <td>{{ customer.registration }}</td>
                            <td>{{ customer.externalId }}</td>
                            <td>{{ customer.name }}</td>
                            <td>
                                <span v-if="customer.statusId === 1" class="badge badge-danger">Não iniciado</span>
                                <span v-if="customer.statusId === 2" class="badge badge-primary">Iniciado</span>
                            </td>
                            <td>{{ convertingDate(index) }}</td>             
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
                                    <a class="page-link mr-1" @click="getDossies('back')">Anterior</a>
                                </li>
                                <li v-for="n in numPagination" v-show="showPagination(n)" class="page-item" :class="{'disabled': currentPage === n}">
                                    <a class="page-link" href="#" @click="getDossies(n)">{{ n }}</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link page-total">de {{numPagination}} </a>
                                </li>
                                <li class="page-item" :class="{'disabled': currentPage === numPagination}">
                                    <a class="page-link ml-1" @click="getDossies('next')">Próximo</a>
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
                searchId: '',
                searchExternalId: '',
                searchName: '',
                searchRegistration: '',
                searchStatus: '',
                status: [
                    { id: 0, label: 'Selecione Status' },
                    { id: 1, label: 'Não iniciado' },
                    { id: 2, label: 'Iniciado' }
                ],
                selected: {id: 0, label: 'Selecione Status'},
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
                if (this.searchExternalId.length !== 0) {
                    newPageUrlApi += '&externalId=' + this.searchExternalId;
                    newUrlApi += '&externalId=' + this.searchExternalId;
                }
                if (this.searchId.length !== 0) {
                    newPageUrlApi += '&documentId=' + this.searchId;
                    newUrlApi += '&documentId=' + this.searchId;
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

            },
            showPagination (n) {
              if (this.currentPage === n || n === this.currentPage - 1 || n === this.currentPage - 2 || n === this.currentPage + 1 || n === this.currentPage + 2) {
                return true;
              }
            },
            convertingDate(index) {
                let fullDate = this.searchResult[index].createdDate;
                let getYear = fullDate.substr(0, 4);
                let getMonth = fullDate.substr(5, 2);
                let getDay = fullDate.substr(8, 2);
                let getNewDate = getDay + "/" + getMonth + "/" + getYear;
                return getNewDate;
            }
    },
        mounted(){
            this.getDossies(this.currentPage);
        },
        watch: {
            selected: function () {
                if(this.selected !== 'Selecione Status') {
                    this.$refs.searchButton.focus();
                }
            }
        }
    }
</script>
