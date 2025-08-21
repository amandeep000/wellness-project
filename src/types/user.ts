type CurrentUser = {
  fullname: string;
  email: string;
  password: string;
  address: string;
};
export interface User {
  fullname?: string;
  email: string;
  password: string;
  role?: "string";
  currentUser?: CurrentUser;
}
