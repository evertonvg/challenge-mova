<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <div class="overflow-hidden card mx-auto mb-12" v-bind="attrs" v-on="on">
            <img :src="pais.flags.png" :alt="pais.name.common">
            </div>
        </template>
        <span>{{pais.name.common}}</span>
    </v-tooltip>
</template>
<script>
export default {
    name:'card',
    props:['pais']
}
</script>
<style>
 .card{
    width:316px;
    height: 181px;
    max-width: 100%;
  }
  .card img{
    object-fit:cover;
    width:100%;
    height:100%
  }
</style>