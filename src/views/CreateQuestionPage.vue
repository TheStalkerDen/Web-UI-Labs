<template>
  <div class="container">
    <h1>Create new polling</h1>
    <div class="d-flex justify-content-center">
      <div class="card">
        <div class="card-header">
          <input
            name="question-text"
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
              {{ answer.answerText }}
              <button
                class="btn-danger"
                :id="`delete-answer-${answer.id}`"
                @click="deleteAnswer(answer.id)"
              >
                X
              </button>
            </li>
          </ol>
          <input
            name="answer-text"
            type="text"
            id="answerInput"
            size="60"
            class="form-control"
            v-model="currentAnswer"
            placeholder="answer"
            ref="answerInput"
          />
          <button
            id="addAnswer"
            class="btn btn-light mt-3"
            @click="addAnswer()"
            :disabled="currentAnswer === ''"
          >
            Add answer
          </button>
        </div>
        <div class="card-footer">
          <button
            id="startPolling"
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
import Answer from "@/cls/model/Answer";

function getAnswerIndex(answers: Answer[], answerId: string): number {
  return answers.findIndex((answer) => answer.id === answerId);
}

export default defineComponent({
  name: "CreateQuestionPage",
  data() {
    return {
      question: "",
      answers: [] as Answer[],
      currentAnswer: "",
    };
  },
  computed: {
    canStartPolling(): boolean {
      return this.question !== "" && this.answers.length > 1;
    },
  },
  methods: {
    addAnswer() {
      this.answers.push(
        new Answer({
          answerText: this.currentAnswer,
        })
      );
      this.currentAnswer = "";
    },
    deleteAnswer(answerId: string) {
      this.answers.splice(getAnswerIndex(this.answers, answerId), 1);
    },
    startPolling() {
      this.$store.commit("ADD_QUESTION", {
        questionText: this.question,
        answers: this.answers,
        authorLogin: this.$store.state.currentUser.login,
      });
      this.$router.push("/home");
    },
  },
});
</script>

<style scoped></style>
