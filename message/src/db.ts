import { Db, MongoClient } from "mongodb";

const url = process.env.MONGO_URL || "mongodb://localhost:27017";

console.log("[INFO] Message Mongodb URL: ", url);

const dbName = "message_db";

class MongoDBClient {
  private static instance: MongoDBClient;
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    this.client = new MongoClient(url);
  }

  static getInstance(): MongoDBClient {
    if (!MongoDBClient.instance) {
      MongoDBClient.instance = new MongoDBClient();
    }
    return MongoDBClient.instance;
  }

  async connect(): Promise<Db> {
    if (!this.db) {
      try {
        await this.client.connect();
        console.log("[INFO] Connected successfully to message MongoDB");
        this.db = this.client.db(dbName);
      } catch (err) {
        console.error("[ERROR] Failed to connect to message MongoDB", err);
        throw err;
      }
    }
    return this.db;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.db = null;
      console.log("[INFO] Message MongoDB connection closed");
    }
  }
}

const mongoDBClient = MongoDBClient.getInstance();

export async function allMessages() {
  try {
    const db = await mongoDBClient.connect();
    const collection = db.collection("messageCollection");
    return await collection.find({}).toArray();
  } catch (err) {
    console.error("[ERROR] Could not return all messages", err);
    throw err;
  }
}

export async function addMessage(email: string, message: string) {
  if (email === "" || message === "") {
    console.log("[WARN] User email or message is empty");
    return;
  }

  try {
    const db = await mongoDBClient.connect();
    const collection = db.collection("messageCollection");
    const result = await collection.insertOne({ email, message });
    console.log(`A message was inserted with the _id ${result.insertedId}`);
    return result;
  } catch (err) {
    console.error("[ERROR] Could not save message", err);
    throw err;
  }
}

process.on("SIGINT", async () => {
  await mongoDBClient.close();
  process.exit(0);
});
