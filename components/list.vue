<template>
    <div class="content px-md-6 flex-md-grow-1">
        <v-list class="pt-sm-0 select mx-auto">
            <v-list-item class="px-0 px-md-4">
                <v-list-item-content>
                    <v-list-item-title>Name: {{pais.name.common}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item >
            <v-list-item class="px-0 px-md-4">
                <v-list-item-content>
                    <v-list-item-title>capital: {{pais.capital[0]}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="px-0 px-md-4">
                <v-list-item-content>
                    <v-list-item-title>Region: <Nuxt-Link :to="`/?query=region&value=${pais.region}`">{{pais.region}}</Nuxt-Link></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="px-0 px-md-4">
                <v-list-item-content>
                    <v-list-item-title>Sub-region: {{pais.continents[0]}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="px-0 px-md-4">
                <v-list-item-content>
                    <v-list-item-title>Population: {{ (Math.round(pais.population * 100) / 100).toLocaleString() }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="px-0 px-md-4">
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
</template>

<script>
export default {
    name:'list',
    props:['pais'],
    data() {
        return {
            country : this.pais
        }
    },
}
</script>
<style>
    .v-list-item{
        min-height: 0;
    }
</style>