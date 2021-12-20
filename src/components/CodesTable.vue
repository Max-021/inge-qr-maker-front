<template>
    <div class="container">
        <div class="pre-content">
            <h1>Códigos creados</h1>
            <div class="buttons">
                <button data-toggle="modal" data-target="#myModal" type="button" @click="equiposSeleccionados = codigos;isEditing = false">Exportar todos los equipos</button>
                <button>Exportar algunos equipos</button>
            </div>
        </div>
        <div class="content">

            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Unidad</th>
                        <th>Telefono</th>
                        <th>Contacto</th>
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
                        <td>{{codigo.contacto}}</td>
                        <td>{{codigo.telefono}}</td>
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
    max-height: 30rem;
    overflow-y: scroll;
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
    padding: .3rem;
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
import axios from 'axios'
import {ref, inject} from 'vue'
import Spinner from './Spinner.vue'
import {download} from '../assets/js/qrUtils'

export default {
    components:{Spinner},
    setup() {
        const codigosCreados = ref([])
        const apiUrl = inject('apiUrl')
        const isLoading = ref(false)
        const getQrs = () => {
            isLoading.value = true
            try{
                axios.get('http://localhost:3001/qr/')
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
            axios.get(apiUrl+'/download/'+id,{
                        responseType: 'blob'
                    })
                .then(response => {
                    let imagen = new Blob([response.data], {type:'image/png'}) 
                    download(imagen, response.headers.name)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        return {
            getQrs,
            codigosCreados,
            isLoading,
            descargarQr
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