const db = require('./conn');

class ItineraryModel {
    constructor(id, title, user_id) {
        this.id = id;
        this.title = title;
        this.user_id = user_id;
    }

    static async getItinerary(user_id) {
        try {
            const query = `SELECT * FROM itinerary WHERE user_id = ${user_id}`
            response = await db.any(query);
            return response;
        } catch (error) {
        console.log('ERROR: ', error);
        return error
        }
    }

    async addItinerary() {
        try {
            const query = `INSERT INTO itinerary (title, user_id) VALUES ('${this.title}', '${this.user_id}') RETURNING id;`;
            const response = await db.one(query);
            return response;
        } catch (error) {
            console.log('ERROR: ', error);
            return error;
        }
    }
    
}