import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Business from "@/models/Business";
import User from "@/models/User";

// GET - Récupérer une entreprise par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const business = await Business.findById(id).populate(
      "ownerId",
      "name email phone photo"
    );

    if (!business) {
      return NextResponse.json({ error: "Entreprise non trouvée" }, { status: 404 });
    }

    const token = request.cookies.get("token")?.value;
    let isAdmin = false;

    if (token) {
      const decoded = verifyToken(token);
      if (decoded && typeof decoded !== "string") {
        const user = await User.findById(decoded.userId);
        isAdmin = user?.role === "super_admin";
      }
    }

    if (!isAdmin && business.status !== "approved") {
      return NextResponse.json(
        { error: "Cette entreprise n'est pas encore disponible. Elle est en attente de validation." },
        { status: 403 }
      );
    }

    business.views += 1;
    await business.save();

    return NextResponse.json(business);
  } catch (error) {
    console.error("GET /api/businesses/[id] error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT - Modifier une entreprise
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === "string") {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const business = await Business.findById(id);
    if (!business) {
      return NextResponse.json({ error: "Entreprise non trouvée" }, { status: 404 });
    }

    const user = await User.findById(decoded.userId);
    const isOwner = business.ownerId.toString() === decoded.userId;
    const isAdmin = user?.role === "super_admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const updated = await Business.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/businesses/[id] error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE - Supprimer une entreprise
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === "string") {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    const { id } = await params;

    const business = await Business.findById(id);
    if (!business) {
      return NextResponse.json({ error: "Entreprise non trouvée" }, { status: 404 });
    }

    const user = await User.findById(decoded.userId);
    const isOwner = business.ownerId.toString() === decoded.userId;
    const isAdmin = user?.role === "super_admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    await Business.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/businesses/[id] error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}