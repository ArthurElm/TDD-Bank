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

      return user.balance + money;
    } catch (err) {
      return err;
    }
  }

  takeLoan(cardNumber, cardCode, loan) {
    try {
      let user = this.checkUser(cardNumber, cardCode);
      if (loan < user.balance) {
        return user.balance - loan;
      }
      this.addOperation({
        id: this.operations.length + 1,
        sender: user,
        type: "loan",
        amount: loan,
      });
      return user.balance;
    } catch (err) {
      return err;
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

  private checkAlreadyExist(cardNumber) {
    const exists = this.users.some((user) => user.cardNumber === cardNumber);

    if (exists) {
      throw "User already exists";
    }

    return exists;
  }
};
