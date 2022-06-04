import { mount } from "@vue/test-utils";
import UsersTable from "@/components/UsersTable.vue";
import User from "@/cls/model/User";

describe("Testing UsersTable component", () => {
  it("checks users data displaying", () => {
    const wrapper = mount(UsersTable, {
      props: {
        users: [
          new User({
            login: "Admin",
            password: "somePass",
            birthdate: "1999-09-09",
          }),
        ],
      },
    });

    expect(wrapper.element.textContent).toContain("Admin");
    expect(wrapper.element.textContent).toContain("somePass");
    expect(wrapper.element.textContent).toContain("1999-09-09");
  });
});
