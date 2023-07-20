<template>
  <v-app>
    <component :is="isAuthenticated ? Default : LoginComponent" />
  </v-app>
</template>

<script setup>
import Default from './DefaultApp.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import { useAppStore } from '../../store/app'
import { computed } from 'vue'

const appstore = useAppStore();
const isAuthenticated = computed(() => appstore.isAuthenticated);
// console.log(appstore.isAuthenticated, "isauth component")
</script>