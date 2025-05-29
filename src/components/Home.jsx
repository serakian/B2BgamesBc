import React, { useState, useEffect } from 'react';
import Footer from "./Footer";
import Carousel from "./Carousel";
import './styling/home.css';


const GamingHome = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [username, setUsername] = useState('Player');

  const slides = [
    {
      title: "NEW RELEASES",
      desc: "Discover the hottest games this season",
      bg: "url('https://via.placeholder.com/1920x1080/222/ff0000')"
    },
    {
      title: "TOURNAMENTS",
      desc: "Join competitive events with huge prizes",
      bg: "url('public/images/gaming-pictures-j9vcj2frv3ms9ais.webp')"
    },
    {
      title: "EXCLUSIVE CONTENT",
      desc: "Unlock special items and early access",
      bg: "url('https://via.placeholder.com/1920x1080/222/ff0000')"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { user: username, text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="game-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>WELCOME, <span className="highlight">{username}</span></h1>
          <p>Ready for today's gaming adventure?</p>
          <div className="stats">
            <div className="stat-box">
              <span className="stat-number">24</span>
              <span className="stat-label">Online Friends</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">5</span>
              <span className="stat-label">New Messages</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">3</span>
              <span className="stat-label">Active Parties</span>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`slide ${index === activeSlide ? 'active' : ''}`}
              style={{ backgroundImage:  slide.bg }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.desc}</p>
                <button className="carousel-btn">Learn More</button>
              </div>
            </div>
          ))}
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="chat-section">
        <div className="chat-container">
          <div className="chat-header">
            <h3>COMMUNITY CHAT</h3>
            <span className="online-count">42 Online</span>
          </div>
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="empty-chat">No messages yet. Say hello!</div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="message">
                  <span className="message-user">{msg.user}:</span>
                  <span className="message-text">{msg.text}</span>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">SEND</button>
          </form>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default GamingHome;