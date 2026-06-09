import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>
        © 2025 KT Book Works. All rights reserved.
      </span>
      <span className={styles.links}>
        <a href="#">Privacy Policy</a>
        <span aria-hidden="true"> · </span>
        <a href="#">Terms of Use</a>
      </span>
    </footer>
  )
}
