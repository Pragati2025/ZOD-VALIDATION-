import { NextResponse } from "next/server";
import { createUserSchema } from "@/schemas/user.schema";
import { validateBody } from "@/lib/zod-validator";

export async function POST(req: Request) {
  // Validate request body using Zod
  const validated = await validateBody(req, createUserSchema);

  // If validation fails, validateBody already returned a 400 response
  if (validated instanceof NextResponse) {
    return validated;
  }

  // If validation passes, return validated data
  return NextResponse.json(
    {
      success: true,
      data: validated,
    },
    { status: 200 }
  );
}
