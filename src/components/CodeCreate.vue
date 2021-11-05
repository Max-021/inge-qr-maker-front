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
                <textarea name="qrs-json" id="qrs-json" cols="30" rows="10" class="incrusted" v-model="basicData">
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
}
.inputs{
    display: grid;
    grid-template-columns: 7fr 5fr;
    grid-template-rows: auto;
    gap: 1rem;
}
textarea{
    height: 300px;
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
    height: auto;
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
.button-violet{
    background: #4f29f0;
    color: white;
}
.list ul{
    height: 300px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
}
.list ul li{
    list-style: none;
    min-height: 2.3rem;
    width: 100%;
    padding: 0 .5rem;
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
}
.list ul li label {
    color: #414856;
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
    transition: color 0.3s ease;
    width: auto;
}
.list ul li label::before, 
.list ul li label::after {
    content: "";
    position: absolute;
}
.list ul li label::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: #4f29f0;
    border-radius: 2px;
    transition: background 0.3s ease;
}
.list ul li label:after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
}
.list ul li input[type="checkbox"]{
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 2px solid #4f29f0;
    margin: 0 11px 0 0;
    cursor: pointer;
    background: transparent;
    display: grid;
    align-items: center;
}
.list ul li input[type="checkbox"]:focus{
    box-shadow: none!important;
}
.list ul li input[type="checkbox"]:checked {
    outline: none;
}
.list ul li input[type="checkbox"]::before, 
.list ul li input[type="checkbox"]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: #4f29f0;
    border-radius: 2px;
}
.list ul li input[type="checkbox"]::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
}
.list ul li input[type="checkbox"]::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
}
.list ul li input[type="checkbox"]:checked::before {
    animation: check-01 0.4s ease forwards;
}
.list ul li input[type="checkbox"]:checked::after {
    animation: check-02 0.4s ease forwards;
}
.list ul li input[type="checkbox"]:checked + label {
    color: #7a7c87;
    animation: move 0.3s ease 0.1s forwards;
}
.list ul li input[type="checkbox"]:checked + label::before {
    background: #7a7c87;
    animation: slice 0.4s ease forwards;
}
.list ul li input[type="checkbox"]:checked + label::after {
    animation: firework 0.5s ease forwards 0.1s;
}
@keyframes move {
  50% {
    padding-left: 8px;
    padding-right: 0px;
  }
  100% {
    padding-right: 4px;
  }
}
@keyframes slice {
  60% {
    width: 100%;
    left: 4px;
  }
  100% {
    width: 100%;
    left: -2px;
    padding-left: 0;
  }
}
@keyframes check-01 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }
  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }
  51% {
    width: 0px;
    top: 12px;
    transform: rotate(45deg);
  }
  100% {
    width: 5px;
    top: 12px;
    transform: rotate(45deg);
  }
}
@keyframes check-02 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }
  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }
  51% {
    width: 0px;
    top: 12px;
    transform: rotate(-45deg);
  }
  100% {
    width: 10px;
    top: 12px;
    transform: rotate(-45deg);
  }
}
@keyframes firework {
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #4F29F0, 14px -8px 0 0px #4F29F0, 14px 8px 0 0px #4F29F0, 0 15px 0 0px #4F29F0, -14px 8px 0 0px #4F29F0, -14px -8px 0 0px #4F29F0;
  }
}
</style>
<script>
import axios from 'axios'
import {computed, ref} from 'vue'
import Swal from 'sweetalert2'

export default {
    name:'Code Create',
    setup() {
        const basicData = ref('[{"cliente": "HOSPITAL1", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 1"}, {"cliente": "HOSPITAL2", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 2"}, {"cliente": "HOSPITAL3", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 3"}, {"cliente": "HOSPITAL4", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 4"}, {"cliente": "HOSPITAL5", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 5"}, {"cliente": "HOSPITAL6", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 6"}, {"cliente": "HOSPITAL7", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 7"}, {"cliente": "HOSPITAL8", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 8"}]')
        const parsedData = computed(() => {
            return JSON.parse(basicData.value)
        })
        const totalRegistros = computed(() => {
            return basicData.value? parsedData.value.length : 0
        })
        const formatedData = computed(() => {
            return basicData.value ? parsedData.value : []
        })
        const apiUrl = ref('http://localhost:3001/qr')
        const emit = ''
        const crearQrs = function() {
            Swal.fire({
                title: 'Creando los códigos QR . . .',
                didOpen: () => {
                    Swal.showLoading()
                    axios.post('http://localhost:3001/qr/create', formatedData.value)
                        .then(response => {
                            if(response) {
                                this.emit.emit('recargarTabla')
                                this.downloadAll(response.data.response)
                                .then((response) => {
                                    if(response){
                                        downloadZip(response.data)
                                        Swal.fire({
                                            icon: 'success',
                                            title: '¡Listo!',
                                            text: 'Codigos QR descargados!'
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
                    axios.post(apiUrl.value+'/download', registros, {
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
        const downloadZip = function (registros) {
            var fileURL = window.URL.createObjectURL(new Blob([registros]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'Codigos QR.zip');
            document.body.appendChild(fileLink);

            fileLink.click();
        }
        return {
            basicData,
            parsedData,
            totalRegistros,
            formatedData,
            crearQrs,
            emit,
            downloadAll,
            downloadZip
        }
    },
    created(){
        this.emit = this.emitter
    }
}
</script>