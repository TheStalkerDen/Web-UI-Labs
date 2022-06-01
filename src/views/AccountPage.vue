<template>
  <h1>Account Page</h1>
  <div class="container">
    <table class="table justify-content-center">
      <tbody>
        <tr>
          <td>Login</td>
          <td>{{ user.login }}</td>
        </tr>
        <tr>
          <td>Birthdate</td>
          <td>{{ user.birthdate }}</td>
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
    if (!this.$store.state.user) {
      this.$router.push("/login");
    }
    this.user = this.$store.state.user;
  },
  data() {
    return {
      user: null,
    };
  },
});
</script>
