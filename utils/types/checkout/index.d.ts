export interface CheckoutProps {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  postcode: string;
}

export interface CheckoutPropsError {
  firstName: boolean;
  lastName: boolean;
  address: boolean;
  phone: boolean;
  email: boolean;
  city: boolean;
  postcode: boolean;
}
