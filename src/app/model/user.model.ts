export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public status: boolean,
    public roles: string,
    public token: string,
  ) { }
}
