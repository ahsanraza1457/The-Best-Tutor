import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "./courses.module.css";

export default async function CoursesPage() {
  // Fetch active courses from the database
  let courses: any[] = [];
  try {
    courses = await prisma.course.findMany({
      where: { status: "Active" },
      include: { teacher: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error("Error fetching courses", e);
  }

  return (
    <div>
      <section className={styles.banner}>
        <div className="container">
          <h1 className={styles.bannerTitle}>Our Courses</h1>
          <p className={styles.bannerSubtitle}>Explore our comprehensive range of courses designed for your success.</p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          {courses.length === 0 ? (
            <div className="text-center" style={{ padding: '4rem 0' }}>
              <h3 style={{ color: 'var(--text-light)' }}>No courses available at the moment.</h3>
              <p>Please check back later or contact us for more information.</p>
            </div>
          ) : (
            <div className={styles.coursesGrid}>
              {courses.map((course) => (
                <div key={course.id} className="card">
                  <div className={styles.courseHeader}>
                    <span className={styles.courseClass}>{course.class}</span>
                    <span className={styles.courseFee}>${course.fee}/mo</span>
                  </div>
                  
                  <h3 className={styles.courseTitle}>{course.name}</h3>
                  <p className={styles.courseDesc}>{course.description}</p>
                  
                  <div className={styles.courseDetails}>
                    <div className={styles.detailItem}>
                      <strong>Subjects:</strong> {course.subjects}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Duration:</strong> {course.duration}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Schedule:</strong> {course.days} ({course.startTime} - {course.endTime})
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Teacher:</strong> {course.teacher?.name || "TBA"}
                    </div>
                  </div>
                  
                  <div className={styles.courseActions}>
                    <Link href={`/admissions?course=${course.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
