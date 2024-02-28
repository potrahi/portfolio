import { Db, MongoClient } from "mongodb";

const mongoUrl: string = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName: string = "message_db";

console.log("[INFO] Message Mongodb URL: ", mongoUrl);

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
    console.log("[INFO] Connected successfully to message MongoDB");
    this.db = this.client.db(dbName);
    return this.db;
  }

  public async close(): Promise<void> {
    await this.client.close();
    this.db = null;
    console.log("[INFO] Message MongoDB connection closed");
  }
}

const mongoDBClient = MongoDBClient.getInstance();

export async function allMessages(): Promise<any[]> {
  const db = await mongoDBClient.connect();
  const collection = db.collection("messages");
  return await collection.find({}).toArray();
}

export async function addMessage(
  email: string,
  message: string
): Promise<void> {
  if (!email || !message) {
    console.warn("[WARN] User email or message is empty");
    return;
  }

  const db = await mongoDBClient.connect();
  const collection = db.collection("messages");
  const result = await collection.insertOne({ email, message });
  console.log(
    `[INFO] A message was inserted with the _id: ${result.insertedId}`
  );
}

process.on("SIGINT", async () => {
  await mongoDBClient.close();
  console.log("[INFO] Application is shutting down...");
  process.exit(0);
});
