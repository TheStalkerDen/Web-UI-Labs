<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h1 class="card-title mb-2 mt-1">Sign in</h1>
        </div>
        <div class="card-body">
          <div class="form-panel">
            <div>
              <label for="loginInput" class="form-label">Login</label>
              <input
                type="text"
                name="login"
                placeholder="login"
                class="form-control"
                id="loginInput"
                size="30"
                v-model="loginData.login"
              />
            </div>
            <div>
              <label for="passwordInput" class="form-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                class="form-control"
                id="passwordInput"
                size="30"
                v-model="loginData.password"
              />
            </div>
            <button
              id="loginButton"
              class="btn btn-light"
              type="submit"
              @click="login()"
              :disabled="!canLogin"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      loginData: {
        login: "",
        password: "",
      },
    };
  },
  computed: {
    canLogin(): boolean {
      return this.loginData.login !== "" && this.loginData.password !== "";
    },
  },
  methods: {
    login() {
      this.$store.commit("LOGIN", this.loginData);
      if (this.$store.state.currentUser) {
        this.$router.push("/account");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.form-panel {
  input {
    margin-bottom: 20px;
  }
}
</style>
