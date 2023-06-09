<template>
    <div class="container">
        <h1>Crea tus códigos</h1>
        <div class="inputs">
            <!-- 1er PASO -->
            <div class="step" id="first">
                <div class="step-title">
                    <div class="step-number">1</div>
                    Pegá la información
                </div>
                <textarea name="qrs-json" id="qrs-json" cols="10" rows="14" class="incrusted" v-model="basicData">
                </textarea>
                Cantidad de registros: {{totalRegistros}}
            </div>
            <!-- 2do PASO -->
            <div class="step" id="second">
                <div class="step-title">
                    <div class="step-number">2</div>
                    Acá aparecen todos los códigos que se van a crear
                </div>
                <div class="selection">
                    <div class="list" v-if="formatedData.length > 0">
                        <ul class="stand-out">
                            <li v-for="(obj, index) in formatedData" :key="index">
                                <span>{{obj.cliente}} - {{obj.unidad}} - {{obj.equipo}}</span>
                            </li>
                        </ul>
                        <div class="buttons">
                            <button 
                                type="button" 
                                class="button-green"
                                @click="crearQrs">Crear y Descargar QRs
                            </button>
                        </div>
                    </div>
                    <div class="empty-message" v-else>
                        No hay QRs para crear
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
}
.inputs{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
.selection{
    display: flex;
    flex-direction: column;
}
.step{
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
.step-title{
    display: flex;
    align-items: center;
    gap: .3rem;
}
.step-number{
    background: rgb(107, 163, 247);
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
}
#first, #second{
    flex: 1;
}
.empty-message{
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: cornflowerblue;
    color: white;
    text-shadow: 2px 2px 5px rgba(0,0,0,.5);
}
.list{
    position: relative;
    box-shadow: 0 10px 30px rgba(#414856, 0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 340px;
}
.list .buttons{
    display: flex;
    justify-content: space-around;
    gap: 1rem;
}
.list .buttons button{
    width: 100%;
    height: 2rem;
    border-radius: 10px;
    border: none;
    font-weight: bolder;
    font-size: 17px;
    transition: all .3s ease-in-out;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.1),
                0 2px 2px hsl(0deg 0% 0% / 0.1),
                0 4px 4px hsl(0deg 0% 0% / 0.1),
                0 8px 8px hsl(0deg 0% 0% / 0.1);
}
.list .buttons button:hover{
    box-shadow: none;
    cursor: pointer;
}
.stand-out{
    box-shadow: 5px 5px 7px #aaafd9,
                -5px -5px 10px #d8dff1;
    border-radius: 10px;
    overflow-y: scroll;
}
.stand-out li{
    padding: .5rem;
}
.button-violet{
    background: #4f29f0;
    color: white;
}
@media screen and (max-width: 600px) {
    .inputs{
        flex-direction: column;
    }
}
</style>
<script>
import {httpClient} from '../httpClient'
import {computed, inject, ref} from 'vue'
import Swal from 'sweetalert2'
import {download} from '../assets/js/qrUtils'

export default {
    name:'Code Create',
    setup() {
        const basicData = ref('')
        const parsedData = computed(() => {
            return JSON.parse(basicData.value)
        })
        const totalRegistros = computed(() => {
            return basicData.value? parsedData.value.length : 0
        })
        const formatedData = computed(() => {
            return basicData.value ? parsedData.value : []
        })
        const apiUrl = inject('apiUrl')
        const emit = ''
        const crearQrs = function() {
            Swal.fire({
                title: 'Creando los códigos QR . . .',
                didOpen: () => {
                    Swal.showLoading()
                    httpClient.post(apiUrl+'/create', formatedData.value)
                        .then(response => {
                            if(response) {
                                this.emit.emit('recargarTabla')
                                this.downloadAll(response.data.response)
                                .then((response) => {
                                    if(response){
                                        let qrZip = new Blob([response.data])
                                        download(qrZip, 'Códigos QR.zip')
                                        Swal.fire({
                                            icon: 'success',
                                            title: '¡Listo!',
                                            text: 'Códigos QR descargados!'
                                        })
                                    }else{
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'No se pudieron descargar los codigos'
                                        })
                                    }
                                })
                                .catch(e => {
                                    console.log(e)
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: e
                                    })        
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error
                            })
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        }
        const downloadAll = function(registros) {
            return new Promise((resolve, reject) => {
                if(registros.length){
                    httpClient.post(apiUrl+'/download', registros, {
                        responseType: 'blob'
                    })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
                        console.log('Error: '+ e)
                        reject(false)
                    })
                } else {
                    reject('Array de registros vacio')
                }
            })
        }
        return {
            basicData,
            parsedData,
            totalRegistros,
            formatedData,
            crearQrs,
            emit,
            downloadAll
        }
    },
    created(){
        this.emit = this.emitter
    }
}
</script>