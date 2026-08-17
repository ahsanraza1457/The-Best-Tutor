"use client";

import { useState } from "react";
import { saveCourse, deleteCourse } from "@/app/actions/admin";

export default function CoursesClient({ courses, teachers }: { courses: any[]; teachers: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenNew = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tuition package?")) return;
    await deleteCourse(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await saveCourse(formData);
    setIsSubmitting(false);
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-color)' }}>Tuition Packages & Courses</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage monthly home tuition packages and course offerings.</p>
        </div>
        <button onClick={handleOpenNew} className="btn btn-primary">
          ➕ Add New Tuition Package
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {courses.map((course) => (
          <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--emerald-accent)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                  {course.class}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                  ${course.fee}/mo
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{course.description}</p>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '0.3rem', backgroundColor: 'var(--bg-slate)', padding: '0.75rem', borderRadius: '8px' }}>
                <div><strong>Subjects:</strong> {course.subjects}</div>
                <div><strong>Duration:</strong> {course.duration} ({course.days})</div>
                <div><strong>Timing:</strong> {course.startTime} - {course.endTime}</div>
                <div><strong>Assigned Tutor:</strong> {course.teacher?.name || "Unassigned"}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button onClick={() => handleEdit(course)} className="btn btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.85rem' }}>
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(course.id)} className="btn btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.85rem', color: '#ef4444', borderColor: '#ef4444' }}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="card text-center" style={{ gridColumn: '1 / -1', padding: '3rem' }}>
            <p>No tuition packages found. Click "Add New Tuition Package" to create one.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editingCourse ? "Edit Package" : "Create New Tuition Package"}</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {editingCourse && <input type="hidden" name="id" value={editingCourse.id} />}

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Package / Course Name *</label>
                <input type="text" name="name" required className="form-input" defaultValue={editingCourse?.name || ""} placeholder="e.g., Class 9 Matric Science Package" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Class Level *</label>
                  <input type="text" name="class" required className="form-input" defaultValue={editingCourse?.class || "Class 9"} placeholder="e.g., Class 9" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Monthly Fee (PKR/USD) *</label>
                  <input type="number" name="fee" required className="form-input" defaultValue={editingCourse?.fee || 5000} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Subjects Included *</label>
                <input type="text" name="subjects" required className="form-input" defaultValue={editingCourse?.subjects || "Math, Physics, Chemistry, Biology"} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Duration *</label>
                  <input type="text" name="duration" required className="form-input" defaultValue={editingCourse?.duration || "1 Month"} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Days per Week *</label>
                  <input type="text" name="days" required className="form-input" defaultValue={editingCourse?.days || "Mon-Fri"} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Start Time</label>
                  <input type="text" name="startTime" className="form-input" defaultValue={editingCourse?.startTime || "4:00 PM"} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">End Time</label>
                  <input type="text" name="endTime" className="form-input" defaultValue={editingCourse?.endTime || "6:00 PM"} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description</label>
                <textarea name="description" className="form-textarea" rows={3} defaultValue={editingCourse?.description || ""}></textarea>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Assigned Tutor</label>
                <select name="teacherId" className="form-select" defaultValue={editingCourse?.teacherId || ""}>
                  <option value="">Unassigned</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.qualification})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
