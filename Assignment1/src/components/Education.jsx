export default function Education() {
  const educationData = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Techno India Group / University",
      period: "2023 — 2027",
      details: "Focus on Data Structures, Web Development, DBMS, and Object-Oriented Programming."
    },
    {
      degree: "Higher Secondary (10+2)",
      institution: "Science Stream",
      period: "Completed",
      details: "Major coursework in Mathematics, Physics, and Computer Science."
    }
  ];

  return (
    <section id="education" className="section-container">
      <div className="section-header">
        <p className="section-tag">Background</p>
        <h2>Education</h2>
      </div>
      <div className="grid-list">
        {educationData.map((item, index) => (
          <div key={index} className="card education-card">
            <span className="period-pill">{item.period}</span>
            <h3>{item.degree}</h3>
            <h4>{item.institution}</h4>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}