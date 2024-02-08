export class Student {
  constructor(
    public id: number,
    public user_id: number,
    public parent_name: string,
    public name: string,
    public age: number,
    public allergies: string,
    public year_level: string,
    public class_name: string,
    public reservation_date?: string,
    public reservation_food?: string,
  ) { }
}
