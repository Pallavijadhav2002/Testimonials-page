import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "../styles/TestimonialSlider.css";

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data from db.json
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setTestimonials(data.testimonials);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, testimonials]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Function to display star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      if (index < rating) {
        return <FaStar key={index} className="star" />;
      } else {
        return <FaRegStar key={index} className="star empty" />;
      }
    });
  };

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <div className="testimonial-container">
      <button className="prev" onClick={prevSlide}>&#10094;</button>

      <div className="testimonial-card">
        <img
          src={testimonials[currentIndex].image}
          alt={testimonials[currentIndex].name}
        />
        <h3>{testimonials[currentIndex].name}</h3>
        <p>{testimonials[currentIndex].feedback}</p>
        <div className="stars">
          {renderStars(testimonials[currentIndex].rating)}
        </div>
      </div>

      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default TestimonialSlider;
