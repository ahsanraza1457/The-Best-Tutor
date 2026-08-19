import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    try {
      const tmpDbPath = "/tmp/dev.db";
      const sourceDbPath = path.join(process.cwd(), "prisma", "dev.db");
      
      if (!fs.existsSync(tmpDbPath)) {
        if (fs.existsSync(sourceDbPath)) {
          fs.copyFileSync(sourceDbPath, tmpDbPath);
        } else {
          // Create empty file if source db doesn't exist
          fs.writeFileSync(tmpDbPath, "");
        }
      }
      process.env.DATABASE_URL = `file:${tmpDbPath}`;
    } catch (e) {
      console.warn("Prisma Vercel /tmp copy note:", e);
    }
  }

  return (
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ["error"],
    })
  );
}

export const prisma = createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

