"use client";

import { useState } from "react";
import { updateWebsiteSettings } from "@/app/actions/admin";

export default function SettingsClient({ settings }: { settings: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaved(false);
    const formData = new FormData(e.currentTarget);
    const res = await updateWebsiteSettings(formData);
    setIsSubmitting(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Website & Contact Settings</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Update academy phone numbers, WhatsApp, address, and city info.</p>

      {saved && (
        <div style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--emerald-accent)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--emerald-accent)', fontWeight: 600 }}>
          ✓ Website settings saved successfully!
        </div>
      )}

      <div className="card" style={{ padding: '2.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Main Helpline Phone Number *</label>
            <input type="tel" name="phone" required className="form-input" defaultValue={settings?.phone || "+92 311 1540040"} />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">WhatsApp Official Number *</label>
            <input type="tel" name="whatsapp" required className="form-input" defaultValue={settings?.whatsapp || "+92 311 1540040"} />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Official Contact Email *</label>
            <input type="email" name="email" required className="form-input" defaultValue={settings?.email || "info@thebesttutor.edu.pk"} />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Primary Service Locations / Cities</label>
            <input type="text" name="city" className="form-input" defaultValue={settings?.city || "Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad"} placeholder="e.g., Lahore, Karachi, Islamabad" />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Head Office Address</label>
            <textarea name="address" className="form-textarea" rows={3} defaultValue={settings?.address || "Serving All Major Cities Across Pakistan & Live Online Worldwide"}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem', marginTop: '1rem' }} disabled={isSubmitting}>
            {isSubmitting ? "Saving Settings..." : "⚙️ Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
