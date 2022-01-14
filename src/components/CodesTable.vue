<template>
    <div class="container">
        <div class="pre-content">
            <h1>Códigos creados</h1>
            <div class="buttons">
                <button @click="descargarTodosLosQr()">Descargar todos los equipos</button>
                <button @click="isTable = !isTable">
                    <span v-if="isTable">Descargar algunos códigos</span>
                    <span v-else>Volver a la tabla</span>
                </button>
            </div>
        </div>
        <div class="content">
            <table v-if="isTable">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Unidad</th>
                        <!-- <th>Telefono</th>
                        <th>Contacto</th> -->
                        <th>Equipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody v-if="isLoading">
                    <tr>
                        <td colspan="6" class="spinner-container">
                            <Spinner></Spinner>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="codigosCreados.length">
                    <tr v-for="(codigo, index) in codigosCreados" :key="index">
                        <td>{{codigo.cliente}}</td>
                        <td>{{codigo.unidad}}</td>
                        <!-- <td>{{codigo.contacto}}</td>
                        <td>{{codigo.telefono}}</td> -->
                        <td>{{codigo.equipo}}</td>
                        <td>
                            <div class="actions">
                                <button class="button-green button-add" @click="descargarQr(codigo._id)"></button>
                                <button class="button-yellow button-delete"></button>
                                <button class="button-red button-delete"></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6" class="no-results">
                            <h3>
                                Todavía no hay códigos creados
                            </h3>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="neomorph" v-else>
                <ul>
                    <li v-for="(codigo, index) in codigosCreados" :key="index">
                        <input type="checkbox" :id="codigo._id" :value="codigo.cliente" @click="seleccionarCodigo(codigo)">
                        <label :for="codigo._id">{{codigo.cliente}} - {{codigo.unidad}} - {{codigo.equipo}} </label>
                    </li>
                </ul>
                <h3>Códigos seleccionados: {{cantidadSeleccionada}} / {{cantidadTotalCodigos}} </h3>
                <button :class="[cantidadSeleccionada < 1 ? 'button-disabled' : 'button-green' ]" @click="descargarSeleccionados()">Descargar</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.pre-content{
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}
.buttons{
    display: flex;
    width: inherit;
    flex-direction: row;
    width: 100%;
    gap: 1rem;
    flex-wrap: wrap;
}
h1{
    color: hsla(0, 0%, 25%, .9);
}
th, tr{
    height: 3rem;
}
.content{
    position: relative;
    display: inline;
    max-height: 30rem;
    overflow: -moz-scrollbars-vertical;
    overflow-y: scroll;
    overflow-x: visible;
}
.neomorph{
    box-shadow:  5px 5px 7px #aaafd9,
            -5px -5px 10px #e6edff;
    border-radius: 25px;
    margin: 1rem .5rem;
    width: fit-content;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
}
table{
    border-spacing: 0;
    border: none;
    box-shadow: 0px 0px 10px #aaafd9;
    animation: showUp 1.5s;
    width: 100%;
}
table thead th{
    box-shadow: 5px 5px 5px #aaafd9;
    color: white;
    background: #494d75;
    font-size: 1.2em;
    text-align: center;
    padding: 0 10px;
    position: sticky;
    z-index: 10;
    top: 0;
}
table thead th:last-child{
    width: 12%;
}
table tbody tr{
    transition: all .3s;
}
table tbody tr:nth-child(1):hover{
    box-shadow: 5px 5px 10px #aaafd9;
}
table tbody tr:hover{
    box-shadow: 5px 5px 7px #aaafd9,
                  -5px -5px 10px #d8dff1;
}
table tbody tr:hover .actions{
    opacity: 1;
}
table tbody tr td{
    padding-left: .5em;
    padding-top: .5em;
    padding-bottom: .5em;
    position: relative;
}
button{
    display: flex;
    justify-content: space-around;
    padding: .5rem;
    align-items: center;
    background: none;
    border: none;
    box-shadow: 5px 5px 10px #aaafd9,
                -5px -5px 10px #e6edff;
    border-radius: 15px;
    transition: all .3s;
    font-size: 2vh;
    letter-spacing: 1.4px;
    animation: showUp 1s;
}
button img{
    transition: all 1s;
}
button:hover{
    cursor: pointer;
    transform: scale(1.05);
}
button:hover .icon{
    transform: rotate(360deg);
}
button:active{
    box-shadow: inset -5px -5px 7px #e6edff,
                inset 5px 5px 7px #aaafd9;
}
button:focus{
    outline: none;
}
.spinner-container{
    width: 100%;
    height: 150px;
    overflow-y: hidden;
    text-align: center;
    color: white;
    text-shadow: 0px 1px 7px rgba(0, 0, 0, 0.8);
    font-size: 20px;
}
.no-results{
    text-align: center;
    width: 100%;
    padding: 20px 0px;
    background: rgb(143, 188, 255);
    color: rgba(255, 255, 255, .9);
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
}
.actions{
    transition: all .6s ease;
    opacity: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-self: center;
    width: 100%;
}
.actions button{
    height: 35px;
    width: 35px;
    padding: 5px;
    margin: 0 3px;
    border-radius: 50%;
    border: none;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.1),
                0 2px 2px hsl(0deg 0% 0% / 0.1),
                0 4px 4px hsl(0deg 0% 0% / 0.1),
                0 8px 8px hsl(0deg 0% 0% / 0.1);;
    background-size: 15px 15px;
    background-position: center;
    transition: all .3s ease-in-out;
    background-repeat: no-repeat;
}
.actions button:hover{
    box-shadow: none;
    cursor: pointer;
}
.button-add{
    background-image: url('~@/assets/images/exito.svg');
}
.button-edit{
    background-image: url('~@/assets/images/editar.svg');
}
.button-delete{
    background-image: url('~@/assets/images/basura.svg');
}
.button-green{
    background-color: rgb(161, 235, 52);
}
.button-blue{
    background-color: rgb(107, 163, 247);
}
.button-red{
    background-color: rgb(248, 113, 140);
}
.button-yellow{
    background-color: rgb(255, 217, 0);
}
.button-disabled{
    color: gray;
    box-shadow: inset 5px 5px 10px #aaafd9,
                inset -5px -5px 10px #e6edff;
}
.button-disabled:hover{
    transform: scale(1);
    cursor:not-allowed;
}
/* Estilos de la lista seleccionable */
ul{
    height: fit-content;
    max-height: 300px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: .3rem 0;
}
ul li{
    list-style: none;
    min-height: 2.3rem;
    width: 100%;
    padding: 0 .5rem;
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
}
ul li label {
    color: #414856;
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: fit-content;
    transition: color 0.3s ease;
    width: auto;
}
ul li label::before, 
ul li label::after {
    content: "";
    position: absolute;
}
ul li label::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: #4f29f0;
    border-radius: 2px;
    transition: background 0.3s ease;
}
ul li label:after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
}
ul li input[type="checkbox"]{
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
ul li input[type="checkbox"]:focus{
    box-shadow: none!important;
}
ul li input[type="checkbox"]:checked {
    outline: none;
}
ul li input[type="checkbox"]::before, 
ul li input[type="checkbox"]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: #4f29f0;
    border-radius: 2px;
}
ul li input[type="checkbox"]::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
}
ul li input[type="checkbox"]::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
}
ul li input[type="checkbox"]:checked::before {
    animation: check-01 0.4s ease forwards;
}
ul li input[type="checkbox"]:checked::after {
    animation: check-02 0.4s ease forwards;
}
ul li input[type="checkbox"]:checked + label {
    color: #7a7c87;
    animation: move 0.3s ease 0.1s forwards;
}
ul li input[type="checkbox"]:checked + label::before {
    background: #7a7c87;
    animation: slice 0.4s ease forwards;
}
ul li input[type="checkbox"]:checked + label::after {
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
@media screen and (max-width: 500px) {
    .content{
        overflow-x: scroll;
        height: 30rem;
    }
    table{
        position: absolute;
        top: 0;
    }
    button{
        width: 100%;
    }
}
</style>
<script>
import {httpClient} from '../httpClient'
import {ref, inject} from 'vue'
import Swal from 'sweetalert2'
import Spinner from './Spinner.vue'
import {download} from '../assets/js/qrUtils'

export default {
    components:{Spinner},
    setup() {
        const codigosCreados = ref([])
        var codigosSeleccionados = ref([])
        const apiUrl = inject('apiUrl')
        const isLoading = ref(false)
        const isTable = ref(true)
        const getQrs = () => {
            isLoading.value = true
            try{
                httpClient.get('http://localhost:3001/qr/')
                .then(response => {
                    codigosCreados.value = response.data
                    isLoading.value = false
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
            catch(e){
                console.log(e)
                isLoading.value = false
            }
        }
        const descargarQr = (id) => {
            Swal.fire({
                title: 'Descargando los códigos QR . . .',
                didOpen: () => {
                    Swal.showLoading()
                    httpClient.get(apiUrl+'/download/'+id,{
                        responseType: 'blob'
                    })
                    .then(response => {
                        let imagen = new Blob([response.data], {type:'image/png'}) 
                        download(imagen, response.headers.name)
                        Swal.fire({
                            icon: 'success',
                            title: '¡Listo!',
                            text: 'Código descargado!'
                        })
                    })
                    .catch(e => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se pudo descargar el código'
                        })
                        console.log(e)
                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        }
        const descargarTodosLosQr = () => {
            Swal.fire({
                title: 'Descargando los códigos QR . . .',
                didOpen: () => {
                    Swal.showLoading()
                    httpClient.get(apiUrl+'/download-all', {responseType: 'blob'})
                        .then(response => {
                            let imagenes = new Blob([response.data], {type: response.data.type})
                            download(imagenes, 'Codigos QR')
                            Swal.fire({
                                icon: 'success',
                                title: '¡Listo!',
                                text: 'Codigos QR descargados!'
                            })
                        })
                        .catch(e => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'No se pudieron descargar los codigos'
                            })
                            console.log(e)
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        }
        const seleccionarCodigo = (codigo) => {
            if(codigosSeleccionados.value.find(cod => cod._id === codigo._id)){
                let index = codigosSeleccionados.value.indexOf(cod => cod._id === codigo._id)
                codigosSeleccionados.value.splice(index, 1)
            } else {
                codigosSeleccionados.value.push(codigo)
            }
        }
        const prepararSeleccionados = function(){
            return new Promise((resolve, reject) => {
                httpClient.post(apiUrl+'/prepare-array', codigosSeleccionados.value)
                    .then(response => {
                        if(response.data.length > 0){
                            resolve(response.data)
                        } else {
                            reject('El array vino vacio!')
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        reject(e)
                    })
            })
        }
        const descargarSeleccionados = () => {
            Swal.fire({
                title: 'Descargando los códigos QR . . .',
                didOpen: () => {
                    Swal.showLoading()
                    prepararSeleccionados()
                        .then(array => {
                            httpClient.post(apiUrl+'/download', array, {responseType: 'blob'})
                                .then(response => {
                                    let imagenes = new Blob([response.data], {type: response.data.type})
                                    download(imagenes, 'Codigos QR')
                                    Swal.fire({
                                        icon: 'success',
                                        title: '¡Listo!',
                                        text: 'Códigos QR descargados!'
                                    })
                                })
                                .catch(e => {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'No se pudieron descargar los codigos'
                                    })
                                    console.log(e)
                                })
                        })
                        .catch(e => {
                            console.log(e)
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        }
        return {
            getQrs,
            codigosCreados,
            codigosSeleccionados,
            isLoading,
            isTable,
            descargarQr,
            descargarTodosLosQr,
            seleccionarCodigo,
            prepararSeleccionados,
            descargarSeleccionados
        }
    },
    computed:{
        cantidadSeleccionada(){
            return this.codigosSeleccionados.length
        },
        cantidadTotalCodigos(){
            return this.codigosCreados.length
        }
    },
    mounted(){
        this.emitter.on('recargarTabla', () => {
            this.getQrs()
        })  
    },
    created(){
        this.getQrs()
    }
}
</script>