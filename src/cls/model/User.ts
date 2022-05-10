export default class User {
  login: string;
  password: string;
  birthdate: string;

  constructor(userObj: User) {
    this.login = userObj.login;
    this.password = userObj.password;
    this.birthdate = userObj.birthdate;
  }
}
