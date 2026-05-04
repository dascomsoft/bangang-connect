import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, Role } from '@/lib/roles';

export function roleMiddleware(requiredRole: Role) {
  return async (request: NextRequest) => {
    const userRole = request.headers.get('x-user-role') as Role;
    
    if (!userRole || !hasPermission(userRole, requiredRole)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    
    return null;
  };
}