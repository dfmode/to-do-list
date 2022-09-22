import { MongoClient } from "mongodb";
import { MONGO_NAME, MONGO_URI } from "../config/config.js";

interface User {
    username: string;
    password: string;
}

const client = new MongoClient(MONGO_URI);
try {
    await client.connect();
} catch(err) {
    console.error("Could not establish connection to MongoDB:\n ", err);
}

const db = client.db(MONGO_NAME);

const usersCollection = db.collection<User>('users');

await usersCollection.createIndex({username: 1}, {unique: true});

export default {usersCollection}

