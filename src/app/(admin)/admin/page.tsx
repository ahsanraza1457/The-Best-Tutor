import { prisma } from "@/lib/prisma";
import styles from "./dashboard.module.css";
import Link from "next/link";

export default async function AdminDashboard() {
  let stats = {
    totalApplications: 0,
    newApplications: 0,
    totalStudents: 0,
    totalCourses: 0,
    activeTeachers: 0,
  };

  let recentApplications: any[] = [];

  try {
    stats.totalApplications = await prisma.admissionApplication.count();
    stats.newApplications = await prisma.admissionApplication.count({ where: { status: 'New' } });
    stats.totalCourses = await prisma.course.count();
    stats.activeTeachers = await prisma.teacher.count({ where: { status: 'Active' } });
    stats.totalStudents = await prisma.admissionApplication.count({ where: { status: 'Approved' } });

    recentApplications = await prisma.admissionApplication.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Home Tuition Management Dashboard</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--emerald-accent)' }}>📝</div>
          <div className={styles.statInfo}>
            <h3>Total Requests</h3>
            <p className={styles.statValue}>{stats.totalApplications}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', color: 'var(--secondary-color)' }}>⭐</div>
          <div className={styles.statInfo}>
            <h3>New Requests</h3>
            <p className={styles.statValue}>{stats.newApplications}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>🎓</div>
          <div className={styles.statInfo}>
            <h3>Assigned Tutors</h3>
            <p className={styles.statValue}>{stats.totalStudents}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>👨‍🏫</div>
          <div className={styles.statInfo}>
            <h3>Active Home Tutors</h3>
            <p className={styles.statValue}>{stats.activeTeachers}</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <h2>Recent Tutor Requests</h2>
            <Link href="/admin/admissions" className={styles.viewAll}>View All Requests</Link>
          </div>
          
          <div className={styles.tableResponsive}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Ref No</th>
                  <th>Student Name</th>
                  <th>Class Level</th>
                  <th>Subjects Required</th>
                  <th>Mode</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app: any) => (
                  <tr key={app.id}>
                    <td><strong>{app.referenceNumber}</strong></td>
                    <td>{app.studentName}</td>
                    <td>{app.class}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600 }}>{app.subjects || "All Subjects"}</td>
                    <td><span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{app.tuitionMode || "Home Tuition"}</span></td>
                    <td><a href={`tel:${app.phone}`}>📞 {app.phone}</a></td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles['status' + app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentApplications.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center" style={{ padding: '2rem' }}>No tutor requests submitted yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
