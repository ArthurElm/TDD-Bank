import { Bank } from './bank-script'
import { User } from './users'

describe('Bank', () => {

    let users = []
    for(let i = 0; i < 5; i++){
        let cardNumber = "12344876" + i
        let cardCode = "123" + i
        let balance = 1200
        let name = "User" + i
        let user = new User(cardNumber, cardCode, balance, name)
        users.push(user)
    }

    let bank = new Bank(users)

    describe('Look balance', () => {
        describe('Look balance with correct user', () => {
            it.each([
                [[users[0].cardNumber, users[0].cardCode], users[0].balance],
                [[users[2].cardNumber, users[2].cardCode], users[2].balance],
            ])('Card n°%i balance : %o', (n, expected) => {
                expect(bank.lookBalance(n[0], n[1])).toBe(expected)
            })
        })
        describe('Look balance with invalid user', () => {
            it.each([
                [[users[0].cardNumber + "1", users[0].cardCode], "Invalid user"],
                [[users[0].cardNumber, users[0].cardCode + "1"], "Invalid user"],
                [[users[0].cardNumber + "1", users[0].cardCode + "1"], "Invalid user"],
                [[users[0].cardNumber + "A", users[0].cardCode + "B"], "Invalid user"],
            ])('Invalid card number or card code provided.', (n, expected) => {
                expect(bank.lookBalance(n[0], n[1])).toBe(expected)
            })
        })
    })


    describe('Add balance', () => {
        let countAdded = 0

        describe('Add balance with valid user', () => {
            describe('Add balance > 0', () => {
                countAdded = 200
                it('Card n°' + users[0].cardNumber + ' balance : ' + (users[0].balance + countAdded) +' with ' + countAdded + " added", () => {
                    expect(bank.addBalance(users[0].cardNumber, users[0].cardCode, countAdded)).toBe(users[0].balance + countAdded)
                })
            })
            describe('Add balance === 0', () => {
                countAdded = 0
                it.each([[[users[0].cardNumber, users[0].cardCode, 0], users[0].balance],
                ])('Card n°%i balance : %o with ' + countAdded + ' added', (n, expected) => {
                    expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected)
                })
            })
            describe('Add balance < 0', () => {
                countAdded = -200
                it.each([
                    [[users[0].cardNumber, users[0].cardCode, 0], users[0].balance],
                ])('Card n°%i balance : %o (can\'t add ' + countAdded + ' as a negative value)', (n, expected) => {
                    expect(bank.addBalance(n[0], n[1], n[2])).toBe(expected)
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
})
