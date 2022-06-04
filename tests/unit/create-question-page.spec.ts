import { DOMWrapper, mount } from "@vue/test-utils";
import CreateQuestionPage from "@/views/CreateQuestionPage.vue";
import User from "@/cls/model/User";
import Answer from "@/cls/model/Answer";

describe("Testing CreateQuestionPage component", () => {
  let $router: any;
  let $store: any;
  let wrapper: any;
  const user = new User({
    login: "someLogin",
    password: "somePass",
    birthdate: "1999-09-09",
  });
  beforeEach(() => {
    $router = {
      push: jest.fn(),
    };
    $store = {
      state: {
        currentUser: user,
      },
      commit: jest.fn(),
    };
    wrapper = mount(CreateQuestionPage, {
      global: {
        mocks: {
          $store,
          $router,
        },
      },
    });
  });
  it("checks question creating attempt without data in fields", () => {
    expect(wrapper.find('input[name="question-text"]').text()).toBe("");
    expect(wrapper.find('input[name="answer-text"]').text()).toBe("");
    const button = wrapper.find(
      "#startPolling"
    ) as DOMWrapper<HTMLButtonElement>;
    expect(button.element.disabled).toBe(true);
  });
  it("checks answer adding attempt when answer field is empty", async () => {
    expect(wrapper.find('input[name="answer-text"]').text()).toBe("");
    const button = wrapper.find("#addAnswer") as DOMWrapper<HTMLButtonElement>;
    expect(button.element.disabled).toBe(true);
  });
  it("checks answer adding attempt when answer field is filled", async () => {
    await wrapper.find('input[name="answer-text"]').setValue("firstAnswer");
    const button = wrapper.find("#addAnswer") as DOMWrapper<HTMLButtonElement>;
    await button.trigger("click");
    expect(wrapper.vm.$data.answers.length).toBe(1);
    expect(wrapper.vm.$data.currentAnswer).toBe("");
  });
  it("checks answer deleting attempt", async () => {
    await wrapper.setData({
      question: "",
      answers: [
        new Answer({
          id: "1",
          answerText: "firstAnswer",
        }),
      ],
    });
    const button = wrapper.find(
      "#delete-answer-1"
    ) as DOMWrapper<HTMLButtonElement>;
    await button.trigger("click");
    expect(wrapper.vm.$data.answers.length).toBe(0);
  });
  it("checks start polling attempt", async () => {
    await wrapper.setData({
      question: "Question text",
      answers: [
        new Answer({
          id: "1",
          answerText: "firstAnswer",
        }),
        new Answer({
          id: "2",
          answerText: "secondAnswer",
        }),
      ],
    });
    const button = wrapper.find(
      "#startPolling"
    ) as DOMWrapper<HTMLButtonElement>;
    await button.trigger("click");
    expect($store.commit).toBeCalled();
    expect($router.push).toBeCalledWith("/home");
  });
});
