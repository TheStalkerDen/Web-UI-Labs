import { mount } from "@vue/test-utils";
import RegisterPage from "@/views/RegisterPage.vue";

describe("Testing RegisterPage component", () => {
  let wrapper: any;
  let $store: any;
  let $router: any;
  beforeEach(() => {
    $router = {
      push: jest.fn(),
    };
    $store = {
      state: {
        users: {
          findByLogin(login: string) {
            if (login == "existedUser") return true;
            return null;
          },
        },
      },
      dispatch: jest.fn(),
    };

    wrapper = mount(RegisterPage, {
      global: {
        mocks: {
          $router,
          $store,
        },
      },
    });
  });

  it("checks register attempt with empty inputs", async () => {
    expect(wrapper.find("input[name=login]").text()).toBe("");
    expect(wrapper.find("input[name=password]").text()).toBe("");
    expect(wrapper.find("input[name=date]").text()).toBe("");
    expect(wrapper.find("button").element.disabled).toBe(true);
  });

  it("checks register attempt with filled inputs", async () => {
    const login = "SomeName";
    const password = "SomePass";
    const date = "2022-10-11";
    await wrapper.find("input[name=login]").setValue(login);
    await wrapper.find("input[name=password]").setValue(password);
    await wrapper.find("input[name=date]").setValue(date);
    await wrapper.find("button").trigger("click");
    expect($router.push).toBeCalledWith("/login");
    expect($store.dispatch).toBeCalledWith("ADD_USER", {
      login: login,
      password: password,
      birthdate: date,
    });
  });

  it("checks register attempt with login that exists in the app", async () => {
    const login = "existedUser";
    const password = "SomePass";
    const date = "2022-10-11";
    await wrapper.find("input[name=login]").setValue(login);
    await wrapper.find("input[name=password]").setValue(password);
    await wrapper.find("input[name=date]").setValue(date);
    expect(wrapper.find("button").element.disabled).toBe(true);
  });
});
