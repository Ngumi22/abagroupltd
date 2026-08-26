import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";
import { ac, admin, staff } from "@/lib/auth/permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL!],

  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  plugins: [
    adminPlugin({
      ac,
      roles: { admin, staff },
      adminRoles: ["admin"],
      defaultRole: "staff",
      adminUserIds: [],
    }),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
