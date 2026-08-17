"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Classes & Subjects", path: "/timetable" },
    { name: "Tuition Packages", path: "/courses" },
    { name: "Request a Tutor", path: "/admissions" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={styles.headerWrapper}>
      {/* Top Contact Bar */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarContainer}`}>
          <div className={styles.topbarLeft}>
            <span className={styles.topbarTag}>⚡ Verified 1-on-1 Tutors</span>
            <span>Home & Online Tuition Services Across Pakistan (Class 1 to BS Level)</span>
          </div>
          <div className={styles.topbarRight}>
            <a href="tel:+923111540040" className={styles.topbarLink}>
              📞 <strong>+92 311 1540040</strong>
            </a>
            <a href="https://wa.me/923111540040?text=Hi!%20I%20need%20a%20Home%20Tutor." target="_blank" rel="noopener noreferrer" className={styles.topbarWhatsapp}>
              💬 <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/">
              <div className={styles.logoIcon}>TBT</div>
              <div className={styles.logoText}>
                <span className={styles.brandTitle}>The Best Tutor</span>
                <span className={styles.brandSubtitle}>Home & Online Tuition</span>
              </div>
            </Link>
          </div>

          {/* Navigation Bar */}
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className={`${styles.navLink} ${pathname === link.path ? styles.active : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <a 
              href="https://wa.me/923111540040?text=Hello,%20I%20would%20like%20to%20hire%20a%20home%20tutor." 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.whatsappPill}
              title="Chat on WhatsApp (+92 311 1540040)"
            >
              💬 WhatsApp
            </a>
            <Link href="/admissions" className={styles.primaryCtaBtn} onClick={() => setIsMenuOpen(false)}>
              🎓 Request Tutor
            </Link>

            <button 
              className={styles.hamburger} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
