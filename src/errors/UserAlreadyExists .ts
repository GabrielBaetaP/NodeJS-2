export class UserAlreadyExists extends Error {
    constructor () {
        super("Usuário já existente!")
    }
}