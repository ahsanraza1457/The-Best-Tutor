import { prisma } from "@/lib/prisma";
import AdmissionsForm from "./AdmissionsForm";
import styles from "./admissions.module.css";
import { Suspense } from "react";

export default async function AdmissionsPage() {
  let courses: any[] = [];
  try {
    courses = await prisma.course.findMany({
      where: { status: "Active" },
      select: { id: true, name: true, class: true }
    });
  } catch (e) {
    console.error("Error fetching courses for admissions", e);
  }

  return (
    <div>
      <section className={styles.banner} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
        <div className="container text-center">
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#4ade80', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block', marginBottom: '1rem' }}>
            🎓 1-on-1 Home & Online Tutoring
          </span>
          <h1 className={styles.bannerTitle} style={{ color: '#ffffff' }}>Request a Home Tutor</h1>
          <p className={styles.bannerSubtitle} style={{ color: '#cbd5e1' }}>
            Get matched with qualified, verified tutors for Class 1 to BS Level across Pakistan.
          </p>
        </div>
      </section>

      <section className="section section-light" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className={styles.admissionsLayout}>
            
            {/* Sidebar info */}
            <div className={styles.infoSidebar}>
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Why Choose Us?</h3>
                <ul className={styles.benefitList}>
                  <li>✓ 100% Background Checked Tutors</li>
                  <li>✓ 1-on-1 Individual Attention at Home</li>
                  <li>✓ Female & Male Tutors Available</li>
                  <li>✓ Free 2-Day Trial Class</li>
                  <li>✓ Weekly Progress Reports for Parents</li>
                </ul>
              </div>
              
              <div className="card" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                <h3 style={{ marginBottom: '1rem', color: 'white' }}>Need Assistance?</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Call or WhatsApp our tutor coordinator directly for instant tutor matching.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span>📞</span> <a href="tel:+923111540040" style={{ color: '#ffffff', fontWeight: 700 }}>+92 311 1540040</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span>💬</span> <a href="https://wa.me/923111540040?text=Hi,%20I%20need%20a%20home%20tutor." target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', fontWeight: 700 }}>WhatsApp Us</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>✉️</span> <span style={{ opacity: 0.9 }}>info@thebesttutor.edu.pk</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formContainer}>
              <Suspense fallback={<div className="card text-center" style={{ padding: '4rem' }}>Loading form...</div>}>
                <AdmissionsForm courses={courses} />
              </Suspense>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
