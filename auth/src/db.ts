import { MongoClient, Db } from "mongodb";

const mongoUrl: string = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName: string = "auth_db";

console.log("[INFO] Auth Mongodb URL: ", mongoUrl);

class MongoDBClient {
  private static instance: MongoDBClient;
  private client: MongoClient;
  private db: Db | null = null;

  private constructor() {
    this.client = new MongoClient(mongoUrl);
  }

  public static getInstance(): MongoDBClient {
    if (!this.instance) {
      this.instance = new MongoDBClient();
    }
    return this.instance;
  }

  public async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    await this.client.connect();
    console.log("[INFO] Connected successfully to auth MongoDB");
    this.db = this.client.db(dbName);
    return this.db;
  }

  public async close(): Promise<void> {
    await this.client.close();
    this.db = null;
    console.log("[INFO] Auth MongoDB connection closed");
  }
}

const mongoDBClient = MongoDBClient.getInstance();

export async function getUser(email?: string, password?: string) {
  const db = await mongoDBClient.connect();
  const collection = db.collection("users");
  const query = password ? { email, password } : { email };
  return collection.findOne(query);
}

export async function addUser(email: string, password: string) {
  if (!email || !password) {
    console.warn("[WARN] Email or password cannot be empty");
    return null;
  }

  const db = await mongoDBClient.connect();
  const collection = db.collection("users");
  const result = await collection.insertOne({ email, password });
  return { id: result.insertedId, email };
}

process.on("SIGINT", async () => {
  await mongoDBClient.close();
  console.log("[INFO] Application is shutting down...");
  process.exit(0);
});
