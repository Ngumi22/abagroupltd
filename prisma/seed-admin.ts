import { auth } from "@/lib/auth";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL!;
  const password = process.env.SEED_ADMIN_PASSWORD!;

  await auth.api.createUser({
    body: {
      email,
      password,
      name: "Admin",
      role: "admin",
    },
  });

  console.log(`Admin created: ${email}`);
}

main();
