import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import AccountPage from "../views/AccountPage.vue";
import AboutPage from "../views/AboutPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import QuestionPage from "@/views/QuestionPage.vue";
import UsersPage from "@/views/UsersPage.vue";
import HomePage from "@/views/HomePage.vue";
import CreateQuestionPage from "@/views/CreateQuestionPage.vue";
import OnlineUsersPage from "@/views/OnlineUsersPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/account",
    name: "account",
    component: AccountPage,
  },
  {
    path: "/users",
    name: "users",
    component: UsersPage,
  },
  {
    path: "/home",
    name: "Home Page",
    component: HomePage,
  },
  {
    path: "/create-question",
    name: "Create Question Page",
    component: CreateQuestionPage,
  },
  {
    path: "/questions/:questionId",
    name: "Question",
    component: QuestionPage,
  },
  {
    path: "/login",
    name: "login page",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/online-users",
    name: "online-users",
    component: OnlineUsersPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
