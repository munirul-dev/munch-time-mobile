export class Payment {
  constructor(
    public id: number,
    public user_id: number,
    public reservation_id: number,
    public transaction_id: string,
    public order_id: string,
    public payment_method: string,
    public amount: number,
    public return_data: string,
    public callback_data: string,
    public status: number,
    public status_text: string,
    public created_at: string,
    public updated_at: string,
  ) { }
}
