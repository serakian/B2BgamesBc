import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './styling/Carousel.css';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        goToNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div 
      className="luxe-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Slide */}
      <div 
        className="luxe-slide"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      >
        <div className="luxe-slide-content">
          <h3 className="luxe-slide-title">{slides[currentIndex].title}</h3>
          <p className="luxe-slide-description">{slides[currentIndex].description}</p>
          <button className="luxe-slide-button">Learn More</button>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button className="luxe-arrow luxe-arrow-left" onClick={goToPrevious}>
        <FaChevronLeft />
      </button>
      <button className="luxe-arrow luxe-arrow-right" onClick={goToNext}>
        <FaChevronRight />
      </button>
      
      {/* Indicators */}
      <div className="luxe-indicators">
        {slides.map((slide, slideIndex) => (
          <button
            key={slideIndex}
            className={`luxe-indicator ${slideIndex === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;