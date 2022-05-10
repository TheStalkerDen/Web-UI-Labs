import { v4 } from "uuid";

export interface AnswerObj {
  answerText: string;
  id?: string;
  answerers?: string[];
}

export default class Answer {
  id: string = v4();
  answerText: string;
  answerers: string[] = [];

  constructor(obj: AnswerObj) {
    this.answerText = obj.answerText;
    if (obj.id != null) {
      this.id = obj.id;
    }
    if (obj.answerers != null) {
      this.answerers = obj.answerers;
    }
  }
}
