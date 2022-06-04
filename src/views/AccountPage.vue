<template>
  <h1>Account Page</h1>
  <div class="container">
    <table class="table justify-content-center">
      <tbody>
        <tr>
          <td>Login</td>
          <td>{{ currentUser.login }}</td>
        </tr>
        <tr>
          <td>Birthdate</td>
          <td>{{ currentUser.birthdate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountPage",
  beforeMount() {
    this.currentUser = this.$store.state.currentUser;
  },
  data() {
    return {
      currentUser: null,
    };
  },
});
</script>
