import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function BlogCard({ title, body, useNavigateTo }) {
  const navigate = useNavigate();
  const truncatedBody = truncateText(body, 100);

  const handleButtonClick = () => {
    if (useNavigateTo) {
      navigate(useNavigateTo);
    } else {
      console.log("Button clicked without navigation");
    }
  };

  return (
    <Card className="card">
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-text">{truncatedBody}</Card.Text>
        <button onClick={handleButtonClick} className="card-button">
          Read More
        </button>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
