import { prisma } from "@/lib/prisma";
import TimetableClient from "./TimetableClient";

export default async function AdminTimetablePage() {
  const timetables = await prisma.timetable.findMany({
    include: { teacher: true },
    orderBy: [{ day: 'asc' }, { startTime: 'asc' }]
  });
  const teachers = await prisma.teacher.findMany({ where: { status: 'Active' } });

  return <TimetableClient timetables={timetables} teachers={teachers} />;
}
