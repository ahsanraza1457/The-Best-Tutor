import { prisma } from "@/lib/prisma";
import styles from "./timetable.module.css";
import Link from "next/link";

export default async function TimetablePage({
  searchParams,
}: {
  searchParams: { class?: string; day?: string };
}) {
  const selectedClass = searchParams?.class || "";
  const selectedDay = searchParams?.day || "";

  let timetables: any[] = [];
  try {
    const whereClause: any = {};
    if (selectedClass) whereClause.class = { contains: selectedClass };
    if (selectedDay) whereClause.day = selectedDay;

    timetables = await prisma.timetable.findMany({
      where: whereClause,
      include: { teacher: true },
      orderBy: [
        { day: 'asc' },
        { startTime: 'asc' }
      ]
    });
  } catch (e) {
    console.error("Error fetching timetable", e);
  }

  // Pre-defined Subject Categories across Pakistan (Class 1 to BS Level)
  const PakistaniSubjectDirectory = [
    {
      level: "Class 1 to 5 (Primary Level)",
      badge: "Primary",
      color: "#059669",
      description: "Foundation level tutoring focusing on conceptual learning, handwriting, reading & basic mathematics.",
      subjects: [
        "Mathematics / Arithmetic", "English Grammar & Reading", "Urdu Literature & Writing",
        "General Science", "Islamiat & Nazra Quran", "Social Studies / General Knowledge", "Basic Computer Skills"
      ]
    },
    {
      level: "Class 6 to 8 (Middle Level)",
      badge: "Middle",
      color: "#2563eb",
      description: "Building strong analytical skills for upcoming board exams in science and mathematics.",
      subjects: [
        "Mathematics (Algebra & Geometry)", "General Science", "English Language & Literature",
        "Urdu & Comprehension", "Computer Science", "History & Geography", "Islamiat"
      ]
    },
    {
      level: "Class 9 & 10 (Matric / SSC)",
      badge: "Matric Board",
      color: "#d97706",
      description: "Targeted board exam coaching for Punjab Board, Federal Board (FBISE), Sindh Board, KPK & Aga Khan Board.",
      subjects: [
        "Physics (Theory & Practical)", "Chemistry (Theory & Practical)", "Biology (Theory & Practical)",
        "General / Science Mathematics", "Computer Science (Coding & Hardware)", "English Compulsory",
        "Urdu Compulsory", "Pakistan Studies", "Islamiat Compulsory"
      ]
    },
    {
      level: "Intermediate (FSc / ICS / I.Com / FA)",
      badge: "HSSC / College",
      color: "#7c3aed",
      description: "In-depth preparation for FSc Pre-Medical, Pre-Engineering, ICS, and I.Com entry tests.",
      subjects: [
        "FSc Pre-Medical: Biology, Chemistry, Physics",
        "FSc Pre-Engineering: Mathematics, Physics, Chemistry",
        "ICS: Computer Science, Mathematics, Physics / Statistics",
        "I.Com: Principles of Accounting, Economics, Business Math, Commercial Geography",
        "FA: Civics, Fine Arts, Psychology, Sociology, English Elective"
      ]
    },
    {
      level: "O-Level & A-Level (Cambridge)",
      badge: "Cambridge IGCSE",
      color: "#0284c7",
      description: "Specialized Cambridge faculty for O-Level (IGCSE) and A-Level subjects.",
      subjects: [
        "Physics (5054 / 9702)", "Chemistry (5070 / 9701)", "Biology (5090 / 9700)",
        "Mathematics D (4024)", "Additional Mathematics (4037)", "Computer Science (2210 / 9618)",
        "Accounting (7707 / 9706)", "Economics (2281 / 9708)", "Business Studies (7115 / 9609)"
      ]
    },
    {
      level: "BS Level / Graduation (University Level)",
      badge: "Degree Level",
      color: "#dc2626",
      description: "Expert university professors and subject specialists for BS, BBA, B.Com degree programs.",
      subjects: [
        "BS Computer Science: Programming (C++, Java, Python), Data Structures, Algorithms, Web Dev",
        "BS Mathematics: Calculus I-III, Linear Algebra, Differential Equations, Discrete Math",
        "BS Physics: Mechanics, Quantum Physics, Electromagnetism, Electronics",
        "BS Chemistry: Organic, Inorganic, Physical & Analytical Chemistry",
        "BS English: English Literature, Linguistics, Phonetics, Academic Writing",
        "BBA / B.Com: Financial Accounting, Corporate Finance, Micro/Macro Economics, Business Statistics",
        "BS Zoology & Botany: Cell Biology, Genetics, Microbiology, Physiology"
      ]
    }
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <span className={styles.bannerBadge}>📖 Comprehensive Curriculum Guide</span>
          <h1 className={styles.bannerTitle}>Classes, Subjects & Tuition Schedule</h1>
          <p className={styles.bannerSubtitle}>
            We offer 1-on-1 home tuition and live online tuition for <strong>Class 1 to BS Level</strong> across all Pakistani educational boards and Cambridge syllabi.
          </p>
        </div>
      </section>

      {/* Directory of Subjects (Class 1 to BS Level) */}
      <section className="section section-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <h2>Pakistani Curriculum Subject Directory</h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)' }}>
              Explore the complete subject breakdown available for Home Tuition & Online Coaching.
            </p>
          </div>

          <div className={styles.subjectDirectoryGrid}>
            {PakistaniSubjectDirectory.map((cat, idx) => (
              <div key={idx} className="card" style={{ borderTop: `4px solid ${cat.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className={styles.categoryBadge} style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                    {cat.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{cat.level}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{cat.description}</p>
                
                <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--text-dark)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                  Subjects Covered:
                </h4>
                <ul className={styles.subjectChipList}>
                  {cat.subjects.map((sub, sIdx) => (
                    <li key={sIdx} className={styles.subjectChip}>✓ {sub}</li>
                  ))}
                </ul>

                <Link 
                  href={`/admissions?class=${encodeURIComponent(cat.level.split(' ')[0] + ' ' + (cat.level.split(' ')[1] || ''))}`}
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1.5rem', padding: '0.7rem' }}
                >
                  Request Tutor for {cat.badge}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Tuition Timetable / Slots */}
      <section className="section" style={{ backgroundColor: 'var(--bg-slate)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <h2>Weekly Tuition Time Slots</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
              Tuition slots are customized to student availability (Afternoon, Evening & Weekend timings available).
            </p>
          </div>

          {/* Filters */}
          <div className={styles.filtersWrapper}>
            <div className={styles.filterGroup}>
              <h4>Filter by Day</h4>
              <div className={styles.filterTags}>
                <a href={`/timetable${selectedClass ? `?class=${encodeURIComponent(selectedClass)}` : ''}`} className={`${styles.filterTag} ${!selectedDay ? styles.active : ''}`}>All Days</a>
                {days.map(d => (
                  <a 
                    key={d} 
                    href={`/timetable?day=${encodeURIComponent(d)}${selectedClass ? `&class=${encodeURIComponent(selectedClass)}` : ''}`}
                    className={`${styles.filterTag} ${selectedDay === d ? styles.active : ''}`}
                  >
                    {d}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Slots Table */}
          <div className={styles.tableWrapper}>
            {timetables.length === 0 ? (
              <div className="card text-center" style={{ padding: '3.5rem 2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</div>
                <h3>Custom Flexible Timings Available!</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 1.5rem auto' }}>
                  For home tuition, timings are set completely according to your convenience. Contact us to schedule custom morning, afternoon, or evening slots.
                </p>
                <a 
                  href="https://wa.me/923111540040?text=Hi,%20I%20want%20to%20set%20a%20custom%20tuition%20timing." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp"
                >
                  💬 Set Custom Time via WhatsApp (+92 311 1540040)
                </a>
              </div>
            ) : (
              <table className={styles.timetable}>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time Slot</th>
                    <th>Class Level</th>
                    <th>Subject</th>
                    <th>Teacher / Tutor</th>
                    <th>Mode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {timetables.map((t) => (
                    <tr key={t.id}>
                      <td className={styles.dayCol}>{t.day}</td>
                      <td><strong>{t.startTime} - {t.endTime}</strong></td>
                      <td><span className={styles.classBadge}>{t.class}</span></td>
                      <td className={styles.subjectCol}>{t.subject}</td>
                      <td>{t.teacher?.name || "Assigned Tutor"}</td>
                      <td><span style={{ fontSize: '0.85rem', color: 'var(--emerald-accent)', fontWeight: 600 }}>{t.room || "Home / Online"}</span></td>
                      <td>
                        <Link href={`/admissions?course=${t.id}`} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                          Book Slot
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
