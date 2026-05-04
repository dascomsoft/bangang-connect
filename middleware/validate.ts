import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export function validateRequest(schema: z.ZodSchema) {
  return async (request: NextRequest) => {
    try {
      const body = await request.json();
      const validated = schema.parse(body);
      return { validated, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Utiliser 'issues' au lieu de 'errors' (nouvelle version de Zod)
        const errorDetails = error.issues || (error as any).errors;
        
        return {
          validated: null,
          error: NextResponse.json(
            { 
              error: 'Validation failed', 
              details: errorDetails.map((err: any) => ({
                field: err.path.join('.'),
                message: err.message
              }))
            },
            { status: 400 }
          )
        };
      }
      return {
        validated: null,
        error: NextResponse.json(
          { error: 'Invalid request body' },
          { status: 400 }
        )
      };
    }
  };
}

// Exporter des validateurs préconfigurés
export const validateRegister = validateRequest(
  z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    password: z.string().min(6),
  })
);