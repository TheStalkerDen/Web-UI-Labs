import { createStore } from "vuex";
import User from "@/cls/model/User";
import Question, { QuestionObject } from "@/cls/model/Question";
import { HTTP } from "@/http";
import { getAnswers, getTotalAnswers } from "@/store/utils";

export interface State {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  questions: Question[];
  currentQuestion: Question | null;
  ws: WebSocket | null;
  onlineUsers: string[];
}

export default createStore<State>({
  state: {
    user: null,
    accessToken: "",
    refreshToken: "",
    questions: [],
    currentQuestion: null,
    ws: null,
    onlineUsers: [],
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
    SET_CURRENT_QUESTION: (state, question) => {
      state.currentQuestion = question;
    },
    INCR_VOTES_IN_CURRENT_QUESTION_ANSWER: (state, answerId) => {
      if (state.currentQuestion != null) {
        state.currentQuestion.answers[
          state.currentQuestion.getAnswerIndex(answerId)
        ].votes++;
      }
    },
    INCR_TOTAL_VOTES_FOR_QUESTION_IN_LIST: (state, questionId) => {
      const index = state.questions.findIndex(
        (answer) => answer.id === questionId
      );
      if (index != -1) {
        state.questions[index].totalAnswerers++;
      }
    },
    REMOVE_QUESTION_FROM_LIST: (state, questionId) => {
      const index = state.questions.findIndex(
        (answer) => answer.id === questionId
      );
      if (index != -1) {
        state.questions.splice(index, 1);
      }
    },
    LOGOUT: (state) => {
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      console.log("Logged out");
    },
    SET_ONLINE_USERS: (state, onlineUsers) => {
      state.onlineUsers = onlineUsers.slice();
    },
    ADD_TO_ONLINE_USERS: (state, newUser) => {
      state.onlineUsers.push(newUser);
    },
    REMOVE_FROM_ONLINE_USERS: (state, user) => {
      const index = state.onlineUsers.findIndex((u) => u === user);
      state.onlineUsers.splice(index, 1);
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
    LOAD_QUESTION: async (context, questionId) => {
      try {
        const response = await HTTP.get(`questions/${questionId}`);
        const question = new Question({
          id: response.data.id,
          authorLogin: response.data.author,
          questionText: response.data.question_text,
          answers: getAnswers(response.data.answers),
        });
        context.commit("SET_CURRENT_QUESTION", question);
      } catch (error) {
        console.log(error);
      }
    },
    INCR_VOTES_IN_CURRENT_QUESTION_ANSWER: (context, answerId) => {
      context.commit("INCR_VOTES_IN_CURRENT_QUESTION_ANSWER", answerId);
    },
    REMOVE_QUESTION_FROM_LIST: (context, questionID) => {
      context.commit("REMOVE_QUESTION_FROM_LIST", questionID);
    },
    INCR_TOTAL_VOTES_FOR_QUESTION_IN_LIST: (context, questionId) => {
      context.commit("INCR_TOTAL_VOTES_FOR_QUESTION_IN_LIST", questionId);
    },
    SET_ONLINE_USERS: (context, onlineUsers) => {
      context.commit("SET_ONLINE_USERS", onlineUsers);
    },
    ADD_TO_ONLINE_USERS: (context, newUser) => {
      context.commit("ADD_TO_ONLINE_USERS", newUser);
    },
    REMOVE_FROM_ONLINE_USERS: (context, user) => {
      context.commit("REMOVE_FROM_ONLINE_USERS", user);
    },
  },

  modules: {},
});
