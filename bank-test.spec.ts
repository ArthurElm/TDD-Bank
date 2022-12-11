import { Bank } from "./bank-script";
import { User } from "./users";

describe("Bank", () => {
  let users = [];
  for (let i = 0; i < 5; i++) {
    let cardNumber = "12344876" + i;
    let cardCode = "123" + i;
    let balance = 1200;
    let name = "User" + i;
    let beneficiaries = [];
    let user = new User(cardNumber, cardCode, balance, name, beneficiaries);
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

  describe('Add balance', () => {
        let countAdded = 0
        describe('Add balance with valid user', () => {

            describe('Add balance === 0', () => {
                countAdded = 0
                it.each(
                    [[[users[0].cardNumber, users[0].cardCode, countAdded], users[0].balance],
                ])('Card n°%i balance : %o with ' + countAdded + ' added', (n, expected) => {
                    expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected)
                })
            })
            describe('Add balance < 0', () => {
                countAdded = -200
                it.each([
                    [[users[0].cardNumber, users[0].cardCode, countAdded], users[0].balance],
                ])('Card n°%i balance : %o (can\'t add ' + countAdded + ' as a negative value)', (n, expected) => {
                    expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected)
                })
            })
            describe('Add balance > 0', () => {
                countAdded = 200
                it('Card n°' + users[0].cardNumber + ' balance : ' + (users[0].balance + countAdded) +' with ' + countAdded + " added", () => {
                    expect(bank.addBalance(users[0].cardNumber, users[0].cardCode, countAdded)).toBe(users[0].balance + countAdded)
                })
            })
        })
        describe('Add balance with invalid user', () => {
            it.each([
                [[users[0].cardNumber + "1", users[0].cardCode + "1", countAdded], "Invalid user"],
            ])("Invalid card number or card code provided.", (n, expected) => {
                expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected)
            })
        })
    })

  describe('Withdraw money', () => {
        let withdrawal = 0;
        describe('Count < balance', () => {
            withdrawal = 200
            it.each([
                [[users[0].cardNumber, users[0].cardCode, withdrawal], (users[0].balance - withdrawal)],
                [[users[2].cardNumber, users[2].cardCode, withdrawal], (users[2].balance - withdrawal)],
            ])('Card n°%i : You took ' + withdrawal + ' , balance is now : %o', (n, expected) => {
                expect(bank.withDrawMoney(n[0], n[1], n[2])).toBe(expected)
            })
        })
        describe('Count > balance', () => {
            withdrawal = 2000
            it.each([
                [[users[0].cardNumber, users[0].cardCode, withdrawal], users[0].balance],
                [[users[2].cardNumber, users[2].cardCode, withdrawal], users[2].balance],
            ])('Can\'t take that amount for card n°%i balance : '+ withdrawal + ' > %o', (n, expected) => {
                expect(bank.withDrawMoney(n[0], n[1], n[2])).toBe(expected)
            })
        })
        describe('Withdraw money with invalid user', () => {
            it.each([
                [[users[0].cardNumber + "1", users[0].cardCode, withdrawal], "Invalid user"],
                [[users[0].cardNumber, users[0].cardCode + "1", withdrawal], "Invalid user"],
                [[users[0].cardNumber + "1", users[0].cardCode + "1", withdrawal], "Invalid user"],
                [[users[0].cardNumber + "A", users[0].cardCode + "B", withdrawal], "Invalid user"],
            ])('Invalid card number or card code provided.', (n, expected) => {
                expect(bank.withDrawMoney(n[0], n[1], n[2])).toBe(expected)
            })
        })
    })

  describe('Devise', () => {
    let devise = ['euros' , 'dollars', 'yen'];

    describe('Balance in EUROS', () => {
        it.each([
            [[users[0].cardNumber, users[0].cardCode, devise[0]], (users[0].balance)],
            [[users[2].cardNumber, users[2].cardCode, devise[0]], (users[2].balance)],
        ])('Card n°%i : Your balance is  : %o euros', (n, expected) => {
            expect(bank.checkDevise(n[0], n[1], n[2])).toBe(expected)
        })
    })
    describe('Balance in DOLLARS', () => {
        it.each([
            [[users[0].cardNumber, users[0].cardCode, devise[1]], users[0].balance * 1.0559],
            [[users[2].cardNumber, users[2].cardCode, devise[1]], users[2].balance * 1.0559],
        ])('Card n°%i : Your balance is  : %o dollars', (n, expected) => {
            expect(bank.checkDevise(n[0], n[1], n[2])).toBe(expected)
        })
    })
    describe('Balance in YEN', () => {
        it.each([
            [[users[0].cardNumber, users[0].cardCode, devise[2]], users[0].balance * 143],
            [[users[2].cardNumber, users[2].cardCode, devise[2]], users[2].balance * 143],
        ])('Card n°%i : Your balance is  : %o yen', (n, expected) => {
            expect(bank.checkDevise(n[0], n[1], n[2])).toBe(expected)
        })
    })
    describe('Balance and devises with invalid user', () => {
        it.each([
            [[users[0].cardNumber + "1", users[0].cardCode, devise[0]], "Invalid user"],
            [[users[0].cardNumber, users[0].cardCode + "1", devise[0]], "Invalid user"],
            [[users[0].cardNumber + "1", users[0].cardCode + "1", devise[0]], "Invalid user"],
            [[users[0].cardNumber + "A", users[0].cardCode + "B", devise[0]], "Invalid user"],
        ])('Invalid card number or card code provided.', (n, expected) => {
            expect(bank.checkDevise(n[0], n[1], n[2])).toBe(expected)
        })
    })
})

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

  describe('Transfer money', () => {
    let amount = 0
    describe('Transfer money with valid users', () => {

        describe('Transfer money if doner has not enough money', () => {
            amount = 10000
            it.each([
                [[users[0], users[1], amount], users[1].balance],])
            (users[0].name + ' try to donate ' + amount + ' to ' + users[1].name + ' but his balance is to low (' + users[0].balance + ')', (n, expected) => {
                expect(bank.transferMoney(n[0], n[1], n[2])).toBe(expected)})
        })
        describe('Transfer money if doner has enough money', () => {
            amount = 200
            it.each([
                [[users[0], users[1], amount], users[1].balance + amount],])
            (users[1].name + ' received ' + amount + ' from ' + users[0].name + '. His solde was ' + users[1].balance + ' and is now ' + (users[1].balance + amount) , (n, expected) => {
                expect(bank.transferMoney(n[0], n[1], n[2])).toBe(expected)})
        })
    })

    describe('Transfer money with invalid user', () => {
        it.each([
            [[users[0], "InvalidUser", amount], "Invalid user"],
            [['InvalidUser', users[0], amount], "Invalid user"],
            [['InvalidUser', "InvalidUser", amount], "Invalid user"],
        ])("Invalid card number or card code provided.", (n, expected) => {
            expect(bank.transferMoney(n[0], n[1], n[2])).toBe(expected)
        })
    })
})

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

  describe("Loan", () => {
        let loanAdded = 0
        describe("Loan with valid user", () => {
            describe("Loan > 0", () => {
                loanAdded = 1700
                it.each([
                    [[users[0].cardNumber, users[0].cardCode, loanAdded], users[0].balance + loanAdded],
                ])(
                    "Card n°%i balance : %o with " + loanAdded + " added",
                    (n, expected) => {
                        expect(bank.loanMoney(n[0], n[1], n[2])).toBe(expected)
                    }
                )
            })
            describe("Loan === 0", () => {
                loanAdded = 0
                it.each([
                    [[users[0].cardNumber, users[0].cardCode, loanAdded], users[0].balance],
                ])(
                    "Card n°%i balance : %o with " + loanAdded + " added",
                    (n, expected) => {
                        expect(bank.loanMoney(n[0], n[1], n[2])).toBe(expected)
                    }
                )
            })
            describe("Loan < 0", () => {
                loanAdded = -200
                it.each([
                    [[users[0].cardNumber, users[0].cardCode, loanAdded], users[0].balance],
                ])(
                    "Card n°%i balance : %o (can't add " +
                    loanAdded +
                    " as a negative value)",
                    (n, expected) => {
                        expect(bank.loanMoney(n[0], n[1], n[2])).toBe(expected)
                    }
                )
            })
            describe("Loan > balance * 10", () => {
                loanAdded = 1000000
                it.each([
                    [[users[0].cardNumber, users[0].cardCode, loanAdded], users[0].balance],
                ])(
                    "Can't loan more than 10 time balance amount card n°%i balance : %o loan : " +
                    loanAdded,
                    (n, expected) => {
                        expect(bank.loanMoney(n[0], n[1], n[2])).toBe(expected)
                    }
                )
            })
        })
        describe("Loan with invalid user", () => {
            it.each([
                [[users[0].cardNumber + "1", users[0].cardCode, loanAdded], "Invalid user"],
                [[users[0].cardNumber, users[0].cardCode + "1", loanAdded], "Invalid user"],
                [[users[0].cardNumber + "1", users[0].cardCode + "1", loanAdded], "Invalid user"],
                [[users[0].cardNumber + "A", users[0].cardCode + "B", loanAdded], "Invalid user"],
            ])("Invalid card number or card code provided.", (n, expected) => {
                expect(bank.loanMoney(n[0], n[1], n[2])).toBe(expected)
            })
        })
    })

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
      it("Operations found", () => {
        expect(operations instanceof Array).toBe(true);
      });
    });
  });

//   describe("Add a beneficiary", () => {
//     let correctBeneficiary = users[2];
//     let invalidBeneficiary = new User("123456789", "123", 1200, "User");
//
//     describe("Add a Beneficiary with correct user", () => {
//         it.each([[users[0], correctBeneficiary], true])("Beneficiary added", (n, expected) => {
//             console.log(n)
//             expect(bank.addBeneficiary(n[0],n[1])).toBe(expected);
//         });
//     });
//
//     bank.addBeneficiary(users[0], users[1])
//
//     describe("Add a Beneficiary with existing beneficiary", () => {
//           it.each([[users[0], users[1]], "Beneficiary already exists in the array."])("Beneficiary already exists in the array.", (n, expected) => {
//               expect(bank.addBeneficiary(n[0],n[1])).toBe(expected);
//           });
//       });
//     describe("Add a Beneficiary with invalid user", () => {
//         it.each([[[users[0], invalidBeneficiary], "Invalid user"]])(
//             "Invalid user",
//             (n, expected) => {
//                 expect(bank.addBeneficiary(n[0],n[1])).toBe(expected);
//             }
//         );
//     });
//
// });
});