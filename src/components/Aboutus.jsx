import React from 'react';
import './styling/abouus.css';

const Aboutus = () => {
  return (
    <div className="rootabout">
      <header className="about-header">
        <h1>About <span>Luxe Gaming</span></h1>
        <p>Where elite gaming meets unparalleled luxury. We redefine what it means to be a gamer.</p>
      </header>

      <div className="about-container">
        <section className="about-section">
          <div className="about-image" style={{ backgroundImage: "url('gaming-setup.jpg')" }}></div>
          <div className="about-content">
            <h2>Our Vision</h2>
            <p>Founded in 2025, Luxe Gaming emerged from a simple idea: gaming should be an experience that transcends ordinary entertainment. We envisioned a world where cutting-edge technology meets sophisticated design, creating environments that inspire both competitive spirit and refined taste.</p>
            <p>Our founders, elite gamers and tech enthusiasts, recognized the gap in the market for premium gaming experiences that don't compromise on either performance or aesthetics.</p>
          </div>
        </section>

        <section className="about-section">
          <div className="about-image" style={{ backgroundImage: "url('esports-arena.jpg')" }}></div>
          <div className="about-content">
            <h2>What We Do</h2>
            <p>Luxe Gaming specializes in curating the ultimate gaming experiences. From our state-of-the-art gaming lounges to our exclusive esports tournaments, we bring together the best hardware, software, and competitive environments.</p>
            <p>We design and manufacture limited edition gaming peripherals that combine tournament-grade performance with museum-quality craftsmanship. Each piece is tested by professional gamers and refined for perfection.</p>
          </div>
        </section>
      </div>

      <section className="team-section">
        <h2>Meet The Team</h2>
        <p className="subtitle">The brilliant minds behind Luxe Gaming's success</p>
        
        <div className="team-grid">
          <div className="team-member">
            <div className="team-member-img" style={{ backgroundImage: "url('team1.jpg')" }}></div>
            <div className="team-member-info">
              <h3>Sera Tusiga</h3>
              <p className="role">CEO & Founder</p>
              <p>Former esports champion turned entrepreneur</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Tournaments Hosted</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to <span>Elevate</span> Your Gaming?</h2>
        <p>Join the Luxe Gaming community today and experience gaming like never before. Whether you're a competitive player or a connoisseur of fine tech, we have something extraordinary for you.</p>
        <a href="#" className="cta-button pulse-effect">Join Now</a>
      </section>

      {/* <div className="about-containerabout">
        <h1>About Us</h1>
        <p>
          At <strong>Dark Pixel Games</strong>, we live and breathe gaming. Founded by a crew of passionate developers and dreamers,
          our mission is to craft immersive digital worlds where players can escape, explore, and conquer.
        </p>
        <p>
          Whether it's crafting high-octane action or building atmospheric RPGs, our goal is the same: deliver unforgettable experiences.
          From indie passion projects to bold multiplayer adventures, we design with players at the core.
        </p>
        <p className="highlight">
          We don't just play the game—we change it.
        </p>
      </div> */}
    </div>
  );
};

export default Aboutus;