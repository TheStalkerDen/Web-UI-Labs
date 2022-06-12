<template>
  <nav>
    <template v-if="this.$store.state.user">
      <router-link to="/account">My Account</router-link>
      |
      <router-link to="/login" v-on:click="this.logout()" replace>
        Logout
      </router-link>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/register">Register</router-link>
    </template>
    <router-link to="/home">Home</router-link>
    |
    <template v-if="isAdmin()">
      <router-link to="/users">Users</router-link>
      |
      <router-link to="/online-users">Online Users</router-link>
      |
    </template>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import User from "@/cls/model/User";
import { QuestionObject } from "@/cls/model/Question";
import { getConfiguredWS } from "@/websocket";

export default defineComponent({
  name: "App",
  data() {
    return {};
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LOGOUT");
      this.$store.state.ws.close();
      this.$store.state.ws = getConfiguredWS(this.$store);
      await this.$router.push("/login");
    },
    isAdmin() {
      return this.$store.state.user && this.$store.state.user.login === "admin";
    },
  },
  beforeMount() {
    this.$store.state.ws = getConfiguredWS(this.$store);
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
