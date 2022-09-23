import { MongoClient } from "mongodb";
import { MONGO_NAME, MONGO_URI } from "../config/config.js";

interface User {
    username: string;
    password: string;
}

interface Task {
    description: string;
    status: boolean;
    owner: string;
}

const client = new MongoClient(MONGO_URI);
try {
    await client.connect();
} catch(err) {
    console.error("Could not establish connection to MongoDB:\n ", err);
}

const db = client.db(MONGO_NAME);

const usersCollection = db.collection<User>('users');
const tasksCollection = db.collection<Task>('tasks');

await usersCollection.createIndex({username: 1}, {unique: true});
await tasksCollection.createIndex({description: 1}, {unique: true});
await tasksCollection.createIndex({owner: 1}, {unique: false});

export default {usersCollection, tasksCollection};

