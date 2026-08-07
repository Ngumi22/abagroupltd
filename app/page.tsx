const socialLinks = [
  { label: "Facebook", content: "f" },
  { label: "LinkedIn", content: "in" },
  { label: "Instagram", content: "◎" },
  { label: "Twitter", content: "♥" },
];

export default function Page() {
  return (
    <main className="coming-soon">
      <section className="announcement" aria-labelledby="coming-soon-title">
        <h1 id="coming-soon-title">
          Under
          <br />
          Construction
        </h1>
        <p className="eyebrow">Site Nearly Ready</p>
        <div
          className="progress-wrap"
          aria-label="Site nearly ready, 75 percent complete"
        >
          <div className="progress-bar">
            <span />
          </div>
          <div className="progress-labels">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
        <button className="notify-button" type="button">
          Notify Me!
        </button>
      </section>

      <footer className="page-footer">
        <nav className="social-links" aria-label="Social media links">
          {socialLinks.map(({ label, content }) => (
            <a key={label} href={`#${label.toLowerCase()}`} aria-label={label}>
              <span aria-hidden="true">{content}</span>
            </a>
          ))}
        </nav>
        <p>© 2026 by Aba Group Ltd.</p>
      </footer>
    </main>
  );
}
