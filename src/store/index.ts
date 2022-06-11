import { createStore } from "vuex";
import User from "@/cls/model/User";
import Question, { QuestionObject } from "@/cls/model/Question";
import { HTTP } from "@/http";
import { getConfiguredWS } from "@/websocket";

export interface State {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  questions: Question[];
  ws: WebSocket | null;
}

function getTotalAnswers(answers: any[]): number {
  let total = 0;
  console.log(answers);
  for (const answer of answers) {
    total += (answer as any).votes;
  }
  return total;
}

export default createStore<State>({
  state: {
    user: null,
    accessToken: "",
    refreshToken: "",
    questions: [],
    ws: null,
  },
  getters: {},
  mutations: {
    ADD_USER: (state, user: User) => {
      HTTP.post("/users", {
        username: user.login,
        password: user.password,
      }).then((response: any) => console.log(response));
    },
    SET_USER_INFO: (state, userInfo) => {
      state.user = userInfo.user;
      state.accessToken = userInfo.accessToken;
      state.refreshToken = userInfo.refreshToken;
    },
    DELETE_USER: (state, username) => {
      HTTP.delete(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      }).then((response: any) => console.log(response));
    },
    SET_QUESTIONS: (state, questions) => {
      state.questions = questions;
    },
    LOGOUT: (state) => {
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      console.log("Logged out");
    },
  },
  actions: {
    ADD_USER: (context, user: User) => {
      context.commit("ADD_USER", user);
    },
    DELETE_USER: (context, userId) => {
      context.commit("DELETE_USER", userId);
    },
    ADD_QUESTION: async (context, question: QuestionObject) => {
      try {
        await HTTP.post(`/questions`, question, {
          headers: {
            Authorization: `Bearer ${context.state.accessToken}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    DELETE_QUESTION: async (context, questionId) => {
      try {
        await HTTP.delete(`/questions/${questionId}`, {
          headers: {
            Authorization: `Bearer ${context.state.accessToken}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    LOGIN: async (context, loginData) => {
      try {
        const responseWithToken = await HTTP.post("/token", {
          username: loginData.login,
          password: loginData.password,
        });
        const responseWithUser = await HTTP.get(`/users/${loginData.login}`, {
          headers: {
            Authorization: `Bearer ${responseWithToken.data.access}`,
          },
        });
        const user = new User({
          id: responseWithUser.data.id,
          login: responseWithUser.data.username,
          password: loginData.password,
          birthdate: "",
        });
        context.commit("SET_USER_INFO", {
          user: user,
          accessToken: responseWithToken.data.access,
          refreshToken: responseWithToken.data.refresh,
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    LOGOUT: (context) => {
      context.commit("LOGOUT");
    },
    LOAD_QUESTIONS: async (context) => {
      try {
        const questions_resp = await HTTP.get("/questions");
        console.log(questions_resp.data);
        const questionsData: Array<any> = questions_resp.data;
        const questions = [];
        for (const questionData of questionsData) {
          const totalAnswers = getTotalAnswers(questionData.answers);
          const question = new Question({
            id: questionData.id,
            authorLogin: questionData.author_username,
            createdDate: questionData.pub_date,
            questionText: questionData.question_text,
            totalAnswerers: totalAnswers,
          });
          questions.push(question);
        }
        context.commit("SET_QUESTIONS", questions);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {},
});
