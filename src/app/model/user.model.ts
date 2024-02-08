export class User {
  constructor(
    public id: number,
    public name: string,
    public tel: string,
    public profile_img: string,
    public email: string,
    public status: boolean,
    public roles: "admin" | "canteen-worker" | "parent",
    public token: string,
  ) { }
}
