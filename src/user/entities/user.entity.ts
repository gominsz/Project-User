export class User {
  id?: string;
  email: string;
  password: string;
  name: string;

  constructor(user?: Partial<User>) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
  }
}
