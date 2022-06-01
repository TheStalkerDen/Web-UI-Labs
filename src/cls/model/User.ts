export default class User {
  id: number;
  login: string;
  password: string;
  birthdate = "";

  constructor(userObj: User) {
    this.id = userObj.id;
    this.login = userObj.login;
    this.password = userObj.password;
    if (userObj.birthdate != null) {
      this.birthdate = userObj.birthdate;
    }
  }
}
