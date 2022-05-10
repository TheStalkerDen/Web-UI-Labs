import User from "./User";

export default class Users {
  userList: User[] = [];

  _getUserIndex(login: string): number {
    return this.userList.findIndex((user) => user.login === login);
  }

  addUser(user: User) {
    this.userList.push(user);
  }

  deleteUser(login: string) {
    this.userList.splice(this._getUserIndex(login), 1);
  }

  getUser(userId: string): User {
    const index: number = this._getUserIndex(userId);
    return this.userList[index];
  }

  findByLogin(login: string): User | undefined {
    return this.userList.find((user) => user.login === login);
  }
}
