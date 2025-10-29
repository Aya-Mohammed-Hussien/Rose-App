export interface Address {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
}

export interface AddressesResponse {
  message: string;
  addresses: Address[];
}
