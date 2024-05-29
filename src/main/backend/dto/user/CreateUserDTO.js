
class CreateUserDTO {
    constructor(email, password) {
        this.email = email
        this.password = password
    }

    getEmail(){
        return this.email
    }
    getPassword(){
        return this.password
    }

    validateValues() {
        if (!this.email || !this.email.includes("@") || !this.email.includes(".")) {
            throw new Error('Invalid email')
        }
        if (!this.password || this.password.length < 8 || !(/^[a-zA-Z0-9]*$/).test(this.password)) {
            throw new Error('Invalid password')
        }
    }
}