<template>
  <div id="app">
    <CodeCreate></CodeCreate>
    <CodesTable></CodesTable>
  </div>
</template>

<script>
import CodesTable from './components/CodesTable.vue'
import CodeCreate from './components/CodeCreate.vue'
export default {
  name: 'App',
  components: {
    CodesTable,
    CodeCreate
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;400&display=swap');
:root{
  --violet: #c8ceff;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Raleway', sans-serif;
}
body{
  background: var(--violet);
}
button:active{
  box-shadow: inset -5px -5px 7px #e6edff,
              inset 5px 5px 7px #aaafd9;
}
button:focus{
  outline: none;
}
.search-box input{
  background: none;
  border: none;
  border-radius: 15px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 1em;
  width: 94%;
  height: 100%;
}
.incrusted{
  box-shadow: inset -3px -3px 4px #e6edff,
              inset 5px 5px 10px #aaafd9!important;
  -webkit-box-shadow: inset -3px -3px 4px #e6edff,
                      inset 5px 5px 10px #aaafd9!important;
  -moz-box-shadow: inset -3px -3px 4px #e6edff,
                    inset 5px 5px 10px #aaafd9!important;
  -webkit-appearance: none; 
}
input, textarea{
  background: none;
  border: none;
  border-radius: 15px;
  padding: 10px;
  font-size: 1rem;
}
input:focus{
    outline: none;
    box-shadow: 0 0 3pt 2pt rgba(255,255,255,.7)!important;
}
textarea:focus{
    outline: none;
    box-shadow: 0 0 3pt 2pt rgba(255,255,255,.7)!important;
}
.button-violet{
  background: rgb(194, 113, 248);
}
.button-green{
  background: rgb(161, 235, 52);
}
.button-blue{
  background: rgb(107, 163, 247);
}
.button-red{
  background: rgb(248, 113, 140);
}
.button-yellow{
  background: rgb(255, 217, 0);
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
.btn-outline-danger{
  text-shadow: none;
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
@keyframes showUp {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>
