import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("password_manager");
    const password = await db
      .collection("passwords")
      .findOne({ _id: new ObjectId(params.id) });

    return Response.json(password);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("password_manager");

    const result = await db.collection("passwords").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } }
    );

    return Response.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("password_manager");

    const result = await db
      .collection("passwords")
      .deleteOne({ _id: new ObjectId(params.id) });

    return Response.json({ deletedCount: result.deletedCount });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
