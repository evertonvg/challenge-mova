<template>
  <v-container>
    <v-layout row wrap class="mb-12 mt-16">
      <v-flex xs12 sm6 lg4>
        <v-select v-model="filter" :items="options" item-text="name" item-value="value"
          label="Filter by" class="select-limit mx-auto" @change="changeOptionsFilter">
        </v-select>
      </v-flex>
      <v-flex xs12 sm6 lg4>
        <v-select v-if="filter!=''" item-text="language" item-value="abbr" v-model="secondFilter"
          :items="filterItens" :label="filterFor" class="select-limit mx-auto">
        </v-select>
      </v-flex>
      <v-flex sm12 md12 lg4 v-show="secondFilter!=''">
        <div class="search-limit text-right text-sm-left">
          <v-btn color="primary" depressed class="white--text rounded-lg px-8 ml-0 ml-sm-8 ml-md-15 ml-lg-0"  
          :right="$vuetify.breakpoint.name=='xs'" @click="search">
          Pesquisar
        </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <cards :countries="countries" :itensPerpage="itensPerpage" :page="page" />

    <div class="text-center mb-15 mt-12">
      <paginate :totalCountries="totalCountries" :page="page" :lengthpage="lengthpage" v-on:actualPage="attPage" ref="paginate" :itensPerpage="itensPerpage">
      </paginate>
    </div>

    <h1 class="text-center mt-16" v-show="error!=''">
        {{error}}
    </h1>

    <loading v-show="showload"></loading>
  </v-container>
</template>

<script>

import paginate from '../components/paginate.vue'
import cards from '../components/cards.vue'
import global from '../mixins.js/global'

export default {
  name: 'Home',
  components:{ "paginate": paginate,'cards':cards },
  data() {
    return {
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
  mixins:[global],

  methods:{
    async changeOptionsFilter(){
      this.filterItens = []
      // this.secondFilter = ''
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
            }
            else{
              return {
                eng:'english'
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
        this.error = ''
        this.countries = this._.orderBy(res, ['name.common'],['asc'])
        this.totalCountries = res.length
        this.lengthpage = Math.ceil(this.totalCountries/this.itensPerpage)
        this.showload = false
      })
      .catch((err)=>{
          this.error = this.responseError(err)
          this.showload = false
      })
    }
  },
  mounted(){
    const urlId = new URLSearchParams(location.search)
    if(urlId.get('query')!=null && urlId.get('value')!=null){
      switch(urlId.get('query')){
        case 'region':
        case 'capital':
        case 'language':
        case 'country':
           this.filter = urlId.get('query')
        break
        default:
          this.filter = 'country'
      }
      this.secondFilter = urlId.get('value')
    }
    this.$axios.$get('all')
    .then((res)=>{
      this.allData = res
      if(urlId.get('value')!=null){
        this.secondFilter = urlId.get('value')
      }
      this.search()
      this.changeOptionsFilter()
      if(urlId.get('value')!=null){
        this.secondFilter = urlId.get('value')
      }
    })
    .catch((err)=>{
        this.err = this.responseError(err)
    })
    
  }
}
</script>
<style>
  .select-limit{
    width: 316px;
    max-width:100%;
  }
  .search-limit{
    width: 316px;
    max-width:100%;
    margin: auto;
  }

  @media(min-width:600px){
    .search-limit{
      margin:initial;
    }
  }
</style>
