import { prisma } from "@/lib/prisma";
import TeachersClient from "./TeachersClient";

export default async function AdminTeachersPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { createdAt: 'desc' } });
  return <TeachersClient teachers={teachers} />;
}
