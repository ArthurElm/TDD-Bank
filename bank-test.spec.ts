import { Bank } from "./bank-script";
import { User } from "./users";

describe("Bank", () => {
  let users = [];
  for (let i = 0; i < 5; i++) {
    let cardNumber = "12344876" + i;
    let cardCode = "123" + i;
    let balance = 1200;
    let name = "User" + i;
    let user = new User(cardNumber, cardCode, balance, name);
    users.push(user);
  }

  let operations = [];

  let bank = new Bank(users, operations);
  let bank2 = new Bank([], []);

  describe("Look balance", () => {
    describe("Look balance with correct user", () => {
      it.each([
        [[users[0].cardNumber, users[0].cardCode], users[0].balance],
        [[users[2].cardNumber, users[2].cardCode], users[2].balance],
      ])("Card n°%i balance : %o", (n, expected) => {
        expect(bank.lookBalance(n[0], n[1])).toBe(expected);
      });
    });
    describe("Look balance with invalid user", () => {
      it.each([
        [[users[0].cardNumber + "1", users[0].cardCode], "Invalid user"],
        [[users[0].cardNumber, users[0].cardCode + "1"], "Invalid user"],
        [[users[0].cardNumber + "1", users[0].cardCode + "1"], "Invalid user"],
        [[users[0].cardNumber + "A", users[0].cardCode + "B"], "Invalid user"],
      ])("Invalid card number or card code provided.", (n, expected) => {
        expect(bank.lookBalance(n[0], n[1])).toBe(expected);
      });
    });
  });

  describe("Add balance", () => {
    let countAdded = 0;

    describe("Add balance with valid user", () => {
      describe("Add balance > 0", () => {
        countAdded = 200;
        it(
          "Card n°" +
            users[0].cardNumber +
            " balance : " +
            (users[0].balance + countAdded) +
            " with " +
            countAdded +
            " added",
          () => {
            expect(
              bank.addBalance(
                users[0].cardNumber,
                users[0].cardCode,
                countAdded
              )
            ).toBe(users[0].balance + countAdded);
          }
        );
      });
      describe("Add balance === 0", () => {
        countAdded = 0;
        it.each([
          [[users[0].cardNumber, users[0].cardCode, 0], users[0].balance],
        ])(
          "Card n°%i balance : %o with " + countAdded + " added",
          (n, expected) => {
            expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected);
          }
        );
      });
      describe("Add balance < 0", () => {
        countAdded = -200;
        it.each([
          [[users[0].cardNumber, users[0].cardCode, 0], users[0].balance],
        ])(
          "Card n°%i balance : %o (can't add " +
            countAdded +
            " as a negative value)",
          (n, expected) => {
            expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected);
          }
        );
      });
    });
    describe("Add balance with invalid user", () => {
      it.each([
        [
          [users[0].cardNumber + "1", users[0].cardCode + "1", countAdded],
          "Invalid user",
        ],
      ])("Invalid card number or card code provided.", (n, expected) => {
        expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected);
      });
    });
  });

  describe("Take a loan", () => {
    let loan = 0;

    describe("Take a loan with correct user and loan < balance", () => {
      loan = 200;
      it.each([
        [
          [users[0].cardNumber, users[0].cardCode, loan],
          users[0].balance - loan,
        ],
        [
          [users[2].cardNumber, users[2].cardCode, loan],
          users[2].balance - loan,
        ],
      ])(
        "Card n°%i : You just loan " + loan + " , balance is now : %o",
        (n, expected) => {
          expect(bank.takeLoan(n[0], n[1], n[2])).toBe(expected);
        }
      );
    });
    describe("Take a loan with correct user and loan > balance", () => {
      loan = 2000;
      it.each([
        [[users[0].cardNumber, users[0].cardCode, loan], users[0].balance],
        [[users[2].cardNumber, users[2].cardCode, loan], users[2].balance],
      ])(
        "Can't take a loan for card n°%i balance : " + loan + " > %o",
        (n, expected) => {
          expect(bank.takeLoan(n[0], n[1], n[2])).toBe(expected);
        }
      );
    });
    describe("Take a loan with invalid user", () => {
      it.each([
        [[users[0].cardNumber + "1", users[0].cardCode, loan], "Invalid user"],
        [[users[0].cardNumber, users[0].cardCode + "1", loan], "Invalid user"],
        [
          [users[0].cardNumber + "1", users[0].cardCode + "1", loan],
          "Invalid user",
        ],
        [
          [users[0].cardNumber + "A", users[0].cardCode + "B", loan],
          "Invalid user",
        ],
      ])("Invalid card number or card code provided.", (n, expected) => {
        expect(bank.takeLoan(n[0], n[1], n[2])).toBe(expected);
      });
    });
  });

  describe("Add a user", () => {
    let correctUser = new User("12345678900", "12300", 1200, "User");
    let invalidUser = new User("123448760", "123", 1200, "User");

    describe("Add a user with correct user", () => {
      it.each([[correctUser, true]])("User added", (n, expected) => {
        expect(bank.addUser(n)).toBe(expected);
      });
    });
    describe("Add a user with invalid user", () => {
      it.each([[invalidUser, "User already exists"]])(
        "Invalid user",
        (n, expected) => {
          expect(bank.addUser(n)).toBe(expected);
        }
      );
    });
  });

  describe("Update a user", () => {
    let invalidUser = new User("123456789", "123", 1200, "User");
    let correctUser = new User("123448760", "1230", 1200, "User");

    describe("Update a user with correct user", () => {
      it.each([[correctUser, true]])("User updated", (n, expected) => {
        expect(bank.updateUser(n)).toBe(expected);
      });
    });

    describe("Update a user with invalid user", () => {
      it.each([[invalidUser, "Invalid user"]])(
        "Invalid user",
        (n, expected) => {
          expect(bank.updateUser(n)).toBe(expected);
        }
      );
    });
  });

  describe("Remove a user", () => {
    let invalidUser = new User("123456789", "123", 1200, "User");
    let correctUser = new User("123448760", "1230", 1200, "User");

    describe("Remove a user with correct user", () => {
      it.each([[correctUser, true]])("User removed", (n, expected) => {
        expect(bank.deleteUser(n)).toBe(expected);
      });
    });

    describe("Remove a user with invalid user", () => {
      it.each([[invalidUser, "Invalid user"]])(
        "Invalid user",
        (n, expected) => {
          expect(bank.deleteUser(n)).toBe(expected);
        }
      );
    });
  });

  describe("Add operation", () => {
    let correctOperation = {
      id: 654,
      sender: {
        cardNumber: "123448760",
        cardCode: "1230",
        balance: "1200",
        name: "User",
      },
      amount: 200,
      type: "withdrawal",
    };

    let invalidOperation = {
      id: 655,
      sender: {
        cardNumber: "457574",
        cardCode: "787",
        balance: "1200",
        name: "User",
      },
      amount: 200,
      type: "withdrawal",
    };

    describe("Add operation with correct operation", () => {
      it.each([[correctOperation, true]])("Operation added", (n, expected) => {
        expect(bank.addOperation(n)).toBe(expected);
      });
    });

    describe("Add operation with invalid operation", () => {
      it.each([[invalidOperation, "Invalid user"]])(
        "Invalid operation",
        (n, expected) => {
          expect(bank.addOperation(n)).toBe(expected);
        }
      );
    });
  });

  describe("Flush operations", () => {
    describe("Flush operations", () => {
      it.each([["Operations flushed"]])("No operations found", (expected) => {
        expect(bank.flushOperations()).toBe(expected);
      });
    });
  });

  describe("Get operations", () => {
    describe("Get all operations if there is none", () => {
      it.each([["No operations found"]])("No operations found", (expected) => {
        expect(bank.getOperations()).toBe(expected);
      });
    });

    bank.addOperation({
      id: 654,
      sender: {
        cardNumber: "123448760",
        cardCode: "1230",
        balance: "1200",
        name: "User",
      },
      amount: 200,
      type: "withdrawal",
    });

    describe("Get all operations if there is at least one", () => {
      it.each(["string"])("No operations found", (expected) => {
        expect(typeof bank.getOperations()).toBe(expected);
      });
    });
  });
});
