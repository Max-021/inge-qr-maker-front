<template>
    <div :class="['timer',timesUp?'finished':'runing']">
        <span v-if="!timesUp">
            A la sesión le quedan:
        </span>
            {{minutes === 0 & seconds === 0 ? message : minutesFormated +':'+ secondsFormated }}
    </div>
</template>
<style scoped>
    .timer{
        border: 1px solid gray;
        padding: .5rem;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        height: 2.5rem;
        gap: .2rem;
        top:0;
    }
    .runing{
        background-color: green;
    }
    .finished{
        background-color: red;
    }
</style>
<script>
export default {
    data: function(){
        return{
            minutes: 14,
            seconds: 50,
            message: 'La key expiró',
            timesUp: false
        }
    },
    methods:{
        countDown(){
            if(this.minutes > 0){
                setTimeout(() => {
                    if(this.seconds === 0){
                        this.minutes -= 1
                        this.seconds = 59
                        this.countDown()
                    } else {
                        this.seconds -= 1
                        this.countDown()
                    }
                }, 1000)
            } else {
                if(this.seconds > 0){
                    setTimeout(() => {
                        this.seconds -= 1
                        this.countDown()
                    }, 1000)
                } else{
                    if(this.seconds === 0){
                        this.timesUp = true
                    }
                }
            }
        }
    },
    computed:{
        minutesFormated(){
            return this.minutes >= 10 ? this.minutes : '0'+this.minutes
        },
        secondsFormated(){
            return this.seconds >= 10 ? this.seconds : '0'+this.seconds
        }
    },
    created(){
        this.countDown()
    },
    mounted(){
        // this.$root.$on('restartTimer', () => {
        //     this.timesUp = false
        //     this.minutes = 15
        //     this.seconds = 0
        // })
    }
}
</script>
