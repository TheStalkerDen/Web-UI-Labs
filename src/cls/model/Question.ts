import { v4 } from "uuid";
import Answer from "@/cls/model/Answer";

export interface QuestionObject {
  authorLogin: string;
  id?: string;
  createdDate?: string;
  questionText?: string;
  answers?: Answer[];
  totalAnswerers?: number;
}

export default class Question {
  id: string = v4();
  authorLogin: string;
  createdDate: Date;
  private _questionText = "";
  answers: Answer[] = [];
  totalAnswerers = 0;

  _getAnswerIndex(answerId: string): number {
    return this.answers.findIndex((answer) => answer.id === answerId);
  }

  constructor(obj: QuestionObject) {
    this.authorLogin = obj.authorLogin;
    if (obj.id != null) {
      this.id = obj.id;
    }
    if (obj.questionText != null) {
      this._questionText = obj.questionText;
    }
    if (obj.answers != null) {
      this.answers = obj.answers;
    }
    if (obj.createdDate != null) {
      this.createdDate = new Date(obj.createdDate);
    } else {
      this.createdDate = new Date();
    }
    if (obj.totalAnswerers != null) {
      this.totalAnswerers = obj.totalAnswerers;
    }
  }

  set questionText(value: string) {
    this._questionText = value;
  }

  get questionText(): string {
    return this._questionText;
  }

  addVoteToAnswer(answerId: string, answererLogin: string): void {
    const answer = this.answers[this._getAnswerIndex(answerId)];
    answer.answerers.push(answererLogin);
    this.totalAnswerers++;
  }

  isAlreadyVote(userLogin: string) {
    return this.answers.some(
      (answer) =>
        answer.answerers.findIndex((answerer) => answerer === userLogin) != -1
    );
  }

  findVotedAnswerId(userLogin: string): string {
    for (const answer of this.answers) {
      const index = answer.answerers.findIndex(
        (answerer) => answerer === userLogin
      );
      if (index != -1) {
        return answer.id;
      }
    }
    return "";
  }
}
