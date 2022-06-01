import { createStore } from "vuex";
import Users from "@/cls/model/Users";
import Questions from "@/cls/model/Questions";
import User from "@/cls/model/User";
import { QuestionObject } from "@/cls/model/Question";
import { HTTP } from "../http";

export interface State {
  user: User | null;
  accessToken: string;
  refreshToken: string;
}

export default createStore<State>({
  state: {
    user: null,
    accessToken: "",
    refreshToken: "",
  },
  getters: {},
  mutations: {
    ADD_USER: (state, user: User) => {
      HTTP.post("/users", {
        username: user.login,
        password: user.password,
      }).then((response) => console.log(response));
    },
    DELETE_USER: (state, username) => {
      HTTP.delete(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      }).then((response) => console.log(response));
    },
    ADD_QUESTION: (state, question) => {
      HTTP.post(`/questions`, question, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      }).then((response) => console.log(response));
    },
    DELETE_QUESTION: (state, questionId) => {
      HTTP.delete(`/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      }).then((response) => console.log(response));
    },
    LOGIN: async (state, loginData) => {
      const res = await HTTP.post("/token", {
        username: loginData.login,
        password: loginData.password,
      })
        .then(async (response: any) => {
          state.accessToken = response.data.access;
          state.refreshToken = response.data.refresh;
          console.log(response);
          await HTTP.get(`/users/${loginData.login}`, {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }).then((response) => {
            state.user = new User({
              id: response.data.id,
              login: response.data.username,
              password: loginData.password,
              birthdate: "",
            });
          });
          console.log("LOGINED");
        })
        .catch((error) => console.log(error));
      console.log("ALL IS OK");
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
    ADD_QUESTION: (context, question: QuestionObject) => {
      context.commit("ADD_QUESTION", question);
    },
    DELETE_QUESTION: (context, questionId) => {
      context.commit("DELETE_QUESTION", questionId);
    },
    LOGIN: (context, user) => {
      context.commit("LOGIN", user);
    },
    LOGOUT: (context) => {
      context.commit("LOGOUT");
    },
  },
  modules: {},
});
