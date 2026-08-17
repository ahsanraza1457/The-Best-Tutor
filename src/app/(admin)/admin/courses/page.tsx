import { prisma } from "@/lib/prisma";
import CoursesClient from "./CoursesClient";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({ include: { teacher: true }, orderBy: { createdAt: 'desc' } });
  const teachers = await prisma.teacher.findMany({ where: { status: 'Active' } });

  return <CoursesClient courses={courses} teachers={teachers} />;
}
