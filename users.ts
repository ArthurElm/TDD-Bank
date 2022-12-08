export let User = class User {
    private cardNumber: string;
    private cardCode: string;
    private balance: string;
    private name: string;

    constructor(cardNumber, cardCode, balance, name) {
        this.cardNumber = cardNumber;
        this.cardCode = cardCode;
        this.balance = balance;
        this.name = name;
    }
};
