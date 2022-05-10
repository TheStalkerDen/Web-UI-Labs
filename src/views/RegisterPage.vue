<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card login-card">
        <div class="card-header">
          <h1 class="card-title mb-2 mt-1">Register</h1>
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
                :class="{
                  'is-invalid': isUserAlreadyExist,
                  'mb-0': isUserAlreadyExist,
                }"
                id="loginInput"
                size="30"
                v-model="input.login"
              />
              <div
                v-if="isUserAlreadyExist"
                class="invalid-feedback text-start"
              >
                This user already exist
              </div>
            </div>
            <div>
              <label for="passwordInput" class="form-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                class="form-control"
                size="30"
                id="passwordInput"
                v-model="input.password"
              />
            </div>
            <div>
              <label for="birthdateInput" class="form-label">Birthdate:</label>
              <input
                type="date"
                name="date"
                class="form-control"
                id="birthdateInput"
                v-model="input.birthdate"
              />
            </div>
            <button
              class="btn btn-light"
              @click="register()"
              :disabled="!canRegister"
            >
              Register
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
  name: "RegisterPage",
  data() {
    return {
      input: {
        login: "",
        password: "",
        birthdate: "",
      },
    };
  },
  computed: {
    isUserAlreadyExist(): boolean {
      return (
        this.input.login !== "" &&
        this.$store.state.users.findByLogin(this.input.login) != null
      );
    },
    canRegister(): boolean {
      return (
        this.input.login !== "" &&
        this.input.password !== "" &&
        this.input.birthdate !== "" &&
        !this.isUserAlreadyExist
      );
    },
  },
  methods: {
    register() {
      this.$store.dispatch("ADD_USER", {
        login: this.input.login,
        password: this.input.password,
        birthdate: this.input.birthdate,
      });
      this.$router.push("/login");
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
