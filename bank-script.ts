import { OperationType, UserType } from "./interfaces";

export let Bank = class Bank {
    private users: UserType[];
    private operations: OperationType[];
    constructor(users, operations) {
        this.users = users;
        this.operations = operations;
    }

    lookBalance(cardNumber, cardCode) {
        try {
            let user = this.checkUser(cardNumber, cardCode);
            return user.balance;
        } catch (err) {
            return err;
        }
    }

    addBalance(cardNumber, cardCode, money) {
        try {
            let user = this.checkUser(cardNumber, cardCode);

            this.addOperation({
                id: this.operations.length + 1,
                receiver: user,
                type: "add",
                amount: money,
            });

            if(money >= 0){
                return user.balance + money;
            }
            return user.balance

        } catch (err) {
            return err;
        }
    }

    withDrawMoney(cardNumber, cardCode, loan) {
        try {
            let user = this.checkUser(cardNumber, cardCode);
            if (loan < user.balance) {
                return user.balance - loan;
            }
            this.addOperation({
                id: this.operations.length + 1,
                sender: user,
                type: "withDrawMoney",
                amount: loan,
            });
            return user.balance;
        } catch (err) {
            return err;
        }
    }

    checkDevise(cardNumber, cardCode, devise){
        try {
            let user = this.checkUser(cardNumber, cardCode)
            if(devise === 'euros'){
                return user.balance
            }else if(devise === 'dollars'){
                return user.balance * 1.0559
            }else if(devise === 'yen'){
                return user.balance * 143
            }
        }
        catch(err) {
            return err
        }
    }

    addUser(user) {
        try {
            if (!this.checkAlreadyExist(user.cardNumber)) {
                this.users.push(user);
                return true;
            }
        } catch (err) {
            return err;
        }
    }

    updateUser(user) {
        try {
            let thisUser = this.checkUser(user.cardNumber, user.cardCode);
            this.users[this.users.indexOf(thisUser)] = user;
            return true;
        } catch (err) {
            return err;
        }
    }

    deleteUser(user) {
        try {
            let thisUser = this.checkUser(user.cardNumber, user.cardCode);
            this.users.filter((u) => u.cardNumber !== thisUser.cardNumber);
            return true;
        } catch (err) {
            return err;
        }
    }

    loanMoney(cardNumber, cardCode, loan){
        try {
            let user = this.checkUser(cardNumber, cardCode)
            let maxLoan = user.balance * 10

            this.addOperation({
                id: this.operations.length + 1,
                sender: user,
                type: "loan",
                amount: loan,
            });

            if(loan <= maxLoan && loan >= 0){
                return user.balance + loan
            }
            return user.balance
        }
        catch(err) {
            return err
        }
    }

    addOperation(operation: OperationType) {
        try {
            operation.sender &&
            this.checkUser(operation.sender.cardNumber, operation.sender.cardCode);

            operation.receiver &&
            this.checkUser(
                operation.receiver.cardNumber,
                operation.receiver.cardCode
            );

            this.operations.push(operation);
            return true;
        } catch (err) {
            return err;
        }
    }

    getOperations() {
        return this.operations.length > 0 ? this.operations : "No operations found";
    }

    flushOperations() {
        this.operations = [];
        return "Operations flushed";
    }

    transferMoney(donor, beneficiary, amount){
        try {
            this.checkUser(donor.cardNumber, donor.cardCode)
            this.checkUser(beneficiary.cardNumber, beneficiary.cardCode)

            this.addOperation({
                id: this.operations.length + 1,
                receiver: beneficiary,
                sender: donor,
                type: "transfer",
                amount: amount,
            });

            if(amount < donor.balance){
                donor.balance = donor.balance - amount
                return beneficiary.balance = beneficiary.balance + amount
            }

            return beneficiary.balance

        }
        catch(err) {
            return err
        }
    }

    private checkUser(cardNumber, cardCode) {
        let currentUser = null;
        this.users.forEach((user) => {
            if (user.cardNumber === cardNumber && user.cardCode === cardCode) {
                currentUser = user;
            }
        });
        if (currentUser !== null) {
            return currentUser;
        } else {
            throw "Invalid user";
        }
    }

    // addBeneficiary(user, beneficiary) {
    //     try {
    //         let userToAddBeneficiary = this.checkUser(user.cardNumber, user.cardCode)
    //         let beneficiaryForUser = this.checkUser(beneficiary.cardNumber, beneficiary.cardCode)
    //
    //         let userBeneficiaries = userToAddBeneficiary.beneficiaries
    //
    //         if(userBeneficiaries !== undefined){
    //             if (userBeneficiaries.includes(userToAddBeneficiary)) {
    //                 throw 'Beneficiary already exists in the array.';
    //             }
    //         }
    //
    //         return true
    //     } catch (err) {
    //         return err;
    //     }
    // }

    private checkAlreadyExist(cardNumber) {
        const exists = this.users.some((user) => user.cardNumber === cardNumber);
        if (exists) {
            throw "User already exists";
        }

        return exists;
    }
};
