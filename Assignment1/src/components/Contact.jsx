export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been recorded.");
  };

  return (
    <section id="contact" className="section-container">
      <div className="section-header">
        <p className="section-tag">Connect</p>
        <h2>Contact Information</h2>
      </div>
      <div className="contact-wrapper">
        <div className="card contact-info">
          <h3>Get in Touch</h3>
          <p>Feel free to reach out for collaborations, project opportunities, or general queries.</p>
          <div className="info-item">
            <span>Location:</span> West Bengal, India
          </div>
          <div className="info-item">
            <span>Status:</span> Open to Opportunities
          </div>
        </div>
        <form className="card contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your.email@example.com" required />
          </div>
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" placeholder="How can I help you?" required></textarea>
          </div>
          <button type="submit" className="btn primary-btn submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
}