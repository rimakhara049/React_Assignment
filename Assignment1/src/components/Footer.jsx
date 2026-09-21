export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Rima Khara. All rights reserved.</p>
        <p className="footer-subtext">Built with React & Modern CSS</p>
      </div>
    </footer>
  );
}