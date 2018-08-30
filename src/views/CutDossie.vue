<template>
    <div class="cut-dossie">
        <p class="content-heading">
            <i class="si si-arrow-left"></i> <span class="h3">Dossiês à recortar</span>
        </p>
        <div class="block block-themed block-rounded shadow-lg">
            <div class="block-header bg-gd-emerald shadow">
                <h3 class="block-title text-black">Utilize a busca abaixo para localizar um dossiê por matrícula ou por
                    nome.</h3>
            </div>
            <div class="block-content bg-primary">
                <form action="" method="post" onsubmit="return false;">
                    <div class="form-group row">
                        <div class="col-md-4">
                            <label class="col-12 pl-0 text-white" for="registration-number">Número da
                                matrícula</label>
                            <input type="text" class="form-control form-control-lg" id="registration-number"
                                   name="example-text-input">
                        </div>
                        <div class="col-md-6">
                            <label class="col-12 pl-0 text-white" for="student-name">Nome do aluno</label>
                            <input type="text" class="form-control form-control-lg" id="student-name"
                                   name="example-text-input">
                        </div>
                        <div class="col-md-2 pt-20 mt-5">
                            <button type="submit" class="btn btn-alt-primary btn-lg btn-block">Buscar <i
                                    class="fa fa-search ml-5"></i></button>
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
                        <th class="py-20" style="width: 15%;"><b>Matrícula</b></th>
                        <th class="py-20"><b>Nome</b></th>
                        <th class="py-20"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in searchResult" :key="index">
                            <th scope="row">{{ item.registration }}</th>
                            <td>{{ item.name }}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <router-link :to="'/cut-selected/'+item.documentId" class="btn btn-lg btn-success js-tooltip-enabled"><i class="fa fa-crop"></i></router-link>
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
                loadingDossies: true
            }
        },
        methods: {
            getDossies() {
                this.loadingDossies = true;
                api.get('/Documents/getDocumentSlices/1')
                    .then( ({data}) => {
                        this.loadingDossies = false;
                        this.searchResult = data.result;
                    })
            }
        },
        mounted(){
            this.getDossies();
        }
    }
</script>
