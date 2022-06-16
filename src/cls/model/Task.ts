export interface TaskObject {
  name: string;
  data: string;
  result: string;
  endDate: string;
}

export default class Task {
  name: string;
  data: string;
  result: string;
  endDate: string;

  constructor(obj: TaskObject) {
    this.name = obj.name;
    this.data = obj.data;
    this.result = obj.result;
    this.endDate = obj.endDate;
  }
}
