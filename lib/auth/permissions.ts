import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  project: ["create", "read", "update", "delete"],
  inquiry: ["read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  project: ["create", "read", "update", "delete"],
  inquiry: ["read", "update", "delete"],
});

export const staff = ac.newRole({
  project: ["create", "read", "update"],
  inquiry: ["read", "update"],
});
