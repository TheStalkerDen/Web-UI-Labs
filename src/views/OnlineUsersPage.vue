<template>
  <h1>Online Users</h1>
  <ul>
    <li v-for="user in this.$store.state.onlineUsers" :key="user">
      {{ user }}
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OnlineUserPage",
});
</script>

<style scoped></style>
