import Question, { QuestionObject } from "@/cls/model/Question";

export default class Questions {
  questionList: Question[] = [];

  _getQuestionIndex(questionId: string): number {
    return this.questionList.findIndex((answer) => answer.id === questionId);
  }

  addQuestion(questionObj: QuestionObject) {
    this.questionList.push(new Question(questionObj));
  }

  getQuestion(questionId: string) {
    return this.questionList[this._getQuestionIndex(questionId)];
  }

  deleteQuestion(questionId: string) {
    this.questionList.splice(this._getQuestionIndex(questionId), 1);
  }
}
