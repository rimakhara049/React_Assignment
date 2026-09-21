export default function Skills() {
  const skillCategories = [
    { title: "Frontend", list: ["React.js", "JavaScript (ES6+)", "HTML5 / CSS3", "Responsive Design"] },
    { title: "Tools & Libraries", list: ["Git / GitHub", "Vite", "REST APIs", "npm"] },
    { title: "Core Concepts", list: ["Component Lifecycle", "State Management", "Hooks", "UI Architecture"] }
  ];

  return (
    <section id="skills" className="section-container">
      <div className="section-header">
        <p className="section-tag">Capabilities</p>
        <h2>Technical Skills</h2>
      </div>
      <div className="grid-list">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="card skill-card">
            <h3>{cat.title}</h3>
            <ul className="skill-pills">
              {cat.list.map((skill, sIdx) => (
                <li key={sIdx}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}