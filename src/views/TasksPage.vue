<template>
  <h1>Tasks</h1>
  <button class="btn btn-primary m-1" @click="startTask('email_sending')">
    Send emails
  </button>
  <button class="btn btn-primary m-1" @click="startTask('getAllVotes')">
    Get all votes count
  </button>
  <button class="btn btn-primary m-1" @click="startTask('generateReport')">
    Generate report
  </button>
  <div class="container justify-content-center">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Task data</th>
          <th scope="col">Result</th>
          <th scope="col">end date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in this.$store.state.completedTasks" :key="task">
          <td>{{ task.name }}</td>
          <td>{{ task.data }}</td>
          <td>{{ task.result }}</td>
          <td>{{ task.endDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TasksPage",
  methods: {
    startTask(taskType) {
      console.log("sending starting");
      this.$store.state.ws.send(
        JSON.stringify({
          type: "start_task",
          task_type: taskType,
        })
      );
    },
  },
});
</script>

<style scoped></style>
