export let User = class User {
    private cardNumber: string;
    private cardCode: string;
    private balance: string;
    private name: string;
    private collaborators: any;

    constructor(cardNumber, cardCode, balance, name, collaborators) {
        this.cardNumber = cardNumber;
        this.cardCode = cardCode;
        this.balance = balance;
        this.name = name;
        this.collaborators = collaborators ;
    }
};
