
class UpdateUserDTO {
    constructor(email, password) {
        this.email = email
        this.password = password
    }
    setEmail(email) {
        this.email = email
    }
    setPassword(pwd) {
        this.password = pwd
    }
    validate() {
        if (!this.email || !this.email.includes("@") || !this.email.includes(".")) {
            throw new Error('Invalid email')
        }
        if (!this.password || this.password.length < 8 || !(/^[a-zA-Z0-9]*$/).test(this.password)) {
            throw new Error('Invalid password')
        }
    }

}