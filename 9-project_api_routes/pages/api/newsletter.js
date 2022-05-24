import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail | !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_DATABASE_URL);

    const db = client.db();

    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();

    res.status(200).json({ message: "Sucesss" });
  }
}
