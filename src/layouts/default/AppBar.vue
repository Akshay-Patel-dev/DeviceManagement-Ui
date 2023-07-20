<template>
  <v-navigation-drawer
  app
  location="left"
>
<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

  <v-divider></v-divider>

  <v-list density="compact" nav>
    <v-list-item prepend-icon="mdi-account-group-outline" title="Employees" value="Employee" router to="/employees"></v-list-item>
    <v-list-item prepend-icon="mdi mdi-devices" title="Devices" value="Device" router to="/devices"></v-list-item>
    <!-- <v-list-item prepend-icon="di mdi-package-variant-closed-check" title="Assignments" value="Assignment" router to="/assignments"></v-list-item> -->
  </v-list>
</v-navigation-drawer>

</template>

<script setup>
  
</script>
