"use client";

import { useState } from "react";
import { saveTimetable, deleteTimetable } from "@/app/actions/admin";

export default function TimetableClient({ timetables, teachers }: { timetables: any[]; teachers: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenNew = () => {
    setEditingSlot(null);
    setShowModal(true);
  };

  const handleEdit = (slot: any) => {
    setEditingSlot(slot);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this schedule slot?")) return;
    await deleteTimetable(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await saveTimetable(formData);
    setIsSubmitting(false);
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-color)' }}>Tuition Schedule & Time Slots</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage weekly tuition time slots for Class 1 to BS Level.</p>
        </div>
        <button onClick={handleOpenNew} className="btn btn-primary">
          ➕ Add Time Slot
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-slate)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem' }}>Day</th>
                <th style={{ padding: '1rem' }}>Time Slot</th>
                <th style={{ padding: '1rem' }}>Class Level</th>
                <th style={{ padding: '1rem' }}>Subject</th>
                <th style={{ padding: '1rem' }}>Tutor Assigned</th>
                <th style={{ padding: '1rem' }}>Mode / Room</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timetables.map((slot) => (
                <tr key={slot.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>{slot.day}</td>
                  <td style={{ padding: '1rem' }}>{slot.startTime} - {slot.endTime}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--emerald-accent)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>
                      {slot.class}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary-color)' }}>{slot.subject}</td>
                  <td style={{ padding: '1rem' }}>{slot.teacher?.name || "TBA"}</td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{slot.room || "Home / Online"}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEdit(slot)} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(slot.id)} className="btn btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {timetables.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center" style={{ padding: '3rem' }}>No time slots created yet. Click "Add Time Slot" to create one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editingSlot ? "Edit Schedule Slot" : "Add Schedule Slot"}</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {editingSlot && <input type="hidden" name="id" value={editingSlot.id} />}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Day *</label>
                  <select name="day" required className="form-select" defaultValue={editingSlot?.day || "Monday"}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Class Level *</label>
                  <input type="text" name="class" required className="form-input" defaultValue={editingSlot?.class || "Class 9"} placeholder="e.g., Class 9, BS CS" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Start Time *</label>
                  <input type="text" name="startTime" required className="form-input" defaultValue={editingSlot?.startTime || "4:00 PM"} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">End Time *</label>
                  <input type="text" name="endTime" required className="form-input" defaultValue={editingSlot?.endTime || "6:00 PM"} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Subject *</label>
                <input type="text" name="subject" required className="form-input" defaultValue={editingSlot?.subject || "Physics"} placeholder="e.g., Mathematics, Physics" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Tuition Mode / Location</label>
                  <input type="text" name="room" className="form-input" defaultValue={editingSlot?.room || "Home Tuition"} placeholder="Home Tuition or Online" />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Assigned Tutor</label>
                  <select name="teacherId" className="form-select" defaultValue={editingSlot?.teacherId || ""}>
                    <option value="">Unassigned</option>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Slot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
