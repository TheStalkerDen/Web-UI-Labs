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
  },
  modules: {},
});
