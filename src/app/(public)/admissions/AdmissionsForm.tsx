"use client";

import { useState } from "react";
import styles from "./admissions.module.css";
import { submitAdmission } from "@/app/actions/admission";
import { useSearchParams } from "next/navigation";

export default function AdmissionsForm({ courses }: { courses: any[] }) {
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get("course");
  const preselectedClass = searchParams.get("class") || "";

  const [selectedClass, setSelectedClass] = useState(preselectedClass);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string; referenceNumber?: string } | null>(null);

  const availableSubjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
    "English Language & Literature", "Urdu", "Principles of Accounting",
    "Economics", "Pakistan Studies", "Islamiat", "Calculus & Higher Math",
    "Programming (C++, Java, Python)", "Statistics"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const response = await submitAdmission(formData);

    setResult(response);
    setIsSubmitting(false);

    if (response.success) {
      e.currentTarget.reset();
    }
  };

  if (result?.success) {
    const waMessage = encodeURIComponent(
      `Hello! I just submitted a tutor request on your website.\nReference No: ${result.referenceNumber}\nPhone: +92 311 1540040`
    );

    return (
      <div className="card text-center" style={{ padding: '3.5rem 2rem' }}>
        <div className={styles.successIcon}>✓</div>
        <h2 style={{ color: 'var(--emerald-accent)', marginBottom: '1rem' }}>Tutor Request Submitted Successfully!</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-body)' }}>
          Thank you for choosing <strong>The Best Tutor</strong>. Our home tuition team will assign a verified tutor for your location shortly.
        </p>
        <div className={styles.referenceBox}>
          <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Unique Reference Number:</span>
          <strong style={{ fontSize: '1.6rem', color: 'var(--primary-color)' }}>{result.referenceNumber}</strong>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <a
            href={`https://wa.me/923111540040?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ width: '100%', maxWidth: '400px', padding: '1rem', fontSize: '1.05rem' }}
          >
            💬 Click Here to Confirm Request on WhatsApp (+92 311 1540040)
          </a>
          <button onClick={() => setResult(null)} className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '2.5rem' }}>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.75rem', color: 'var(--primary-color)' }}>
        Request a Home / Online Tutor
      </h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        Fill out this form to get matched with a qualified, verified tutor across Pakistan (Class 1 to BS Level).
      </p>

      {result?.error && (
        <div className={styles.errorMessage}>
          ⚠️ {result.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        
        {/* Section 1: Class & Subject Selection */}
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>1. Class & Subject Selection</h4>
          
          <div className={styles.rowGrid}>
            <div className="form-group">
              <label className="form-label">Select Class Level *</label>
              <select 
                name="class" 
                required 
                className="form-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">-- Choose Class Level (Class 1 to BS) --</option>
                <option value="Class 1 to 5 (Primary)">Class 1 to 5 (Primary Level)</option>
                <option value="Class 6 to 8 (Middle)">Class 6 to 8 (Middle Level)</option>
                <option value="Class 9 (Matric)">Class 9 (Matric Board)</option>
                <option value="Class 10 (Matric)">Class 10 (Matric Board)</option>
                <option value="FSc Pre-Medical">FSc Pre-Medical (Class 11 & 12)</option>
                <option value="FSc Pre-Engineering">FSc Pre-Engineering (Class 11 & 12)</option>
                <option value="ICS (Computer Science)">ICS Computer Science (Class 11 & 12)</option>
                <option value="I.Com (Commerce)">I.Com Commerce (Class 11 & 12)</option>
                <option value="FA (General Arts)">FA General Arts (Class 11 & 12)</option>
                <option value="O-Level (Cambridge)">O-Level / IGCSE (Cambridge)</option>
                <option value="A-Level (Cambridge)">A-Level (Cambridge)</option>
                <option value="BS Computer Science">BS Computer Science / Software Engineering</option>
                <option value="BS Mathematics">BS Mathematics / Calculus</option>
                <option value="BS Physics">BS Physics / Electronics</option>
                <option value="BS Chemistry">BS Chemistry</option>
                <option value="BS English">BS English Literature & Linguistics</option>
                <option value="BS Commerce / BBA">BS Economics / B.Com / BBA</option>
                <option value="Other Degree / Level">Other University Degree Level</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Tuition Mode *</label>
              <select name="tuitionMode" required className="form-select">
                <option value="Home Tuition">🏠 Home Tuition (Tutor comes to your home)</option>
                <option value="Online Tuition">💻 Online Tuition (1-on-1 HD Live Class)</option>
                <option value="Both (Home or Online)">Open to Both Options</option>
              </select>
            </div>
          </div>

          {/* Subject Checkboxes */}
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label" style={{ marginBottom: '0.75rem' }}>Select Required Subjects (Select all that apply):</label>
            <div className={styles.checkboxGrid}>
              {availableSubjects.map((sub) => (
                <label key={sub} className={styles.subjectBox}>
                  <input type="checkbox" name="subjects" value={sub} />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">Specific Subject(s) or Topics Required (If not listed above)</label>
            <input 
              type="text" 
              name="customSubjects" 
              className="form-input" 
              placeholder="e.g., Organic Chemistry, Linear Algebra, Java Programming, O-Level Physics 5054" 
            />
          </div>
        </div>

        {/* Section 2: Student & Parent Info */}
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>2. Student & Guardian Information</h4>
          
          <div className={styles.rowGrid}>
            <div className="form-group">
              <label className="form-label">Student Full Name *</label>
              <input type="text" name="studentName" required className="form-input" placeholder="e.g., Muhammad Ali" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Father's / Guardian's Name *</label>
              <input type="text" name="fatherName" required className="form-input" placeholder="e.g., Tariq Mehmood" />
            </div>
          </div>

          <div className={styles.rowGrid}>
            <div className="form-group">
              <label className="form-label">City *</label>
              <input type="text" name="city" required className="form-input" placeholder="e.g., Lahore, Karachi, Islamabad" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Area / Location *</label>
              <input type="text" name="area" required className="form-input" placeholder="e.g., Gulberg, DHA Phase 5, F-8, Clifton" />
            </div>
          </div>

          <div className={styles.rowGrid}>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input type="tel" name="phone" required className="form-input" placeholder="e.g., 03111540040" />
            </div>
            
            <div className="form-group">
              <label className="form-label">WhatsApp Number *</label>
              <input type="tel" name="whatsapp" required className="form-input" placeholder="e.g., 03111540040" defaultValue="03111540040" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input type="email" name="email" required className="form-input" placeholder="e.g., parent@example.com" />
          </div>
        </div>

        {/* Section 3: Additional Details */}
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>3. Tutor Preference & Additional Notes</h4>
          
          <div className={styles.rowGrid}>
            <div className="form-group">
              <label className="form-label">Current School / College / University</label>
              <input type="text" name="previousSchool" className="form-input" placeholder="Name of institution" />
            </div>

            <div className="form-group">
              <label className="form-label">Tutor Gender Preference</label>
              <select name="genderPreference" className="form-select">
                <option value="No Preference">No Preference (Male or Female)</option>
                <option value="Female Tutor">Female Tutor Required</option>
                <option value="Male Tutor">Male Tutor Required</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Additional Instructions or Timing Preference</label>
            <textarea 
              name="message" 
              className="form-textarea" 
              rows={3} 
              placeholder="e.g., Preferred timings: 4:00 PM to 6:00 PM. Needs extra help in Mathematics geometry."
            ></textarea>
          </div>
        </div>

        <div className={styles.consentSection}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" required className={styles.checkbox} />
            <span>I confirm that the information provided is accurate and request a free trial class from The Best Tutor team. *</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting Tutor Request...' : '🎓 Submit Request for Home Tutor'}
        </button>
      </form>
    </div>
  );
}
