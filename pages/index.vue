<template>
<v-container>
  <!-- start area de pesquisa  -->
  <v-layout row wrap class="mb-12 mt-16">
    <v-flex xs12 sm6 lg4>
      <v-select v-model="filter" :items="options" item-text="name" item-value="value"
        label="Filter by" class="select mx-auto" @change="changeOptionsFilter">
      </v-select>
    </v-flex>
    <v-flex xs12 sm6 lg4>
      <v-select v-if="filter!=''" item-text="language" item-value="abbr" v-model="secondFilter"
        :items="filterItens" :label="filterFor" class="select mx-auto">
      </v-select>
    </v-flex>
    <v-flex sm12 md6 lg4 v-show="secondFilter!=''">
      <div class="select mx-auto">
        <v-btn color="primary" depressed :class="`white--text rounded-lg px-8 ${$vuetify.breakpoint.name=='xs' ? 'float-right':''}`"  :right="$vuetify.breakpoint.name=='xs'" @click="search">
        Pesquisar
      </v-btn>
      </div>
    </v-flex>
  </v-layout>
  <!-- end area de pesquisa  -->

  <!-- start area de cards  -->
  <v-layout wrap>
    <transition name="fade" v-for="(pais, index) in countries" :key="index">
      <v-flex xs12 sm6 lg4 v-show="index < page*itensPerpage && index >= (page-1)*itensPerpage">
        <Nuxt-Link :to="pais.name.common">
          <card :pais="pais">
          </card>
        </Nuxt-Link>
      </v-flex>
    </transition>
  </v-layout>
  <!-- end area de cards  -->

  <!-- start paginação  -->
  <div class="text-center mb-15 mt-12">
    <paginate :totalCountries="totalCountries" :page="page" :lengthpage="lengthpage" v-on:actualPage="attPage" ref="paginate">
    </paginate>
  </div>
  <!-- end paginação  -->

  <!-- start area de avisos  -->
  <h1 class="text-center mt-16" v-show="error!=''">
      {{error}}
  </h1>
  <!-- end area de avisos  -->

  <!-- start componente de loading  -->
  <loading v-show="showload"></loading>
  <!-- end componente de loading  -->
</v-container>
</template>

<script>
import card from '../components/card.vue'
import paginate from '../components/paginate.vue'
import loading from '../components/loading.vue'
export default {
  name: 'Home',
  components:{'card' : card,'paginate':paginate,'loading':loading},
  data() {
    return {
      itensPerpage:12,
      showload:true,
      error:'',
      filter:'country',
      secondFilter:'',
      filterFor:'',
      options: [
        {
          name:'Região',
          value:'region'
        },
        {
          name: 'Capital',
          value:'capital'
        },
        {
          name:'Lingua',
          value:'language'
        },
        {
          name:'Pais',
          value:'country'
        },
      ],
      allData:'',
      countries:'',
      filterItens:[],
      page:1,
      lengthpage:0,
      totalCountries:0,
    }
  },
  methods:{
    async changeOptionsFilter(){
      this.filterItens = []
      switch(this.filter){
        case 'region':
          this.filterFor = 'Choose a region'
          this.filterItens = _.map(this._.orderBy(this.allData, ['region'],['asc']),  function(obj){
            return obj.region
          });
          this.filterItens = [...new Set(this.filterItens)]
        break
        case 'capital':
          this.filterFor = 'Choose a capital'
          this.filterItens = _.map(this._.orderBy(this.allData, ['capital'],['asc']),  function(obj){
            return obj.capital
          });
  
        break
        case 'language':
          let prefilter = []
          this.filterFor = 'Choose a language'
          prefilter = await  _.map(this.allData,  function(obj){
            if(obj.languages!=undefined){
              return obj.languages
            }else{
              return {
                lang:'No language'
              }
            }
          });
     
          let languages = []
          prefilter.forEach(element => {
            Object.keys(JSON.parse(JSON.stringify(element))).forEach((ev,ind)=>{
              languages.push({
                abbr: ev,
                language: Object.values(JSON.parse(JSON.stringify(element)))[ind]
              })
            })
          });
          this.filterItens = this._.orderBy(languages, ['language'],['asc'])
        break;
        case 'country':
          this.filterFor = 'Choose a country'
          this.filterItens = _.map(this._.orderBy(this.allData, ['name.common'],['asc']),  function(obj){
            return obj.name.common
          });
        break
      }
    },
    attPage(ev){
      this.page = ev
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    search(){
      this.showload = true
      this.$refs['paginate'].resetPage()
      let url;
      switch(this.filter){
        case 'region':
          url = `region/${this.secondFilter}`
        break
        case 'capital':
          url = `capital/${this.secondFilter}`
        break
        case 'language':
          url = `lang/${this.secondFilter}`
        break
        case 'country':
          if(this.secondFilter==''){
            url = `all`
          }else{
            url = `name/${this.secondFilter}`
          }
          
        break
      }
      this.$axios.$get(url)
      .then((res)=>{
        this.countries = this._.orderBy(res, ['name.common'],['asc'])
        this.totalCountries = res.length
        this.lengthpage = Math.ceil(this.totalCountries/this.itensPerpage)
        this.showload = false
      })
      .catch((err)=>{
          this.err = err
      })
    }
  },
  mounted(){
    this.$axios.$get('all')
    .then((res)=>{
      this.allData = res
      this.search()
      this.changeOptionsFilter()
    })
    .catch((err)=>{
        this.err = err
    })
    
  }
}
</script>
