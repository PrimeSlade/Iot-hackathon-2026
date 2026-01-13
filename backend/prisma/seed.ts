import prisma from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");

  // Create 10 boxes with empty status
  const boxes: any = [];
  for (let i = 1; i <= 10; i++) {
    boxes.push({
      status: "empty",
    });
  }

  // Insert all boxes
  const result = await prisma.box.createMany({
    data: boxes,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${result.count} boxes`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
