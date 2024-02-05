export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public status: boolean,
    public roles: "admin" | "canteen-worker" | "parent",
    public token: string,
  ) { }
}
