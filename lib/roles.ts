export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  VILLAGE_CHIEF: 'village_chief',
  COMMUNITY_CHIEF: 'community_chief',
  SECTOR_PRESIDENT: 'sector_president',
  MEMBER: 'member'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const roleHierarchy: Record<Role, number> = {
  [ROLES.SUPER_ADMIN]: 5,
  [ROLES.VILLAGE_CHIEF]: 4,
  [ROLES.COMMUNITY_CHIEF]: 3,
  [ROLES.SECTOR_PRESIDENT]: 2,
  [ROLES.MEMBER]: 1
};

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Liste des rôles autorisés pour chaque permission
const MANAGER_ROLES: Role[] = [ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF, ROLES.SECTOR_PRESIDENT];
const ADMIN_ROLES: Role[] = [ROLES.SUPER_ADMIN, ROLES.VILLAGE_CHIEF, ROLES.COMMUNITY_CHIEF];

export function canManageSector(userRole: Role): boolean {
  return MANAGER_ROLES.includes(userRole);
}

export function canManageCommunity(userRole: Role): boolean {
  return ADMIN_ROLES.includes(userRole);
}

export function canBoostEvents(userRole: Role): boolean {
  return MANAGER_ROLES.includes(userRole);
}

// Fonctions avec vérification de type
export function isAdmin(role: Role): boolean {
  return ADMIN_ROLES.includes(role);
}

export function isManager(role: Role): boolean {
  return MANAGER_ROLES.includes(role);
}