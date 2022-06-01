<template>
  <div class="container">
    <div class="list-group justify-content-center">
      <template
        v-for="question in questions.slice().reverse()"
        :key="question.id"
      >
        <router-link
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
import axios from "axios";
import Question from "@/cls/model/Question";

function getTotalAnswers(answers: any[]): number {
  let total = 0;
  console.log(answers);
  for (let answer of answers) {
    total += (answer as any).votes;
  }
  return total;
}

export default defineComponent({
  name: "QuestionList",
  data() {
    return {
      questions: [] as any[],
    };
  },

  async created() {
    axios
      .get("http://127.0.0.1:8000/api/v1/questions")
      .then((response) => {
        console.log(response.data);
        let questionsData: Array<any> = response.data;
        for (let questionData of questionsData) {
          let totalAnswers = getTotalAnswers(questionData.answers);
          let question = new Question({
            id: questionData.id,
            authorLogin: questionData.author_username,
            createdDate: questionData.pub_date,
            questionText: questionData.question_text,
            totalAnswerers: totalAnswers,
          });
          this.questions.push(question);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>

<style scoped></style>
