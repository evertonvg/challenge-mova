<template>
    <div class="text-center">
        <v-pagination
        v-show="totalCountries > 10"
        v-model="thisPage"
        :length="lengthpage"
        :total-visible="7"
        color="primary"
        ></v-pagination>
    </div>
</template>
<script>
export default {
    name:'paginate',
    props:[
        'totalCountries','lengthpage','page'
    ],
    data() {
        return {
            thisPage:1
        }
    },
    methods:{
        resetPage(){
            this.thisPage = 1
        }
    },
    watch: {
        thisPage(){
            this.$emit('actualPage',this.thisPage)
        }
    }
}
</script>
