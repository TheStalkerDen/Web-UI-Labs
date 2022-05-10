<template>
  <div class="container justify-content-center">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Login</th>
          <th scope="col">Password</th>
          <th scope="col">Birthdate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user">
          <td>{{ user.login }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.birthdate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UsersTable",
  props: {
    users: Array,
  },
};
</script>

<style scoped></style>
