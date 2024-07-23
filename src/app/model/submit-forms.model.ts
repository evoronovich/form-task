export interface SubmitFormsResponse {
  result: string;
}
export interface SubmitFormsRequest {
  forms: User[];
}
export interface User {
  country: string;
  username: string;
  birthday: Date;
}
