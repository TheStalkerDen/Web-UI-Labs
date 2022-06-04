import { shallowMount } from "@vue/test-utils";
import AccountPage from "@/views/AccountPage.vue";
import User from "@/cls/model/User";

describe("Testing AccountPage component", () => {
  it("checks displaying of some date when user is authorized", () => {
    const $router = {
      push: jest.fn(),
    };
    const $store = {
      state: {
        currentUser: new User({
          login: "someLogin",
          password: "somePass",
          birthdate: "1999-09-09",
        }),
      },
    };
    const wrapper = shallowMount(AccountPage, {
      global: {
        mocks: {
          $router,
          $store,
        },
      },
    });
    expect(wrapper.text()).toContain("1999-09-09");
    expect(wrapper.text()).toContain("someLogin");
  });
});
