<template>
  <div class="container">
    <h1>Create new polling</h1>
    <div class="d-flex justify-content-center">
      <div class="card">
        <div class="card-header">
          <input
            type="text"
            v-model="question"
            size="80"
            class="form-control"
            maxlength="120"
            placeholder="question"
          />
        </div>
        <div class="card-body">
          <ol v-for="answer in answers" :key="answer.id" class="list-group">
            <li class="list-group-item text-start">
              {{ answer.answer_text }}
              <button class="btn-danger" @click="deleteAnswer(answer.id)">
                X
              </button>
            </li>
          </ol>
          <input
            type="text"
            id="answerInput"
            size="60"
            class="form-control"
            v-model="currentAnswer"
            placeholder="answer"
            ref="answerInput"
          />
          <button
            class="btn btn-light mt-3"
            @click="addAnswer()"
            :disabled="currentAnswer === ''"
          >
            Add answer
          </button>
        </div>
        <div class="card-footer">
          <button
            class="btn btn-primary"
            @click="startPolling()"
            :disabled="!canStartPolling"
          >
            Start polling
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Answer, { AnswerObj } from "@/cls/model/Answer";

function getAnswerIndex(answers: any[], answerId: string): number {
  return answers.findIndex((answer) => answer.localAnswerId === answerId);
}

export default defineComponent({
  name: "CreateQuestionPage",
  data() {
    return {
      question: "",
      answers: [] as any[],
      currentAnswer: "",
      localAnswerId: 0,
    };
  },
  computed: {
    canStartPolling(): boolean {
      return this.question !== "" && this.answers.length > 1;
    },
  },
  methods: {
    addAnswer() {
      this.answers.push({
        answer_text: this.currentAnswer,
        localAnswerId: this.localAnswerId++,
      });
      this.currentAnswer = "";
    },
    deleteAnswer(answerId: string) {
      this.answers.splice(getAnswerIndex(this.answers, answerId), 1);
    },
    startPolling() {
      this.answers.forEach((answer) => delete answer["localAnswerId"]);
      this.$store.dispatch("ADD_QUESTION", {
        question_text: this.question,
        answers: this.answers,
        author: this.$store.state.user.id,
      });
      this.$store.state.ws.send(
        JSON.stringify({
          type: "added_new_question",
          message: `added new questions`,
        })
      );
      this.$router.push("/home");
    },
  },
});
</script>

<style scoped></style>
