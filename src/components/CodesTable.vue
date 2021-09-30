<template>
    <div class="container">
        <h1>Códigos creados</h1>
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
            <tbody>
                <tr>
                    <td>asd#1</td>
                    <td>asd#2</td>
                    <td>asd#3</td>
                    <td>asd#4</td>
                    <td>asd#5</td>
                    <td class="acciones">

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.container{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
h1{
    color: hsla(0, 0%, 25%, .9);
}
th, tr{
    height: 3rem;
}
table{
    position: relative;
    width: 100%;
    border-spacing: 0;
    border: none;
    box-shadow: 0px 0px 10px #aaafd9;
    animation: showUp 1.5s;
}
table thead th{
    box-shadow: 5px 5px 5px #aaafd9;
    color: white;
    position: sticky;
    top: 0;
    background: #494d75;
    font-size: 1.2em;
    z-index: 10;
    text-align: center;
    padding: 0 10px;
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    background-size: 15px 15px;
    background-position: center;
    transition: all 1s ease;
    background-repeat: no-repeat;
}
.actions button:hover{
    transform: rotate(360deg);
}
.button-add{
    /* background-image: url('@/assets/images/exito.svg'); */
}
.button-check{
    /* background-image: url('@/assets/images/exito.svg'); */
}
.button-edit{
    /* background-image: url('@/assets/images/editar.svg'); */
}
.button-delete{
    /* background-image: url('@/assets/images/basura.svg'); */
}
.button-store{
    /* background-image: url('@/assets/images/archivo.svg'); */
}
.button-back-time{
    /* background-image: url('@/assets/images/reloj.svg'); */
}
.button-bug-search{
    /* background-image: url('./images/el-malware.svg'); */
}
.button-info{
    position: absolute;
    top: -50%;
    right: 0;
    height: 1.2rem;
    width: 1.2rem;
    background-repeat: no-repeat;
    /* background-image: url('@/assets/images/exclamacion.svg'); */
}
.button-blue{
  background: rgb(107, 163, 247);
}
.button-yellow{
  background: rgb(255, 217, 0);
}
</style>
<script>
export default {
    setup() {
        
    },
}
</script>