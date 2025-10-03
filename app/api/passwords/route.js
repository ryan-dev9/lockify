// app/api/passwords/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const userId = session.user.email; // current user email

    const client = await clientPromise;
    const db = client.db("password_manager");

    // fetch by email or id
    const passwords = await db.collection("passwords").find({ owner: userId }).toArray();

    return new Response(JSON.stringify(passwords), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    // yaha check karo ki user.id aa raha hai ya nahi
    const userId = session.user.email;

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("password_manager");

    const result = await db.collection("passwords").insertOne({
      site: body.site,
      username: body.username,
      password: body.password,
      owner: userId,
      createdAt: new Date(),
    });

    // result ke basis pe response bhejna
    return new Response(JSON.stringify({
      _id: result.insertedId,
      site: body.site,
      username: body.username,
      password: body.password,
      owner: userId,
      createdAt: new Date(),
    }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

