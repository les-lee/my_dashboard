import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const permissions = [
  ['Dashboard', 'dashboard:view', 'dashboard'],
  ['User View', 'user:view', 'user'],
  ['User Create', 'user:create', 'user'],
  ['User Update', 'user:update', 'user'],
  ['User Delete', 'user:delete', 'user'],
  ['Role View', 'role:view', 'role'],
  ['Role Create', 'role:create', 'role'],
  ['Role Update', 'role:update', 'role'],
  ['Role Delete', 'role:delete', 'role'],
  ['Permission View', 'permission:view', 'permission'],
  ['Permission Create', 'permission:create', 'permission'],
  ['Setting View', 'setting:view', 'setting'],
] as const;

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123456', 12);

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      displayName: 'System Admin',
      email: 'admin@example.com',
      passwordHash,
    },
  });

  const role = await prisma.role.upsert({
    where: { code: 'admin' },
    update: {},
    create: { name: 'Administrator', code: 'admin', description: 'Full access role' },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: role.id } },
    update: {},
    create: { userId: admin.id, roleId: role.id },
  });

  for (const [name, code, resource] of permissions) {
    const permission = await prisma.permission.upsert({
      where: { code },
      update: {},
      create: { name, code, resource },
    });
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
      update: {},
      create: { roleId: role.id, permissionId: permission.id },
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
