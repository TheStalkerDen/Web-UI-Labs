<template>
  <div class="container">
    <div
      v-if="!this.$store.state.user"
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
              <template v-if="!$store.state.user || isAlreadyVote">
                {{ answer.votes }} |
              </template>
              <template v-else>
                <input
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
          <template v-if="$store.state.user && !isAlreadyVote">
            <button class="mt-2 btn btn-primary" @click="vote">Vote</button>
          </template>
          <template v-else-if="$store.state.user && isAlreadyVote">
            <div class="alert alert-info" role="alert">
              Thank you for you vote!
            </div>
          </template>
        </div>
      </div>
    </div>
    <div>
      <button
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
import { HTTP } from "@/http";
import Answer from "@/cls/model/Answer";

export default defineComponent({
  name: "QuestionPage",
  data() {
    return {
      question: new Question({ authorLogin: "" }),
      pickedAnswerId: "",
      votedAnswerId: "",
      isAlreadyVote: false,
    };
  },
  computed: {
    canDeletePolling(): boolean {
      if (!this.$store.state.user) {
        return false;
      }
      const userLogin = this.$store.state.user.login;
      return userLogin === "admin" || userLogin === this.question.authorLogin;
    },
  },
  async beforeMount() {
    await this.$store.dispatch("LOAD_QUESTION", this.$route.params.questionId);
    this.question = this.$store.state.currentQuestion;
    try {
      if (this.$store.state.user) {
        const response = await HTTP.get(
          `/questions/${this.question.id}/is-already-vote`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.accessToken}`,
            },
          }
        );
        this.isAlreadyVote = response.data["is-already-vote"];
      }
    } catch (error) {
      console.log(error);
    }
    // if (this.$store.state.username) {
    //   const userLogin = this.$store.state.currentUser.login;
    //   this.votedAnswerId = this.question.findVotedAnswerId(userLogin);
    // }
  },
  methods: {
    async vote() {
      try {
        await HTTP.patch(
          `/questions/${this.$route.params.questionId}/answers/${this.pickedAnswerId}/vote`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.accessToken}`,
            },
          }
        );
        this.$store.dispatch(
          "INCR_VOTES_IN_CURRENT_QUESTION_ANSWER",
          this.pickedAnswerId
        );
        this.votedAnswerId = this.pickedAnswerId;
        this.isAlreadyVote = true;
        this.$store.state.ws.send(
          JSON.stringify({
            type: "vote_for_answer",
            message: `vote for answer with id ${this.votedAnswerId}`,
            answerId: this.votedAnswerId,
            questionId: this.question.id,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deletePolling() {
      if (confirm("Do you really want to delete this polling?")) {
        await this.$store.dispatch(
          "DELETE_QUESTION",
          this.$route.params.questionId
        );
        this.$store.state.ws.send(
          JSON.stringify({
            type: "deleted_question",
            message: `deleted question with id ${this.question.id}`,
            questionId: this.question.id,
          })
        );
        await this.$router.push("/home");
      }
    },
  },
});
</script>
