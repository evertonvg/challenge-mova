<template>
    <v-container>
        <!-- start componente com informações sobre o pais  -->
        <section v-if="pais!=''" class="d-flex flex-column flex-md-row mt-5 mt-sm-16 mb-sm-12">
            <div class="flag ml-md-8 mx-auto">
                <img :src="pais.flags[0]" :alt="pais.name.common">
                <!-- utilize "pais.flags.png" caso o metodo acima não esteja funcionando (durante o teste a api mudou as chaves)-->
            </div>
            <div class="content px-sm-6 flex-grow-1">
                <v-list class="pt-sm-0 select mx-auto">
                    <v-list-item class="px-0 px-sm-4">
                        <v-list-item-content>
                            <v-list-item-title>Name: {{pais.name.common}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item >
                    <v-list-item class="px-0 px-sm-4">
                        <v-list-item-content>
                            <v-list-item-title>capital: {{pais.capital[0]}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="px-0 px-sm-4">
                        <v-list-item-content>
                            <v-list-item-title>Region: <Nuxt-Link :to="`/?query=region&value=${pais.region}`">{{pais.region}}</Nuxt-Link></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="px-0 px-sm-4">
                        <v-list-item-content>
                            <v-list-item-title>Sub-region: {{pais.continents[0]}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="px-0 px-sm-4">
                        <v-list-item-content>
                            <v-list-item-title>Population: {{ (Math.round(pais.population * 100) / 100).toLocaleString() }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="px-0 px-sm-4">
                        <v-list-item-content>
                            <v-list-item-title>Languages: 
                                <span v-for=" (language,key,index) in pais.languages" :key="language.nativeName">
                                <span v-if="index!=0">,</span>
                                {{language}}
                                <span v-if="index == Object.keys(pais.languages).length - 1">.</span>
                                </span> 
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </div>
        </section>
        <!-- end componente com informações sobre o pais   -->
        <div class="ml-sm-8 pt-16 mb-12 select mx-auto" v-show="borders.length>1">
            Neighboring countries
        </div>
        <!-- start componente de cards com os vizinhos  -->
        <cards :countries="borders" :itensPerpage="itensPerpage" :page="page"></cards>
        <!-- end componente de cards com os vizinhos -->

        <!-- start paginação de paises vizinhos  -->
        <paginate :totalCountries="totalCountries" :page="page" :lengthpage="lengthpage" v-on:actualPage="attPage" ref="paginate" :itensPerpage="itensPerpage">
        </paginate>
        <!-- end paginação de paises vizinhos-->

        <!-- start aviso de erro  -->
        <h1 class="text-center mt-16" v-show="error!=''">
            {{error}}
        </h1>
        <!-- end aviso de erro  -->

        <!-- start componente de loading  -->
        <loading v-show="showload"></loading>
        <!-- end componente de loading  -->
    </v-container>
</template>
<script>
import global from '../mixins.js/global'
import cards from '../components/cards.vue'
import paginate from '../components/paginate.vue'
export default {
    head(){
        return{
            title: 'Countries - '+this.$route.params.country
        }
    },
    components:{
        'cards':cards,
        'paginate':paginate
    },
    data() {
        return {
            pais:'',
            error:'',
            borders:[],
            itensPerpage:12,
            page:1,
            totalCountries:0,
            lengthpage:0
        }
    },
    mixins:[global],
    methods:{
        
    },
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
    @media(min-width:600px){
        .flag{
            height:258px;
            max-width: 100%;
        }
    }
</style>