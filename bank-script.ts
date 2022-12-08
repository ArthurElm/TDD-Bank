export let Bank = class Bank {
    private users: any;
    constructor(users) {
        this.users = users;
    }

    checkBalance(cardNumber, cardCode){
        let currentUser = null
        this.users.forEach(user => {
            if(user.cardNumber === cardNumber && user.cardCode === cardCode){
                currentUser = user
            }
        })

        if(currentUser !== null){
            return currentUser
        }else{
            return null
        }
    }

};
