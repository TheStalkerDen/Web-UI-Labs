import { DOMWrapper, mount } from "@vue/test-utils";
import QuestionPage from "@/views/QuestionPage.vue";
import User from "@/cls/model/User";
import Question from "@/cls/model/Question";
import Answer from "@/cls/model/Answer";

describe("Testing QuestionPage component", () => {
  it("checks voting attempt", async () => {
    const $route = {
      params: {
        questionId: "1",
      },
    };

    const $store = {
      state: {
        currentUser: new User({
          login: "someLogin",
          password: "somePass",
          birthdate: "1999-09-09",
        }),
        questions: {
          getQuestion: jest.fn((_) => {
            return new Question({
              authorLogin: "admin",
              questionText: "questionText",
              answers: [
                new Answer({
                  answerText: "answer1",
                  id: "1",
                }),
                new Answer({
                  answerText: "answer2",
                  id: "2",
                }),
              ],
            });
          }),
        },
      },
    };

    const wrapper = mount(QuestionPage, {
      global: {
        mocks: {
          $store,
          $route,
        },
      },
    });

    await wrapper.find("#vote-answer-1").setValue();
    expect(wrapper.vm.$data.pickedAnswerId).toBe("1");
    const button = wrapper.find(
      "#vote-button"
    ) as DOMWrapper<HTMLButtonElement>;
    await button.trigger("click");
    expect(wrapper.vm.$data.votedAnswerId).toBe("1");
  });
  it("checks polling deletion", async () => {
    const $route = {
      params: {
        questionId: "1",
      },
    };

    const $router = {
      push: jest.fn(),
    };

    const $store = {
      commit: jest.fn(),
      state: {
        currentUser: new User({
          login: "admin",
          password: "somePass",
          birthdate: "1999-09-09",
        }),
        questions: {
          getQuestion: jest.fn((_) => {
            return new Question({
              id: "1",
              authorLogin: "admin",
              questionText: "questionText",
              answers: [
                new Answer({
                  answerText: "answer1",
                  id: "1",
                }),
                new Answer({
                  answerText: "answer2",
                  id: "2",
                }),
              ],
            });
          }),
        },
      },
    };

    const wrapper = mount(QuestionPage, {
      global: {
        mocks: {
          $store,
          $route,
          $router,
        },
      },
    });
    window.confirm = jest.fn(() => true);

    const button = wrapper.find(
      "#deletePolling"
    ) as DOMWrapper<HTMLButtonElement>;
    await button.trigger("click");
    expect($store.commit).toBeCalledWith("DELETE_QUESTION", "1");
    expect($router.push).toBeCalledWith("/home");
  });
  it("checks canDeletePolling when user is unauthorized", () => {
    const $route = {
      params: {
        questionId: "1",
      },
    };

    const $store = {
      state: {
        currentUser: null,
        questions: {
          getQuestion: jest.fn((_) => {
            return new Question({
              authorLogin: "admin",
              questionText: "questionText",
              answers: [
                new Answer({
                  answerText: "answer1",
                  id: "1",
                }),
                new Answer({
                  answerText: "answer2",
                  id: "2",
                }),
              ],
            });
          }),
        },
      },
    };

    const wrapper = mount(QuestionPage, {
      global: {
        mocks: {
          $store,
          $route,
        },
      },
    });
    expect(wrapper.vm.canDeletePolling).toBe(false);
  });
});
