<template>
  <Main />
</template>

<script>
import Main from "./components/Main.vue";
import global from "@/global.js";

export default {
  name: "App",
  provide: {
    global,
  },
  components: {
    Main,
  },
};
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
