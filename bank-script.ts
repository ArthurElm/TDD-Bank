export let Bank = class Bank {
  private users: any;
  constructor(users) {
    this.users = users;
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

  deleteUser(user) {
    try {
      let thisUser = this.checkUser(user.cardNumber, user.cardCode);
      this.users.splice(this.users.indexOf(thisUser), 1);
      return true;
    } catch (err) {
      return err;
    }
  }

  // updateUser(user) {
  //   try {
  //     let thisUser = this.checkUser(user.cardNumber, user.cardCode);
  //     thisUser.balance = user.balance;
  //     thisUser.name = user.name;
  //   } catch (err) {
  //     return err;
  //   }
  // }

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
