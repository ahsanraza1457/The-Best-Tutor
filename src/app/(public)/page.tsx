import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>✨ #1 Verified Home Tuition Provider in Pakistan</div>
            <h1 className={styles.heroTitle}>
              Get Qualified <span className={styles.highlightText}>Home & Online Tutors</span> at Your Doorstep
            </h1>
            <p className={styles.heroSubtitle}>
              Personalized 1-on-1 tuition from <strong>Class 1 to BS Level</strong> for all subjects across Pakistan. Learn at home with trusted, background-checked tutors.
            </p>
            <div className={styles.heroActions}>
              <Link href="/admissions" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                🎓 Request a Home Tutor
              </Link>
              <a 
                href="https://wa.me/923111540040?text=Hi!%20I%20need%20a%20Home%20Tutor." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
                style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}
              >
                💬 WhatsApp: +92 311 1540040
              </a>
            </div>
            <div className={styles.heroTags}>
              <span>✓ Free Trial Class</span>
              <span>✓ Female & Male Tutors</span>
              <span>✓ All Pakistan Boards & O/A-Levels</span>
            </div>
          </div>

          <div className={styles.heroVisualCard}>
            <div className={styles.tuitionBadgeCard}>
              <div className={styles.badgeHeader}>
                <span className={styles.badgeDot}></span>
                <strong>Live Tutor Dispatch</strong>
              </div>
              <ul className={styles.quickFeatureList}>
                <li>🏠 <strong>Home Tuition</strong> (Teacher comes to your home)</li>
                <li>💻 <strong>Online Tuition</strong> (Live 1-on-1 HD Zoom/Teams)</li>
                <li>📚 <strong>Class 1 to BS Level</strong> (All Subjects Covered)</li>
                <li>⭐ <strong>Weekly Assessment</strong> & Parent Feedback</li>
              </ul>
              <div className={styles.callBox}>
                <span>Instant Call / Booking:</span>
                <a href="tel:+923111540040">📞 +92 311 1540040</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Levels Covered (Class 1 to BS Level) */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--emerald-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comprehensive Coverage</span>
            <h2 style={{ marginTop: '0.5rem' }}>Tuition Available From Class 1 to BS Level</h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)' }}>
              We provide specialist home tutors for all school, college, and university level curricula in Pakistan.
            </p>
          </div>

          <div className={styles.levelsGrid}>
            {[
              {
                title: "Primary (Class 1 to 5)",
                desc: "Foundation building in English, Urdu, Mathematics, General Science & Islamiat with gentle 1-on-1 care.",
                icon: "✏️",
                subjects: "English, Urdu, Math, Science, Islamiat, Computer"
              },
              {
                title: "Middle (Class 6 to 8)",
                desc: "Conceptual clarity and exam preparation for Mathematics, Science, Computer Science, and Languages.",
                icon: "📖",
                subjects: "Math, General Science, English, Urdu, History, Geography"
              },
              {
                title: "Matric (Class 9 & 10)",
                desc: "Rigorous board exam coaching for Punjab, Federal, Sindh, KPK & Aga Khan Board syllabi.",
                icon: "🔬",
                subjects: "Physics, Chemistry, Biology, Mathematics, Computer, Pak Studies"
              },
              {
                title: "Intermediate (FSc / ICS / I.Com)",
                desc: "Specialist tutors for FSc Pre-Medical, FSc Pre-Engineering, ICS (Computer Science), and I.Com.",
                icon: "📐",
                subjects: "Adv Math, Physics, Chemistry, Biology, Computer Science, Accounting"
              },
              {
                title: "O-Level & A-Level",
                desc: "Cambridge IGCSE, O-Level & A-Level coaching by top-tier school faculty and subject experts.",
                icon: "🏛️",
                subjects: "Maths D, Add Maths, Physics, Chemistry, Biology, Economics, CS"
              },
              {
                title: "BS Level / Graduation",
                desc: "Higher education tutoring for BS CS, BS Math, BS Physics, BS Chemistry, BBA, B.Com & English.",
                icon: "🎓",
                subjects: "Programming, Calculus, Linear Algebra, Organic Chemistry, Stats"
              }
            ].map((level, i) => (
              <div key={i} className="card">
                <div className={styles.levelIcon}>{level.icon}</div>
                <h3>{level.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', marginBottom: '1rem' }}>{level.desc}</p>
                <div className={styles.subjectTagsContainer}>
                  <strong>Popular Subjects:</strong> {level.subjects}
                </div>
                <Link href={`/admissions?class=${encodeURIComponent(level.title)}`} className="btn btn-outline" style={{ width: '100%', marginTop: '1.25rem' }}>
                  Find Tutor for {level.title.split(' ')[0]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Home Tuition Works */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <h2>Simple 4-Step Tutor Hiring Process</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
              Get a qualified tutor at your doorstep in less than 24 hours.
            </p>
          </div>

          <div className={styles.processGrid}>
            {[
              { step: "01", title: "Submit Request", desc: "Fill out the online request form or call/WhatsApp +92 311 1540040 with your class & subject requirement." },
              { step: "02", title: "Tutor Matching", desc: "We match you with the best verified tutor living near your location or specialized in your curriculum." },
              { step: "03", title: "Free Trial Class", desc: "Take a 2-day demo/trial lesson at home or online to evaluate tutor's teaching methodology." },
              { step: "04", title: "Start Learning", desc: "Confirm the tutor and begin regular 1-on-1 home tuition with weekly progress tracking." },
            ].map((item, i) => (
              <div key={i} className={styles.processStep}>
                <div className={styles.processNumber}>{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Trust Us */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2>Why Parents Choose The Best Tutor</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
              We prioritize safety, qualified tutors, and guaranteed grade improvements.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {[
              { icon: "🛡️", title: "100% Background Checked", desc: "All tutors are thoroughly verified with CNIC, degree credentials, and background checks for home safety." },
              { icon: "🎯", title: "1-on-1 Individual Focus", desc: "Complete dedicated attention to target specific student weaknesses and build strong concepts." },
              { icon: "👩‍🏫", title: "Female Tutors Available", desc: "Experienced female tutors available for young children and female students upon request." },
              { icon: "📅", title: "Flexible Home Timings", desc: "Choose your preferred tuition hours (Morning, Afternoon, Evening, or Weekend slots)." },
              { icon: "📊", title: "Weekly Progress Reports", desc: "Regular test series and progress updates provided to parents to keep track of performance." },
              { icon: "💸", title: "Affordable Monthly Fee", desc: "Transparent, reasonable monthly tuition packages tailored to student class level and subjects." },
            ].map((feature, i) => (
              <div key={i} className="card text-center">
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 style={{ marginTop: '0.75rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-slate)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { value: "1,200+", label: "Successful Students Taught" },
              { value: "450+", label: "Verified Home Tutors" },
              { value: "Class 1 to BS", label: "Full Level Coverage" },
              { value: "100%", label: "Satisfaction Guarantee" },
            ].map((stat, i) => (
              <div key={i} className={styles.statBox}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container text-center">
          <h2 style={{ color: '#ffffff', fontSize: '2.4rem', marginBottom: '1rem' }}>Looking for a Home Tutor in Pakistan?</h2>
          <p style={{ color: '#e2e8f0', marginBottom: '2rem', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
            Book a qualified tutor for Class 1 to BS Level today. Call or WhatsApp <strong>+92 311 1540040</strong> for instant assistance.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/admissions" className="btn btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
              Request Tutor Online
            </Link>
            <a href="https://wa.me/923111540040?text=Hi,%20I%20need%20a%20home%20tutor." target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              💬 WhatsApp: +92 311 1540040
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
