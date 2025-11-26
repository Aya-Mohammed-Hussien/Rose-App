export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  phone: string;
  photo: string;
  role: 'user' | 'admin';
};

export type GetUserResponse = {
  message: string;
  user: User;
};
