export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="badge">Welcome to my space</span>
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Rima Khara</span>
        </h1>
        <p className="hero-subtitle">
          Frontend Developer & Computer Applications Enthusiast building clean, modern web experiences.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn primary-btn">Contact Me</a>
          <a href="#skills" className="btn secondary-btn">View Skills</a>
        </div>
      </div>
    </section>
  );
}