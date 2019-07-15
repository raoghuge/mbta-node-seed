class User {
    constructor(user) {
        this.firstName = user['firstName'];
        this.lastName = user['lastName'];
        this.password = user['password'];
        this.email = user['email'];
        this.gender = user['gender'];
        this.token = user['token']
    }

}

module.exports = User;