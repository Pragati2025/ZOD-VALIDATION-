import { ZodSchema } from "zod";
import { NextResponse } from "next/server";

export async function validateBody<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<T | NextResponse> {
  try {
    const body = await req.json();
    return schema.parse(body);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        errors: error.errors?.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }
}
