import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import categories from "./seed-data/categories.json";
import products from "./seed-data/products.json";

const adapter = new PrismaPg({
  connectionString:
    process.env.DATABASE_URL 
}); // need connected to the database

const prisma = new PrismaClient({ adapter });

async function main() {
  
    for (const category of categories) {
      await prisma.productCategory.upsert({
        where: { id: category.id },
        update: category,
        create: category,
      });
    }

    for (const product of products) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: product,
        create: product,
      });
    }
  
}

main().catch((err)=>{
    console.error(err)
})
.finally(async () => {
    await prisma.$disconnect();
});
