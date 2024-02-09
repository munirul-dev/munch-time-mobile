export class Settlement {
  constructor(
    public id: number,
    public user_id: number,
    public user_name: string,
    public amount: number,
    public status: number,
    public created_at: string,
    public updated_at: string
    ) { }
}
