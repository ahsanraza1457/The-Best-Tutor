import { prisma } from "@/lib/prisma";
import AdmissionsClientTable from "./AdmissionsClientTable";

export default async function AdminAdmissionsPage() {
  let applications: any[] = [];
  try {
    applications = await prisma.admissionApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        course: {
          select: { name: true }
        }
      }
    });
  } catch (e) {
    console.error(e);
  }

  // Get unique filters
  const uniqueClasses = Array.from(new Set(applications.map(a => a.class))).filter(Boolean);
  const uniqueCourses = Array.from(new Set(applications.map(a => a.course?.name))).filter(Boolean);
  const uniqueCities = Array.from(new Set(applications.map(a => a.city))).filter(Boolean);

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>
        Admission Applications
      </h1>
      <AdmissionsClientTable 
        initialData={applications} 
        filters={{ uniqueClasses, uniqueCourses, uniqueCities }}
      />
    </div>
  );
}
