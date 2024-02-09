export class Reservation {
  constructor(
    public id: number,
    public user_id: number,
    public user_name: string,
    public student_id: number,
    public student_name: string,
    public menu_id: number,
    public menu_name: string,
    public quantity: number,
    public date: string,
    public amount_paid: number,
    public description: string,
    public status: number,
    public created_at: string,
    public updated_at: string
    ) { }
}
