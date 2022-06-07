<template>
    <v-container>
        <section v-if="pais!=''" class="d-flex flex-column flex-md-row mt-5 mt-sm-16 mb-sm-12">
            <div class="flag ml-md-8 mx-auto">
                <img :src="pais.flags[0] || pais.flags[1]" :alt="pais.name.common">
                <!-- utilize "pais.flags.png" caso o metodo acima não esteja funcionando (durante o teste a api mudou as chaves)-->
            </div>
            <list :pais="pais" />
        </section>

        <div class="ml-sm-8 pt-16 mb-12 select-limit mx-auto"  v-if="borders.length>1">
            Neighboring countries
        </div>
        <div class="ml-sm-8 pt-16 mb-12 select-limit mx-auto" v-else>
            this country has no neighbors
        </div>

        <cards :countries="borders" :itensPerpage="itensPerpage" :page="page"></cards>
  
        <paginate :totalCountries="totalCountries" :page="page" :lengthpage="lengthpage" v-on:actualPage="attPage" 
            ref="paginate" :itensPerpage="itensPerpage">
        </paginate>

        <h1 class="text-center mt-16" v-show="error!=''">
            {{error}}
        </h1>

        <loading v-show="showload"></loading>

    </v-container>
</template>
<script>
import global from '../mixins.js/global'
import cards from '../components/cards.vue'
import paginate from '../components/paginate.vue'
import list from '../components/list.vue'
export default {
    head(){
        return{
            title: 'Countries - '+this.$route.params.country
        }
    },
    components:{
        'cards':cards,
        'paginate':paginate,
        'list':list
    },
    data() {
        return {
            pais:'',
            error:'',
            borders:[],
            page:1,
            totalCountries:0,
            lengthpage:0
        }
    },
    mixins:[global],
    watch:{
        borders(){
            this.totalCountries = this.borders.length
            this.lengthpage = Math.ceil(this.totalCountries/this.itensPerpage)
        }
    },
    async mounted(){
        this.$axios.$get(`name/${this.$route.params.country}`)
        .then((res)=>{
            this.pais = res[0]
            let borders = res[0].borders
            this.showload = false
            borders.forEach((b)=>{
                this.$axios.$get(`name/${b}`)
                .then((resp)=>{
                    this.borders.push(resp[0])
                })
                .catch((err)=>{
                    return 
                })
            })
        })
        .catch((err)=>{
            this.error = responseError(err)
        })
    }
}
</script>
<style>
    .flag{
        width: 443px;
        height: 181px;
        max-width: 316px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
    .flag img {
        width:100%;
        height: 100%;
        object-fit: cover;
    }
    .content{
        width: 316px;
        margin: auto;
    }
    
    @media(min-width:600px){
        .flag{
            height:258px;
            max-width: 100%;
        }
        .content{
            width: 443px;
        }
    }
</style>