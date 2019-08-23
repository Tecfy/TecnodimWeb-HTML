<template>
    <div class="select-unity-page">
        <div class="hero-static col-lg-6 col-xl-4 mx-auto">
            <div class="content content-full overflow-hidden">
                <div class="py-30 text-center bg-black-op-90">
                    <img src="assets/codebase/media/logo_tecfy.png" alt="Tecfy - Business Solutions" class="img-fluid">
                </div>
                <form class="js-validation-signin" method="post" novalidate="novalidate">
                    <div class="block block-themed block-rounded block-shadow" >
                        <div class="block-header bg-gd-dusk">
                            <h3 class="block-title"><i class="fa fa-chevron-right mr-5"></i> Selecione a Unidade para prosseguir</h3>
                        </div>
                        <div class="block-content">
                            <div class="form-group row">
                                <div class="col-12">
                                    <select class="form-control" id="exampleFormControlSelect1" v-model="selectedUnit" >
                                        <option value="0" disabled selected>Selecione</option>
                                        <option :value="unit.unityId" v-for="(unit, index) in units" :key="index">{{ unit.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>   
    export default {
        name: 'select-unity',

        data: function () {
            return {
                units: [],
                selectedUnit: 0,
                notLogged: false
            }
        },
        methods: {
            loadUnitsFromStorage(){
                try {
                    this.units = JSON.parse( window.localStorage.units);

                    if (this.selectedUnit !== 0) {
                        this.units.map((el, index) => {
                            if (el.unityId === parseInt(window.localStorage.selectedUnit)) {
                                this.selectedUnit = el.unityId;
                            }
                        });
                        this.$router.push('/home');
                        this.notLogged = false
                    }
                }  catch (e) {
                }
            }
        },
        mounted(){
            this.loadUnitsFromStorage();
        },
        watch: {
            selectedUnit(newVal) {
                window.localStorage.setItem("selectedUnit", newVal);
                this.$router.push('/home');
                this.notLogged = true;
                return window.location.reload();
            }
        }
    }
</script>
