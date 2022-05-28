<template>
  <layout-header></layout-header>
  <order-page></order-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderPage from "./components/OrderPage.vue";
import LayoutHeader from "./layout/LayoutHeader.vue";

export default defineComponent({
  name: "App",
  components: { OrderPage, LayoutHeader },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
