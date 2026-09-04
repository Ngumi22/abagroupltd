import { auth } from "@/lib/auth";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "Error: Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD environment variables.",
    );
    process.exit(1);
  }

  try {
    await auth.api.createUser({
      body: {
        email,
        password,
        name: "Admin",
        role: "admin",
      },
    });

    console.log(`Admin created: ${email}`);
  } catch (error: any) {
    if (
      error?.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" ||
      error?.message?.includes("already exists")
    ) {
      console.log(`Admin user (${email}) already exists. Skipping seed.`);
      return;
    }

    throw error;
  }
}

main();
