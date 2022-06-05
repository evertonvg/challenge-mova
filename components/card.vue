<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <div class="overflow-hidden card mx-auto mb-12" v-bind="attrs" v-on="on">
            <img :src="pais.flags[0]" :alt="pais.name.common">
            <!-- utilize "pais.flags.png" caso o metodo acima não esteja funcionando (durante o teste a api mudou as chaves)-->
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
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  .card img{
    object-fit:cover;
    width:100%;
    height:100%
  }
</style>