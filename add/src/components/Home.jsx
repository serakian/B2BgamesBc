import React from 'react';
import './styling/home.css';

const LuxeGaming = () => {
  return (
    <div className="luxe-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="luxe-logo">LUXE GAMING</h1>
          <p className="luxe-tagline">Where elite gaming meets unparalleled performance</p>
          <button className="cta-button">ENTER THE ARENA</button>
        </div>
        
        <div className="scrolling-arrow">
          <div className="arrow"></div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="featured-section">
        <h2 className="section-title">PREMIUM SELECTIONS</h2>
        <div className="game-cards">
          <div className="game-card">
            <div className="game-image" style={{ backgroundImage: 'url(public/images/black and white.webp/300*400)' }}></div>
            <h3 className="game-title">NIGHTFALL LEGENDS</h3>
          </div>
          <div className="game-card">
            <div className="game-image" style={{ backgroundImage: 'url(https://via.placeholder.com/300x400)' }}></div>
            <h3 className="game-title">CRIMSON EMPIRE</h3>
          </div>
          <div className="game-card">
            <div className="game-image" style={{ backgroundImage: 'url(https://via.placeholder.com/300x400)' }}></div>
            <h3 className="game-title">VOID CHAMPIONS</h3>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="membership-section">
        <div className="membership-content">
          <h2 className="section-title">JOIN THE ELITE</h2>
          <p className="membership-text">Unlock exclusive content, early access, and premium rewards with Luxe Membership</p>
          <button className="cta-button cta-red">UPGRADE NOW</button>
        </div>
      </section>
    </div>
  );
};

export default LuxeGaming;