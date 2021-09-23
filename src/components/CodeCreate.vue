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
            </div>
            <!-- 2do PASO -->
            <div class="step" id="second">
                <div class="step-title">
                    <div class="step-number">2</div>
                    Seleccioná los clientes para los que quieras crear el código
                </div>
                <div class="selection">
                    <div class="list incrusted">
                        <ul>
                            <li v-for="(obj, index) in formatedData" :key="index">
                                {{obj.cliente}} - {{obj.equipo}}
                            </li>
                        </ul>
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
.list{
    padding: 1rem;
}
.list ul{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.list ul li{
    list-style: none;
}
</style>
<script>
import {computed, ref} from 'vue'

export default {
    setup() {
        const basicData = ref('[{"_id":"614a8791f776365c014a0c3c","cliente":"MUNIC. SAN MIGUEL","unidad":"HTAL. LARCADE","contacto":"","telefono":"","equipo":"SIEMENS, POLYMAT 2010","uri":"https://www.ingeray.com.ar/inge_system/alta-servicio-tecnico?cliente=MUNIC. SAN MIGUEL&unidad=HTAL. LARCADE&contacto=&telefono=&equipo=SIEMENS, POLYMAT 2010","fileName":"municsanmiguel-htallarcade-siemenspolymat2010.png","__v":0},{"_id":"614a8791f776365c014a0c3c","cliente":"MUNIC. SAN MIGUEL","unidad":"HTAL. LARCADE","contacto":"","telefono":"","equipo":"SIEMENS, POLYMAT 2010","uri":"https://www.ingeray.com.ar/inge_system/alta-servicio-tecnico?cliente=MUNIC. SAN MIGUEL&unidad=HTAL. LARCADE&contacto=&telefono=&equipo=SIEMENS, POLYMAT 2010","fileName":"municsanmiguel-htallarcade-siemenspolymat2010.png","__v":0},{"_id":"614a8791f776365c014a0c3c","cliente":"MUNIC. SAN MIGUEL","unidad":"HTAL. LARCADE","contacto":"","telefono":"","equipo":"SIEMENS, POLYMAT 2010","uri":"https://www.ingeray.com.ar/inge_system/alta-servicio-tecnico?cliente=MUNIC. SAN MIGUEL&unidad=HTAL. LARCADE&contacto=&telefono=&equipo=SIEMENS, POLYMAT 2010","fileName":"municsanmiguel-htallarcade-siemenspolymat2010.png","__v":0},{"_id":"614a8791f776365c014a0c3c","cliente":"MUNIC. SAN MIGUEL","unidad":"HTAL. LARCADE","contacto":"","telefono":"","equipo":"SIEMENS, POLYMAT 2010","uri":"https://www.ingeray.com.ar/inge_system/alta-servicio-tecnico?cliente=MUNIC. SAN MIGUEL&unidad=HTAL. LARCADE&contacto=&telefono=&equipo=SIEMENS, POLYMAT 2010","fileName":"municsanmiguel-htallarcade-siemenspolymat2010.png","__v":0}]')
        const formatedData = computed(() => {
            let parsedData = JSON.parse(basicData.value)
            return basicData.value ? parsedData : 'vacio we'
        })
        return {
            basicData,
            formatedData
        }
    },
}
</script>