<template>
    <v-app-bar
      height="100"
      fixed
      app
    >
        <img src="../static/img/logo_principal.svg" alt="Logo da Mova">
        <v-spacer></v-spacer>
        <v-btn class="primary--text rounded-0 border-sm-0" depressed :outlined="$vuetify.breakpoint.name!='xs'" @click="$router.push('/')">
            <v-icon :left="$vuetify.breakpoint.name!='xs'" :right="$vuetify.breakpoint.name=='xs'" :x-large="$vuetify.breakpoint.name=='xs'">mdi-keyboard-return</v-icon>
            <span class="text-capitalize h6 hidden-sm-and-down">
                Voltar
            </span>
        </v-btn>
    </v-app-bar>
</template>
<script>
export default {
    name:"MainHead"
}
</script>