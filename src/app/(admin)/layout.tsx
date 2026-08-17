"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./adminLayout.module.css";
import { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("tbt_admin_logged_in");
      if (auth === "true" || pathname === "/admin/login") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === false) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Redirecting to login...</h2>
      </div>
    );
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tbt_admin_logged_in");
    }
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Admissions", path: "/admin/admissions", icon: "📝" },
    { name: "Tuition Packages", path: "/admin/courses", icon: "📚" },
    { name: "Timetable & Slots", path: "/admin/timetable", icon: "📅" },
    { name: "Home Tutors", path: "/admin/teachers", icon: "👨‍🏫" },
    { name: "Site Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>TBT Admin</h2>
          <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.navItem} target="_blank">
            <span className={styles.navIcon}>🌐</span>
            View Website
          </Link>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className={styles.navIcon}>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <div className={styles.topbarRight}>
            <div className={styles.adminUser}>
              <div className={styles.avatar}>A</div>
              <span>Admin Manager</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}
