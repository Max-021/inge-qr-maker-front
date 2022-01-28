<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <Timer></Timer>
      <CodeCreate></CodeCreate>
      <CodesTable></CodesTable>
    </div> 
    <div v-else>
      <Authenticator @verified="setAuthenticate()"></Authenticator>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import CodesTable       from './components/CodesTable.vue'
import CodeCreate       from './components/CodeCreate.vue'
import Authenticator    from './components/Authenticator.vue'
import Timer            from './components/Timer.vue'
import TitleMixin       from './assets/js/titleMixin'

export default {
  name: 'App',
  mixins:[TitleMixin],
  components: {
    CodesTable,
    CodeCreate,
    Authenticator,
    Timer
  },
  title(){
    return 'Ingeray QR System'
  },
  setup(){
    let isAuthenticated = ref(false)
    const setAuthenticate = () => {
      isAuthenticated.value = true //TODO: Ver por qué no anda esto
    }
    return {
      isAuthenticated,
      setAuthenticate
    }
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
  padding-top: 2rem;
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
.button-green{
  background: rgb(161, 235, 52);
}
.button-red{
  background: rgb(255, 55, 32);
}

@keyframes showUp {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@media screen and (max-width: 500px) {
  #app{
    max-width: 100vw;
  }
}
</style>
