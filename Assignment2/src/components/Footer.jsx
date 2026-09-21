export default function Footer({ recordCount }) {
  return (
    <footer className="portal-footer">
      <p>© {new Date().getFullYear()} Academic Records Division. Displaying {recordCount} enrolled students.</p>
    </footer>
  );
}