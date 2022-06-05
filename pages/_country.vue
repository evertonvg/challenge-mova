<template>
    <v-app>
        <v-card v-if="pais!=''">
            <img :src="pais[0].flags.png" :alt="pais[0].name.common">
            {{pais[0].name.common}}
        </v-card>
        <h1 class="text-center mt-16" v-show="error!=''">
            {{error}}
        </h1>
    </v-app>
</template>
<script>
export default {
    head(){
        return{
            title: 'Countries - '+this.$route.params.country
        }
    },
    data() {
        return {
            pais:'',
            error:''
        }
    },
    methods:{
        
    },
    mounted(){
        this.$axios.$get(`name/${this.$route.params.country}`)
        .then((res)=>{
            this.pais = res
            console.log(this.pais)
        })
        .catch((err)=>{
            this.error = 'Page not found'
        })
        
    }
}
</script>