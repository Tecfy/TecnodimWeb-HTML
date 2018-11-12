<template>
    <div class="scanning">
        <p class="content-heading">
            <i class="si si-arrow-left"></i><span class="h3">Digitalizar documento</span>
        </p>
        <div class="block block-themed block-rounded shadow-lg mb-50">
            <div class="block-header bg-gd-emerald shadow">
                <h5 class="text-black mb-0">Para iniciar a digitalização, faça a busca do aluno.</h5>
            </div>
            <div class="block-content bg-primary">
                <form action="" method="post" onsubmit="return false;">
                    <div class="form-group row">
                        <div class="col-lg-4 col-md-6">
                            <label class="col-12 pl-0 text-white h5 mb-2" for="registration-number">Número da matrícula</label>
                            <input ref="fieldRegistration" v-model="searchRegistration" type="text" class="form-control form-control-lg" id="registration-number" name="registration-number" v-mask="'#####################'">
                        </div>
                        <div class="col-lg-2 col-md-6 pt-20 mt-5">
                            <button @click="getStudentRegistration" ref="searchButton" class="btn btn-alt-primary btn-lg btn-block mt-1">Buscar <i class="fa fa-search ml-5"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="block mt-50" v-if="validate.studentSearch">
            <div class="block mt-50">
                <div class="block-content text-center" v-if="validate.studentFounded">
                    <table class="table table-vcenter text-left">
                        <thead class="thead-light mb-50">
                        <tr class="p-50">
                            <th class="py-20"><b>Nome</b></th>
                            <th class="py-20"><b>Matrícula</b></th>
                            <th class="py-20"><b>Unidade</b></th>
                            <th class="py-20"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="customer in searchResult" >
                            <th scope="row">{{ customer.studentName }}</th>
                            <td>{{ customer.studentReg }}</td>
                            <td>{{ customer.studentUnity }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <a class="btn btn-lg btn-success text-white my-3" @click="getDocumentClassification">
                        Continuar <i class="pl-2 fa fa-angle-right"></i>
                    </a>
                </div>
                <div class="block-content" v-else-if="validate.studentNotFounded">
                    <h5 class="text-center">
                        <i class="fa fa-exclamation-triangle"></i> Nenhum resultado encontrado
                    </h5>
                </div>
                <div v-else>
                    <h2 class="text-center">
                        <i class="fa fa-spinner fa-spin"></i>
                    </h2>
                </div>
            </div>
        </div>
        <div class="block mt-50 docs-content" v-if="validate.studentClassification">
            <div class="block-content">
                <div class="row">
                    <div class="col-12">
                        <h5>Selecione abaixo quais tipos de documentos à serem digitalizados.</h5>
                        <form action="" method="post" onsubmit="return false;">
                            <v-select multiple class="btn-sm select-multiple" ref="selectCategory"
                                      v-model="selected_category" :options="categories"
                                      v-on:change="focusInput()" label="name"></v-select>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 text-center">
                    <a v-if="validate.allowSendButton" class="btn btn-lg btn-success text-white my-3"
                       @click="endClassification">
                        Enviar para scanner <i class="pl-2 fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../lib/api';
    import config from '../config/index';
    import swal from 'sweetalert2';

    export default {
        data() {
            return {
                validate:
                {
                    studentSearch: false,
                    studentFounded: false,
                    studentNotFounded: false,
                    studentClassification: false,
                    allowSendButton: false
                },
                searchRegistration: '',
                searchResult: [
                    {
                        studentName: "Márcio Lima",
                        studentReg: "45354375",
                        studentUnity: "Campinas / SP"
                    }
                ],
                categories: [],
                selected_category: []
            }
        },
        methods: {
            getCategories() {
                api.get('/categories/getCategories')
                    .then(({data}) => {
                        this.categories = data.result;
                    });
            },
            getStudentRegistration() {
                this.validate.studentSearch = false;
                this.validate.studentFounded = false;
                this.validate.studentNotFounded = false;

                if (this.searchRegistration === this.searchResult[0].studentReg) {
                    this.validate.studentSearch = true;
                    this.validate.studentFounded = true;
                } else if (this.searchRegistration !== this.searchResult[0].studentReg || this.searchRegistration.length > 1) {
                    this.validate.studentSearch = true;
                    this.validate.studentNotFounded = true;
                    this.validate.studentClassification = false;
                }
            },
            getDocumentClassification() {
                this.validate.studentClassification = true;
                this.validate.studentSearch = true;
                this.validate.studentNotFounded = false;
            },
            /*focusInput() {
                alert('oopre');
                // this.$refs.selectCategory.focus();
            },*/
            endClassification() {
                return swal({
                    title: 'Sua solicitação foi finalizada, abaixo o código a ser usado no Scanner:',
                    text: '088685',
                    // showCancelButton: true,
                    // cancelButtonText: 'Cancelar'
                    //type: "success",
                }).then(() => this.startScanning());
            },
            startScanning(){
                this.searchRegistration = '';
                this.selected_category = [];
                this.validate.allowSendButton = false;
                this.validate.studentClassification = false;
                this.validate.studentFounded = false;
                this.validate.studentNotFounded = false;
                this.validate.studentSearch = false;
            }
        },
        mounted() {
            this.getCategories();
        },
        watch: {
            selected_category() {
                if (this.selected_category.length > 0) {
                    return this.validate.allowSendButton = true
                } else {
                    return this.validate.allowSendButton = false
                }
            }
        }
    }
</script>