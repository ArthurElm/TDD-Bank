export interface UserType {
  cardNumber: string;
  cardCode: string;
  balance: string;
  name: string;
}

export interface OperationType {
  id: number;
  sender?: UserType;
  receiver?: UserType;
  type: string;
  amount: number;
}
