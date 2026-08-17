import styles from "./about.module.css";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className={styles.banner} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
        <div className="container text-center">
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#4ade80', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block', marginBottom: '1rem' }}>
            🌟 Trusted Education Partner
          </span>
          <h1 className={styles.bannerTitle} style={{ color: '#ffffff' }}>About The Best Tutor</h1>
          <p className={styles.bannerSubtitle} style={{ color: '#cbd5e1' }}>
            Pakistan's leading network of background-verified home and online tutors for Class 1 to BS Level.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section section-light">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2>Who We Are</h2>
              <p>
                <strong>The Best Tutor</strong> is Pakistan's premier home tuition agency dedicated to providing highly qualified, background-checked 1-on-1 private tutors for students from <strong>Class 1 to BS Level</strong> across all major cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and worldwide online).
              </p>
              <p>
                We understand that every student learns at their own pace. By delivering personalized home tutoring at your doorstep, we build conceptual clarity, boost confidence, and consistently deliver top grades in school exams, Matric, FSc, O/A-Levels, and university degree programs.
              </p>
            </div>
            
            <div className="card" style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem' }}>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>Need a Tutor at Home?</h3>
              <p style={{ color: '#e2e8f0', marginBottom: '1.5rem' }}>
                We provide a <strong>2-day free trial class</strong> to ensure complete parent & student satisfaction.
              </p>
              <a href="tel:+923111540040" className="btn btn-whatsapp" style={{ padding: '0.8rem 1.2rem', textDecoration: 'none' }}>
                📞 Call Helpline: +92 311 1540040
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ backgroundColor: 'var(--bg-slate)' }}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className="card">
              <div className={styles.iconWrapper}>🎯</div>
              <h3>Our Mission</h3>
              <p>
                To empower students across Pakistan with background-verified, high-caliber tutors who deliver personalized 1-on-1 tuition at home, ensuring top academic performance and lifelong learning.
              </p>
            </div>
            <div className="card">
              <div className={styles.iconWrapper}>👁️</div>
              <h3>Our Vision</h3>
              <p>
                To be recognized as the #1 most trusted and reliable home tuition service in Pakistan, known for safety, qualified tutors, transparent communication, and student success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Choose Us */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <h2>Why Parents Trust Our Home Tutors</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              We partner with parents to guarantee safety, regular feedback, and academic growth.
            </p>
          </div>
          
          <div className={styles.benefitsGrid}>
            {[
              { title: "CNIC & Credential Verified", desc: "Every tutor undergoes background verification with CNIC and degree audit." },
              { title: "Female & Male Tutors", desc: "Qualified female tutors available for young kids and female students." },
              { title: "Class 1 to BS Level Coverage", desc: "Subject specialists for primary, middle, Matric, FSc, O/A Levels & BS degrees." },
              { title: "Individual 1-on-1 Focus", desc: "Dedicated attention targeted at solving student's weak subjects." },
              { title: "Weekly Progress Reports", desc: "Regular test series and progress reports shared directly with parents." },
              { title: "Free 2-Day Trial", desc: "Evaluate tutor teaching quality at home before finalizing." }
            ].map((benefit, i) => (
              <div key={i} className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✦</div>
                <div>
                  <h4>{benefit.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3.5rem' }}>
            <Link href="/admissions" className="btn btn-primary" style={{ padding: '0.9rem 2.2rem' }}>
              Request a Home Tutor Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
