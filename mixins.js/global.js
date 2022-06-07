import loading from '../components/loading.vue'
export default{
    components:{
        'loading':loading
    },
    data() {
        return {
            showload:true,
            itensPerpage:12
        }
    },
    methods:{
        responseError(err){
            switch(err.response.status){
               case 500:
                   return 'internal server error'
               break
               case 404:
                   return 'Page not found'
               break
               default:
                   return 'Unable to claim the countries, please try later.'
            }
        },
        attPage(ev){
            this.page = ev
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
        }
    }
}