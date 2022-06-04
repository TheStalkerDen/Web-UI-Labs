import { mount } from "@vue/test-utils";
import AboutPage from "../../src/views/AboutPage.vue";

describe("Testing AboutPage.vue component", () => {
  const wrapper = mount(AboutPage);
  it("checks textContent to contain 'created by Yermolenko Denys'", () => {
    expect(wrapper.element.textContent).toContain(
      "created by Yermolenko Denys"
    );
  });
  it('checks component to contain one app logo image with alt = "logo-image"', () => {
    const images = wrapper.findAll("img");
    expect(images.length).toBe(1);
    const image = images[0];
    expect(image.element.alt).toBe("logo-image");
  });
});
