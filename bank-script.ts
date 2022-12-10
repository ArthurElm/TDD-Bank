export let Bank = class Bank {
    private users: any;
    constructor(users) {
        this.users = users;
    }

    lookBalance(cardNumber, cardCode){
        try {
            let user =  this.checkUser(cardNumber, cardCode)
            return user.balance
        }
        catch(err) {
            return err
        }
    }

    addBalance(cardNumber, cardCode, money){
        try {
            let user = this.checkUser(cardNumber, cardCode)
            return user.balance + money
        }
        catch(err) {
            return err
        }
    }

    takeLoan(cardNumber, cardCode, loan){
        try {
            let user = this.checkUser(cardNumber, cardCode)
            if(loan < user.balance){
                return user.balance - loan
            }
            return user.balance
        }
        catch(err) {
            return err
        }
    }

    private checkUser(cardNumber, cardCode){
        let currentUser = null
        this.users.forEach(user => {
            if(user.cardNumber === cardNumber && user.cardCode === cardCode){
                currentUser = user
            }
        })
        if(currentUser !== null){
            return currentUser
        }else{
            throw "Invalid user"
        }
    }

};
