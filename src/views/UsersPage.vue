<template>
  <h1>All Users</h1>
  <UsersTable :users="$store.state.users.userList" />
</template>

<script>
import UsersTable from "../components/UsersTable";
export default {
  name: "UsersPage",
  components: { UsersTable },
};
</script>

<style scoped></style>
