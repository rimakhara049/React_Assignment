export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Rima<span>.dev</span></div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <a href="#contact" className="nav-btn">Get in Touch</a>
    </nav>
  );
}