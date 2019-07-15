class History {
    constructor (history) {
        this.userDetails = history['userDetails'];
        this.source = history['source'];
        this.destination = history['destination'];
        this.createdAt = history['createdAt'] || new Date().getTime();
        this.email = history['email'];
    }
}
module.exports = History;