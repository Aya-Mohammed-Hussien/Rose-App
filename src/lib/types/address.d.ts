export type Address = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
};

export type ShippingPayload = {
  shippingAddress: {
    street: string;
    phone: string;
    city: string;
    lat: string;
    long: string;
  };
};

export type getAddressesResponse = {
  message: string;
  addresses: Address[];
};
