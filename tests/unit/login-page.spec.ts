import { mount } from "@vue/test-utils";
import LoginPage from "@/views/LoginPage.vue";
import User from "@/cls/model/User";

describe("Testing LoginPage component", () => {
  let wrapper: any;
  let $store: any;
  let $router: any;
  beforeEach(() => {
    $router = {
      push: jest.fn(),
    };
    $store = {
      state: {
        currentUser: null,
      },
      commit: jest.fn((action, parms) => {
        $store.state.currentUser = new User({
          login: "someLogin",
          password: "somePassword",
          birthdate: "",
        });
      }),
    };

    wrapper = mount(LoginPage, {
      global: {
        mocks: {
          $router,
          $store,
        },
      },
    });
  });
  it("checks login attempt with empty username and password", () => {
    expect(wrapper.find('input[name="login"]').text()).toBe("");
    expect(wrapper.find('input[name="password"]').text()).toBe("");
    expect(wrapper.find("button").element.disabled).toBe(true);
  });
  it("checks login attempt with filled username and password", async () => {
    await wrapper.find("input[name='login']").setValue("someLogin");
    await wrapper.find("input[name='password']").setValue("somePassword");
    await wrapper.find("button").trigger("click");
    expect($router.push).toBeCalledWith("/account");
    expect($store.commit).toBeCalledWith("LOGIN", {
      login: "someLogin",
      password: "somePassword",
    });
  });
});
