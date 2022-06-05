<template>
    <v-layout wrap>
        <transition name="fade" v-for="(pais, index) in countries" :key="index">
            <v-flex xs12 sm6 lg4 v-show="index < page*itensPerpage && index >= (page-1)*itensPerpage">
                <Nuxt-Link :to="`${pais.name.common}`">
                    <card :pais="pais"/>
                </Nuxt-Link>
            </v-flex>
        </transition>
    </v-layout>
</template>
<script>
import card from '../components/card.vue'
export default {
    props:['countries','page','itensPerpage'],
    components:{
        'card':card
    }
    
}
</script>
<style>
</style>
