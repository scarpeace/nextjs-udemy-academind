import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const payload = JSON.parse(req.body);
    const { email, name, text } = payload;

    const client = await MongoClient.connect(
      "mongodb+srv://admin:ommgDc2mGYD7jwq5@cluster0.npg59.mongodb.net/events?retryWrites=true&w=majority"
    );

    const db = client.db();

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    let newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;
    client.close();

    res.status(201).json({ message: "Added Comment", comment: newComment });
  }

  if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.MONGODB_DATABASE_URL);

    const db = client.db();
    const comments = await db
      .collection("comments")
      .find()
      // Sorting comments in descending order
      .sort({ _id: -1 })
      .toArray();

    client.close();

    res.status(200).json({ comments: comments });
  }
}
