<template>
  <div class="container">
    <div
      v-if="!this.$store.state.currentUser"
      class="alert alert-warning"
      role="alert"
    >
      Only registered users can part in polling!
    </div>
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h3>{{ question.questionText }}</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li
              v-for="answer in this.question.answers"
              :key="answer.id"
              class="list-group-item text-start"
              :class="{
                'list-group-item-success': votedAnswerId === answer.id,
              }"
            >
              <template v-if="!$store.state.currentUser || isAlreadyVote">
                {{ answer.answerers.length }} |
              </template>
              <template v-else>
                <input
                  :id="`vote-answer-${answer.id}`"
                  type="radio"
                  name="answerChoose"
                  :value="answer.id"
                  v-model="pickedAnswerId"
                />
                |
              </template>
              {{ answer.answerText }}
            </li>
          </ul>
          <template v-if="$store.state.currentUser && !isAlreadyVote">
            <button id="vote-button" class="mt-2 btn btn-primary" @click="vote">
              Vote
            </button>
          </template>
          <template v-else-if="$store.state.currentUser && isAlreadyVote">
            <div class="alert alert-info" role="alert">
              Thank you for your vote!
            </div>
          </template>
        </div>
      </div>
    </div>
    <div>
      <button
        id="deletePolling"
        v-if="canDeletePolling"
        class="btn btn-danger"
        @click="deletePolling"
      >
        Delete polling
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Question from "@/cls/model/Question";

export default defineComponent({
  name: "QuestionPage",
  data() {
    return {
      question: new Question({ authorLogin: "" }),
      pickedAnswerId: "",
      votedAnswerId: "",
    };
  },
  computed: {
    isAlreadyVote(): boolean {
      const answererLogin = this.$store.state.currentUser.login;
      return this.question.isAlreadyVote(answererLogin);
    },
    canDeletePolling(): boolean {
      if (!this.$store.state.currentUser) {
        return false;
      }
      const userLogin = this.$store.state.currentUser.login;
      return (
        userLogin === "admin" || userLogin === this.question.totalAnswerers
      );
    },
  },
  beforeMount() {
    this.question = this.$store.state.questions.getQuestion(
      this.$route.params.questionId as string
    );
    if (this.$store.state.currentUser) {
      const userLogin = this.$store.state.currentUser.login;
      this.votedAnswerId = this.question.findVotedAnswerId(userLogin);
    }
  },
  methods: {
    vote() {
      const answererLogin = this.$store.state.currentUser.login;
      this.question.addVoteToAnswer(this.pickedAnswerId, answererLogin);
      this.votedAnswerId = this.pickedAnswerId;
    },
    deletePolling() {
      if (confirm("Do you really want to delete this polling?")) {
        this.$store.commit("DELETE_QUESTION", this.question.id);
        this.$router.push("/home");
      }
    },
  },
});
</script>
