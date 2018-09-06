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
                        <div class="col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="registration-number">Número da
                                matrícula</label>
                            <input v-model="searchRegistration" type="text" class="form-control form-control-lg" id="registration-number" name="example-text-input" v-mask="'#####################'">
                        </div>
                        <div class="col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="student-name">Nome do aluno</label>
                            <input v-model="searchName" type="text" class="form-control form-control-lg" id="student-name" name="example-text-input">
                        </div>
                        <!--<div class="col-md-2 pt-20 mt-5">-->
                            <!--<button type="submit" class="btn btn-alt-primary btn-lg btn-block">Buscar <i class="fa fa-search ml-5"></i></button>-->
                        <!--</div>-->
                    </div>
                </form>
            </div>
        </div>
        <div class="block mt-50">
            <div class="block-content">
                <table class="table table-vcenter" v-if="!loadingDossies">
                    <thead class="thead-light mb-50">
                    <tr class="p-50">
                        <th class="py-20" style="width: 15%;"><b>Matrícula</b></th>
                        <th class="py-20"><b>Nome</b></th>
                        <th class="py-20"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="customer in filteredCustomers">
                        <th scope="row">{{ customer.registration }}</th>
                        <td>{{ customer.name }}</td>
                        <td class="text-right">
                            <div class="btn-group">
                                <router-link :to="'/cut-selected/'+customer.documentId" class="btn btn-lg btn-success js-tooltip-enabled" data-title="Iniciar recorte"><i class="fa fa-crop"></i></router-link>
                            </div>
                        </td>
                    </tr>
                    </tbody>
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
                searchRegistration: ''
            }
        },
        methods: {
            getDossies() {
                let unityId = window.localStorage.selectedUnit;
                this.loadingDossies = true;
                api.get('/Documents/getDocumentSlices?unityId=' + unityId)
                    .then( ({data}) => {
                        this.loadingDossies = false;
                        this.searchResult = data.result;
                    })
            }
        },
        computed: {
            filteredCustomers: function() {
                let self = this;
                return this.searchResult.filter(function (cust) {
                    if (self.searchName.length > 0) {
                        return cust.name.toLowerCase().indexOf(self.searchName.toLowerCase()) >= 0;
                    } else {
                        return cust.registration.toLowerCase().indexOf(self.searchRegistration.toLowerCase()) >= 0;
                    }
                });
            }
        },
        mounted(){
            this.getDossies();
        }
    }
</script>
