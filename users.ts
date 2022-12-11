export let User = class User {
  private cardNumber: string;
  private cardCode: string;
  private balance: string;
  private name: string;
  private beneficiaries: any;

  constructor(cardNumber, cardCode, balance, name, beneficiaries?) {
    this.cardNumber = cardNumber;
    this.cardCode = cardCode;
    this.balance = balance;
    this.name = name;
    this.beneficiaries = beneficiaries;
  }
};
