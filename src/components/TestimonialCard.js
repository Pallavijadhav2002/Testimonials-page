import { FaStar, FaRegStar } from "react-icons/fa";

const TestimonialCard = ({ image, name, feedback, rating }) => {
  const renderStars = () => {
    return [...Array(5)].map((_, i) =>
      i < rating ? <FaStar key={i} className="star" /> : <FaRegStar key={i} className="star empty" />
    );
  };

  return (
    <div className="testimonial-card">
      <img src={image} alt={name} className="testimonial-img" />
      <h3>{name}</h3>
      <p>{feedback}</p>
      <div className="stars">{renderStars()}</div>
    </div>
  );
};

export default TestimonialCard;
