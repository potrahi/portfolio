import { MongoClient, Db } from "mongodb";

const url = process.env.MONGO_URL || "mongodb://localhost:27018";

console.log("[INFO] Auth Mongodb URL: ", url);

const dbName = "auth_db";

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
        console.log("[INFO] Connected successfully to auth MongoDB");
        this.db = this.client.db(dbName);
      } catch (err) {
        console.error("[ERROR] Failed to connect to auth MongoDB", err);
        throw err;
      }
    }
    return this.db;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.db = null;
      console.log("[INFO] Auth MongoDB connection closed");
    }
  }
}

const mongoDBClient = MongoDBClient.getInstance();

export async function get(email?: string, password?: string) {
  try {
    const db = await mongoDBClient.connect();
    const collection = db.collection("authCollection");
    const query = password ? { email, password } : { email };
    const result = await collection.findOne(query);
    return result;
  } catch (err) {
    console.error("[ERROR] Could not return all users", err);
    throw err;
  }
}

export async function add(email: string, password: string) {
  if (email === "" || password === "") {
    console.log("[WARN] Email or password is empty");
    return;
  }

  try {
    const db = await mongoDBClient.connect();
    const collection = db.collection("authCollection");
    const result = await collection.insertOne({ email, password });
    return { id: result.insertedId, email };
  } catch (err) {
    throw err;
  }
}

process.on("SIGINT", async () => {
  await mongoDBClient.close();
  process.exit(0);
});
