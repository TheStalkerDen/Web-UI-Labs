import { v4 } from "uuid";

export interface AnswerObj {
  answerText: string;
  id?: string;
  votes?: number;
}

export default class Answer {
  id: string = v4();
  answerText: string;
  votes = 0;

  constructor(obj: AnswerObj) {
    this.answerText = obj.answerText;
    if (obj.id != null) {
      this.id = obj.id;
    }
    if ((obj.votes = undefined)) {
      this.votes = obj.votes;
    }
  }
}
