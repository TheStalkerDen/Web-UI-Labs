<template>
  <div class="container">
    <div class="list-group justify-content-center">
      <template
        v-for="question in questions.slice().reverse()"
        :key="question.id"
      >
        <router-link
          :id="`question-card-${question.id}`"
          :to="{ path: '/questions/' + question.id }"
          class="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div>
            <h5 class="mb-1 text-center">{{ question.questionText }}</h5>
          </div>
          <p class="mb-1">{{ question.totalAnswerers }} users answer</p>
          <small
            >Created by: {{ question.authorLogin }}, on
            {{ question.createdDate.toLocaleDateString() }}</small
          >
        </router-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionList",
  props: {
    questions: Array,
  },
});
</script>

<style scoped></style>
