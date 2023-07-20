<template>
  <v-app>
    
    <default-bar />
    <v-main >
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
</script>
