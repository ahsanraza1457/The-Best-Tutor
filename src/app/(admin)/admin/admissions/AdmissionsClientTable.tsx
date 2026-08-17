"use client";

import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import styles from "./admissionsTable.module.css";
import { updateAdmissionStatus, deleteAdmissionApplication } from "@/app/actions/admin";

export default function AdmissionsClientTable({ 
  initialData, 
  filters: filterOptions 
}: { 
  initialData: any[],
  filters: { uniqueClasses: any[], uniqueCourses: any[], uniqueCities: any[] }
}) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter Data
  const filteredData = useMemo(() => {
    return data.filter(app => {
      const matchSearch = 
        app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm) ||
        app.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.subjects && app.subjects.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchClass = filterClass ? app.class === filterClass : true;
      const matchMode = filterMode ? app.tuitionMode === filterMode : true;
      const matchStatus = filterStatus ? app.status === filterStatus : true;
      const matchCity = filterCity ? app.city === filterCity : true;

      return matchSearch && matchClass && matchMode && matchStatus && matchCity;
    });
  }, [data, searchTerm, filterClass, filterMode, filterStatus, filterCity]);

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredData.map(app => ({
      "Ref No": app.referenceNumber,
      "Date": new Date(app.createdAt).toLocaleDateString(),
      "Student Name": app.studentName,
      "Father Name": app.fatherName,
      "Class Level": app.class,
      "Subjects Required": app.subjects || "All Subjects",
      "Tuition Mode": app.tuitionMode || "Home Tuition",
      "City": app.city,
      "Area": app.area,
      "Phone": app.phone,
      "WhatsApp": app.whatsapp,
      "Email": app.email,
      "Current Institution": app.previousSchool || "N/A",
      "Message / Details": app.message || "N/A",
      "Status": app.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tutor_Requests");
    XLSX.writeFile(wb, `Tutor_Requests_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Export to CSV
  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Tutor_Requests_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setData(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    
    await updateAdmissionStatus(id, newStatus);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tutor request?")) return;
    setIsDeleting(true);
    setData(prev => prev.filter(app => app.id !== id));
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(null);
    }
    await deleteAdmissionApplication(id);
    setIsDeleting(false);
  };

  return (
    <div className={styles.container}>
      {/* Filters & Actions */}
      <div className={styles.controlsSection}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search by Name, Ref #, Phone, Area, Subjects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
          />
        </div>
        
        <div className={styles.filtersWrapper}>
          <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className={styles.select}>
            <option value="">All Class Levels</option>
            {filterOptions.uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          
          <select value={filterMode} onChange={e => setFilterMode(e.target.value)} className={styles.select}>
            <option value="">All Tuition Modes</option>
            <option value="Home Tuition">Home Tuition</option>
            <option value="Online Tuition">Online Tuition</option>
            <option value="Both (Home or Online)">Both Options</option>
          </select>

          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className={styles.select}>
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Approved">Approved / Assigned</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className={styles.select}>
            <option value="">All Cities</option>
            {filterOptions.uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.actionsWrapper}>
          <button onClick={exportToCSV} className={`${styles.btn} ${styles.btnOutline}`}>Export CSV</button>
          <button onClick={exportToExcel} className={`${styles.btn} ${styles.btnPrimary}`}>Export Excel</button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Ref No</th>
                <th>Date</th>
                <th>Student Name</th>
                <th>Class Level</th>
                <th>Subjects Required</th>
                <th>Mode</th>
                <th>City / Area</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(app => (
                <tr key={app.id} onClick={() => setSelectedApp(app)} className={styles.clickableRow}>
                  <td><strong>{app.referenceNumber}</strong></td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <strong>{app.studentName}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Father: {app.fatherName}</div>
                  </td>
                  <td><span className={styles.classBadge}>{app.class}</span></td>
                  <td style={{ maxWidth: '200px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                      {app.subjects || "All Subjects"}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: app.tuitionMode === 'Online Tuition' ? '#2563eb' : '#059669' }}>
                      {app.tuitionMode || "Home Tuition"}
                    </span>
                  </td>
                  <td>{app.city} ({app.area})</td>
                  <td>
                    <a href={`tel:${app.phone}`} onClick={e => e.stopPropagation()} style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      📞 {app.phone}
                    </a>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles['status' + app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <select 
                      value={app.status} 
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={styles.statusSelect}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#ef4444' }}
                      title="Delete Request"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center" style={{ padding: '2.5rem' }}>No tutor requests found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className={styles.modalOverlay} onClick={() => setSelectedApp(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className={styles.modalHeader}>
              <h2>Tutor Request Details</h2>
              <button className={styles.closeModal} onClick={() => setSelectedApp(null)}>✕</button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailSection}>
                  <h3>Student & Class Info</h3>
                  <div className={styles.detailRow}><span>Ref No:</span> <strong>{selectedApp.referenceNumber}</strong></div>
                  <div className={styles.detailRow}><span>Date:</span> <strong>{new Date(selectedApp.createdAt).toLocaleString()}</strong></div>
                  <div className={styles.detailRow}><span>Student Name:</span> <strong>{selectedApp.studentName}</strong></div>
                  <div className={styles.detailRow}><span>Father's Name:</span> <strong>{selectedApp.fatherName}</strong></div>
                  <div className={styles.detailRow}><span>Class Level:</span> <strong>{selectedApp.class}</strong></div>
                  <div className={styles.detailRow}><span>Tuition Mode:</span> <strong>{selectedApp.tuitionMode || "Home Tuition"}</strong></div>
                  <div className={styles.detailRow}><span>Institution:</span> <strong>{selectedApp.previousSchool || "N/A"}</strong></div>
                </div>
                
                <div className={styles.detailSection}>
                  <h3>Contact Details</h3>
                  <div className={styles.detailRow}><span>City:</span> <strong>{selectedApp.city}</strong></div>
                  <div className={styles.detailRow}><span>Area / Location:</span> <strong>{selectedApp.area}</strong></div>
                  <div className={styles.detailRow}><span>Phone:</span> <strong><a href={`tel:${selectedApp.phone}`}>📞 {selectedApp.phone}</a></strong></div>
                  <div className={styles.detailRow}><span>WhatsApp:</span> <strong><a href={`https://wa.me/${selectedApp.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366' }}>💬 {selectedApp.whatsapp}</a></strong></div>
                  <div className={styles.detailRow}><span>Email:</span> <strong>{selectedApp.email}</strong></div>
                </div>
              </div>

              <div style={{ margin: '1.25rem 0', backgroundColor: 'var(--bg-slate)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Subjects Required:</h4>
                <p style={{ fontWeight: 700, color: 'var(--emerald-accent)' }}>{selectedApp.subjects || "All General Subjects"}</p>
              </div>

              {selectedApp.message && (
                <div className={styles.detailMessage}>
                  <h3>Parent / Student Notes</h3>
                  <p>{selectedApp.message}</p>
                </div>
              )}

              <div className={styles.modalActions} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <label style={{ fontWeight: 600, marginRight: '0.75rem' }}>Update Status:</label>
                  <select 
                    value={selectedApp.status} 
                    onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                    className={styles.select}
                    style={{ width: '180px' }}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Approved">Approved / Assigned</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <button 
                  onClick={() => handleDelete(selectedApp.id)}
                  className="btn btn-outline" 
                  style={{ color: '#ef4444', borderColor: '#ef4444' }}
                >
                  🗑️ Delete Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
