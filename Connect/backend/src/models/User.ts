export interface User {
  user_id?: number; // Optional because it will be auto-generated
  user_name: string;
  dateofbirth: Date;
  user_type_id: number;
  email: string;
  contact_no: bigint;
  user_password: string;
}
