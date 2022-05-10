import { createStore } from "vuex";
import Users from "@/cls/model/Users";
import Questions from "@/cls/model/Questions";
import User from "@/cls/model/User";
import { QuestionObject } from "@/cls/model/Question";

export default createStore({
  state: {
    users: new Users(),
    questions: new Questions(),
    currentUser: null,
  },
  getters: {},
  mutations: {
    ADD_USER: (state, user) => {
      state.users.addUser(user);
    },
    DELETE_USER: (state, userId) => {
      state.users.deleteUser(userId);
    },
    ADD_QUESTION: (state, question) => {
      state.questions.addQuestion(question);
    },
    DELETE_QUESTION: (state, questionId) => {
      state.questions.deleteQuestion(questionId);
    },
    LOGIN: (state, loginData) => {
      const user = state.users.findByLogin(loginData.login);
      if (!user) {
        console.log(
          `User with username '${loginData.login}' is not registered`
        );
        return;
      }
      if (user.password === loginData.password) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.currentUser = user;
      } else {
        console.log(
          `Password for username '${loginData.login}' doesn't match!`
        );
      }
    },
    LOGOUT: (state) => {
      state.currentUser = null;
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
