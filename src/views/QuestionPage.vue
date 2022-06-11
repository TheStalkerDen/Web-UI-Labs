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

function getAnswers(responseAnswers: any[]): Answer[] {
  let answers: Answer[] = [];
  for (let responseAnswer of responseAnswers) {
    answers.push(
      new Answer({
        id: responseAnswer.id,
        answerText: responseAnswer.answer_text,
        votes: responseAnswer.votes,
      })
    );
  }
  return answers;
}

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
  beforeMount() {
    HTTP.get(`questions/${this.$route.params.questionId}`).then(
      (response: any) => {
        this.question = new Question({
          authorLogin: response.data.author,
          questionText: response.data.question_text,
          answers: getAnswers(response.data.answers),
        });
        console.log(response);
      }
    );

    // if (this.$store.state.username) {
    //   const userLogin = this.$store.state.currentUser.login;
    //   this.votedAnswerId = this.question.findVotedAnswerId(userLogin);
    // }
  },
  methods: {
    async vote() {
      await HTTP.patch(
        `/questions/${this.$route.params.questionId}/answer/${this.pickedAnswerId}/vote`,
        null,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`,
          },
        }
      );
      this.votedAnswerId = this.pickedAnswerId;
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
            message: `deleted question`,
          })
        );
        await this.$router.push("/home");
      }
    },
  },
});
</script>
