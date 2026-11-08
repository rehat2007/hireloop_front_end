import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("MONGODB_URI is not set")
}

const client = new MongoClient(uri)
const db = client.db()

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
})
