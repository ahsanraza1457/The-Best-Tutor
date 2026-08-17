import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerBrand}>The Best Tutor</h3>
          <p className={styles.footerTagline}>Home & Online Tuition Services</p>
          <p className={styles.footerText}>
            Providing qualified 1-on-1 home tutors and live online tuition across Pakistan for Class 1 to BS Level. Tailored learning for guaranteed academic success.
          </p>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.footerTitle}>Tuition Levels</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/timetable?class=Class+1-5">Primary (Class 1 - 5)</Link></li>
            <li><Link href="/timetable?class=Class+6-8">Middle (Class 6 - 8)</Link></li>
            <li><Link href="/timetable?class=Class+9-10">Matric (9th & 10th)</Link></li>
            <li><Link href="/timetable?class=FSc/ICS">Intermediate (FSc / ICS / I.Com)</Link></li>
            <li><Link href="/timetable?class=O/A-Level">O-Level & A-Level</Link></li>
            <li><Link href="/timetable?class=BS+Level">BS Level / Graduation</Link></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.footerTitle}>Quick Navigation</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/timetable">Classes & Subjects</Link></li>
            <li><Link href="/courses">Tuition Packages</Link></li>
            <li><Link href="/admissions">Request a Tutor</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/admin">Admin Portal</Link></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.footerTitle}>Contact Us</h4>
          <ul className={styles.footerContact}>
            <li>📍 Serving All Major Cities Across Pakistan (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad & Online)</li>
            <li>
              📞 <a href="tel:+923111540040" style={{ color: 'inherit', fontWeight: 600 }}>+92 311 1540040</a>
            </li>
            <li>
              💬 <a href="https://wa.me/923111540040?text=Hi,%20I%20need%20a%20home%20tutor." target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', fontWeight: 600 }}>
                +92 311 1540040 (WhatsApp)
              </a>
            </li>
            <li>✉️ info@thebesttutor.edu.pk</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p>&copy; {new Date().getFullYear()} The Best Tutor - Home & Online Tuition Service. All rights reserved.</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Quality 1-on-1 Home Tutoring in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
