<template>
  <h1>About web-site</h1>
  <img alt="logo-image" src="../assets/logo.png" class="rounded mb-3" />
  <p>This is a polling web-site created by Yermolenko Denys KV-12mp</p>
  <p>
    Polling looks like question with predefined answers. Only registered users
    can create polling and answer. Author of the polling can delete it.
  </p>
  <p>Admin user has possibility to see all users and delete any polling</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutPage",
});
</script>
