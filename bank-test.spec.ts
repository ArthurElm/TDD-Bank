import { Bank } from './bank-script'
import { User } from './users'

describe('Bank', () => {

    let users = []
    for(let i = 0; i < 5; i++){
        let cardNumber = "12344876" + i
        let cardCode = "123" + i
        let balance = "1200"
        let name = "User" + i
        let user = new User(cardNumber, cardCode, balance, name)
        users.push(user)
    }

    let bank = new Bank(users)

    describe('Simple cases', () => {
        it.each([
            [["123448760", "1230"], users[0]],
            [["123448762", "1232"], users[2]],
            [["123448457666", "1234"], null],
            [["12344876", "123466"], null],
            [["12344876a", "123466"], null],
            [["12344??876", "123466"], null]
        ])('Card "%s" return %o', (n, expected) => {
            expect(bank.checkBalance(n[0], n[1])).toBe(expected)
        })
    })
})
