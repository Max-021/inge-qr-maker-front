<template>
    <div class="authenticate-container shadow">
        <form method="POST" @submit.prevent="autenticar">
            <div class="form-header">
                <h2>Ingresa la clave que generaste</h2>
            </div>
            <div class="form-body">
                <label for="key">Key</label>
                <input type="key" v-model="key">
            </div>
            <div class="form-footer">
                <button class="button-green shadow" type="submit">Autenticar</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .authenticate-container{
        position: absolute;
        padding: 2rem;
        top: 50%;
        left: 50%;
        width: 90%;
        max-width: 400px;
        border-radius: 15px;
        transform: translate(-50%, -50%);
    }
    .shadow{
        box-shadow: 0 1px 1px rgba(0,0,0,.1),
                    0 2px 2px rgba(0,0,0,.1),
                    0 4px 4px rgba(0,0,0,.1),
                    0 8px 8px rgba(0,0,0,.1),
                    0 16px 16px rgba(0,0,0,.1);
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .form-header{
        text-align: center;
    }
    .form-body{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    input{
        box-shadow: inset -3px -3px 4px #e6edff,
                    inset 5px 5px 10px #aaafd9;
        -webkit-box-shadow: inset -3px -3px 4px #e6edff,
                            inset 5px 5px 10px #aaafd9;
        -moz-box-shadow: inset -3px -3px 4px #e6edff,
                        inset 5px 5px 10px #aaafd9;
        -webkit-appearance: none;
    }
    .button-green{
        width: 100%;
        border: none;
        padding: .3rem;
        border-radius: 10px;
        transition: all .3s ease-in-out;
    }
    .button-green:hover{
        box-shadow: none;
        cursor: pointer;
    }
</style>
<script>
import {inject, ref} from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    setup() {
        const key = ref('')
        const basePath = inject('basePath')
        return {
            key,
            basePath
        }
    },
    methods:{
        autenticar: function(){
            let tokenPartido = this.key.split(' ', 2)
            axios.post(this.basePath+'/verify', {token: this.key})
                .then(response => {
                    if(response.data.isValidated){
                        localStorage.setItem('inge_access_token', tokenPartido[1])
                        this.$emit('verified')
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en validación de token',
                            text: response.data.message
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en validación de token',
                        text: e.message
                    })
                })
        }
    }
}
</script>