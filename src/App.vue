<template>
  <div>
    <NavbarVue />
    <div class="m-14">
    <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
  import NavbarVue from "./components/Navbar.vue";
  
</script>

<style lang="scss" scoped>

</style>