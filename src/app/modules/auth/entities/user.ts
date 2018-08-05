export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public login: string;
  public password: string;

  public constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.login = user.login;
    this.password = user.password;
  }
}
