<template>
  <v-app>
    <v-main>
      <main-component />
    </v-main>
  </v-app>
</template>

<script>
import MainComponent from './components/main-component.vue'

export default {
  name: 'App',

  components: {
    MainComponent,
  },

  data: () => ({
    //
  }),
}
</script>

<style lang="scss">
* {
  font-family: 'Cica';
}
</style>
