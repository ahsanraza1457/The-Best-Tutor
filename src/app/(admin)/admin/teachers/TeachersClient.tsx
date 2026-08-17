"use client";

import { useState } from "react";
import { saveTeacher, deleteTeacher } from "@/app/actions/admin";

export default function TeachersClient({ teachers }: { teachers: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenNew = () => {
    setEditingTeacher(null);
    setShowModal(true);
  };

  const handleEdit = (teacher: any) => {
    setEditingTeacher(teacher);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this home tutor profile?")) return;
    await deleteTeacher(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await saveTeacher(formData);
    setIsSubmitting(false);
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-color)' }}>Home Tutors Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage background-verified home and online tutors.</p>
        </div>
        <button onClick={handleOpenNew} className="btn btn-primary">
          ➕ Register New Tutor
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {teachers.map((t) => (
          <div key={t.id} className="card">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--emerald-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>
                {t.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--emerald-accent)', fontWeight: 600 }}>{t.qualification}</span>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '0.4rem', backgroundColor: 'var(--bg-slate)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div><strong>Subjects Taught:</strong> {t.subjects}</div>
              <div><strong>Experience:</strong> {t.experience}</div>
              <div><strong>Contact Phone:</strong> {t.phone}</div>
              <div><strong>Status:</strong> <span style={{ color: t.status === 'Active' ? '#059669' : '#ef4444', fontWeight: 700 }}>{t.status}</span></div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.bio}</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button onClick={() => handleEdit(t)} className="btn btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.85rem' }}>
                ✏️ Edit Profile
              </button>
              <button onClick={() => handleDelete(t.id)} className="btn btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.85rem', color: '#ef4444', borderColor: '#ef4444' }}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

        {teachers.length === 0 && (
          <div className="card text-center" style={{ gridColumn: '1 / -1', padding: '3rem' }}>
            <p>No tutors registered yet. Click "Register New Tutor" to add one.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editingTeacher ? "Edit Tutor Profile" : "Register New Home Tutor"}</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {editingTeacher && <input type="hidden" name="id" value={editingTeacher.id} />}

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name *</label>
                <input type="text" name="name" required className="form-input" defaultValue={editingTeacher?.name || ""} placeholder="e.g., Sir Usman Ghani" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Qualification *</label>
                  <input type="text" name="qualification" required className="form-input" defaultValue={editingTeacher?.qualification || "M.Sc Physics / B.Ed"} placeholder="e.g., M.Sc Physics" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Experience *</label>
                  <input type="text" name="experience" required className="form-input" defaultValue={editingTeacher?.experience || "5 Years"} placeholder="e.g., 5 Years" />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Subjects Taught *</label>
                <input type="text" name="subjects" required className="form-input" defaultValue={editingTeacher?.subjects || "Physics, Mathematics, Computer"} placeholder="e.g., Physics, Math, Chemistry" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" name="phone" required className="form-input" defaultValue={editingTeacher?.phone || "+92 311 1540040"} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Status</label>
                  <select name="status" className="form-select" defaultValue={editingTeacher?.status || "Active"}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Tutor Bio / Description</label>
                <textarea name="bio" className="form-textarea" rows={3} defaultValue={editingTeacher?.bio || "Experienced home tutor specializing in conceptual learning and board exam preparation."}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Tutor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
