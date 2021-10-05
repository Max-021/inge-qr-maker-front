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
                    Seleccioná los clientes para los que quieras crear el código y crealos!
                </div>
                <div class="selection">
                    <div class="list" v-if="formatedData.length > 0">
                        <ul>
                            <li v-for="(obj, index) in formatedData" :key="index">
                                <input
                                    type="checkbox" 
                                    :name="obj.cliente" 
                                    :id="obj.cliente+'-'+index"
                                    :value="obj.cliente+obj.unidad+obj.equipo"
                                    v-model="selectedQrs"
                                    class="checkmark"
                                    number>
                                <label 
                                    :for="obj.cliente+'-'+index">
                                    {{obj.cliente}} - {{obj.unidad}} - {{obj.equipo}}
                                </label>
                            </li>
                        </ul>
                        <div class="buttons">
                            <button type="button" class="button-violet" 
                                @click="checkAll();selectedQrs.length = 0">Seleccionar todos</button>
                            <button type="button" class="button-green"
                                @click="crearQrs">Crear QRs!</button>
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
    gap: .5rem;
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
    padding: .5rem;
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
    height: 2.3rem;
    width: fit-content;
    padding: 0 .5rem;
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
}
.list ul li:hover{
    box-shadow: 5px 5px 7px #aaafd9,
                -5px -5px 10px #d8dff1;
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
export default {
    name:'Code Create',
    setup() {
        const basicData = ref('[{"cliente": "HOSPITAL#1", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 1"}, {"cliente": "HOSPITAL#2", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 2"}, {"cliente": "HOSPITAL#3", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 3"}, {"cliente": "HOSPITAL#4", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 4"}, {"cliente": "HOSPITAL#5", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 5"}, {"cliente": "HOSPITAL#6", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 6"}, {"cliente": "HOSPITAL7", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 7"}, {"cliente": "HOSPITAL#8", "unidad": "HTAL. LARCADE", "contacto": "", "telefono": "","equipo": "EQUIPO 8"}]')
        const parsedData = computed(() => {
            return JSON.parse(basicData.value)
        })
        const totalRegistros = computed(() => {
            return basicData.value? parsedData.value.length : 0
        })
        const formatedData = computed(() => {
            return basicData.value ? parsedData.value : []
        })
        const selectedQrs = ref([])
        var allSelected = ref(false)
        const allSelectedQrs = ref([])
        const hayAlgunSeleccionado = computed (() => {
            return selectedQrs.value.length != 0
        })
        const checkAll = () => {
            let inputs = Array.from(document.getElementsByClassName('checkmark'))
            if(!hayAlgunSeleccionado.value){
                if(allSelected.value){
                    inputs.forEach(input => input.checked = false)
                    allSelectedQrs.value.length = 0
                    allSelected.value = false
                } else {
                    inputs.forEach(input => input.checked = true)
                    formatedData.value.forEach(registro => allSelectedQrs.value.push(registro))
                    //TODO: Probar que pasa si agrego todo a selectedQrs, a ver si sigue rompiendo
                    allSelected.value = true
                }
            } else {
                inputs.forEach(input => input.checked = true)
            }
        }
        const postQr = (qrArray) => {
            qrArray.forEach(regBody => {
                axios.post('http://localhost:3001/qr/create', regBody)
            })
        }
        const crearQrs = () => {
            if(allSelected.value){
                console.log('Te imprimo todos')
                console.log(allSelectedQrs.value)
                postQr(allSelected.value)
            } else if(hayAlgunSeleccionado.value) {
                console.log('Te imprimo algunos')
                console.log(selectedQrs.value)
                postQr(selectedQrs.value)
            } else {
                console.log('No hay ningun registro seleccionado')
            }
        }
        return {
            basicData,
            parsedData,
            totalRegistros,
            formatedData,
            selectedQrs,
            allSelected,
            allSelectedQrs,
            hayAlgunSeleccionado,
            checkAll,
            postQr,
            crearQrs
        }
    },
}
</script>