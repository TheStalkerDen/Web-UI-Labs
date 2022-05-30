import App from "./../src/App.vue";
import { mount } from "@vue/test-utils";

describe("App", () => {
  it("logout method testing", () => {
    const $store = {
      currentUser: jest.fn((_) => {
        return {
          login: "test",
          password: "somePasword",
          birthdate: new Date(),
        };
      }),
      commit: jest.fn(),
    };
    const $router = {
      push: jest.fn(),
    };
    const wrapper = mount(App, {
      global: {
        mocks: {
          $store,
          $router,
        },
      },
    });
    wrapper.vm.logout();
    expect($router.push).toBeCalledWith("/logout");
  });
});
