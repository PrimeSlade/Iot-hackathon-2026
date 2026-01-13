import prisma from "../src/lib/prisma";
import { auth } from "../src/lib/auth";

async function main() {
  console.log("Creating mock accounts...");

  // Check if mock accounts already exist
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@test.com" },
  });

  const existingUser = await prisma.user.findUnique({
    where: { email: "user@test.com" },
  });

  if (!existingAdmin) {
    // Create admin account
    await auth.api.signUpEmail({
      body: {
        email: "admin@test.com",
        password: "123456789",
        name: "Admin User",
      },
    });

    // Update role to admin
    await prisma.user.update({
      where: { email: "admin@test.com" },
      data: { role: "admin" },
    });

    console.log("✅ Admin account created: admin@test.com / 12345");
  } else {
    console.log("ℹ️  Admin account already exists");
  }

  if (!existingUser) {
    // Create regular user account
    await auth.api.signUpEmail({
      body: {
        email: "user@test.com",
        password: "123456789",
        name: "Regular User",
      },
    });

    console.log("✅ User account created: user@test.com / 12345");
  } else {
    console.log("ℹ️  User account already exists");
  }

  console.log("\n✅ Mock accounts ready for testing!");
}

main()
  .catch((e) => {
    console.error("❌ Error creating mock accounts:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
