import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import HomePage from "@/views/HomePage.vue";
import User from "@/cls/model/User";

describe("Testing HomePage.vue component", () => {
  it("checks attempt to click creatQuestion button when current user is authorized", async () => {
    const $store = {
      state: {
        currentUser: new User({
          login: "someUser",
          password: "somePass",
          birthdate: "1999-09-09",
        }),
        questions: {
          questionList: [],
        },
      },
    };
    const wrapper = shallowMount(HomePage, {
      global: {
        mocks: {
          $store,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    await wrapper.find("#create-question-btn").trigger("click");
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe(
      "/create-question"
    );
  });
});
