import { mount, RouterLinkStub } from "@vue/test-utils";
import QuestionList from "@/components/QuestionList.vue";
import Question from "@/cls/model/Question";

describe("Testing QuestionList.vue component", () => {
  it("checks questions clickable", async () => {
    const wrapper = mount(QuestionList, {
      props: {
        questions: [
          new Question({
            authorLogin: "admin",
            totalAnswerers: 0,
            questionText: "Question 1",
            id: "1",
            createdDate: "2020-10-09",
          }),
        ],
      },
      global: {
        stubs: { RouterLink: RouterLinkStub },
      },
    });

    await wrapper.find("#question-card-1").trigger("click");
    expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
      path: "/questions/1",
    });
  });
});
