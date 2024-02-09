import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

function Card(props) {
  const { title, body, useNavigateTo } = props;
  const navigate = useNavigate();
  const truncatedBody = truncateText(body, 100);

  const handleButtonClick = () => {
    if (useNavigateTo) {
      navigate(useNavigateTo);
    } else {
      // Handle button click logic without navigation
      console.log("Button clicked without navigation");
    }
  };

  return (
    <Card style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <Card.Body>
        <Card.Title style={{ fontSize: "3rem" }}>{title}</Card.Title>
        <Card.Text style={{ color: "blue", fontSize: "1.14rem" }}>
          {truncatedBody}
        </Card.Text>
        <button
          onClick={handleButtonClick}
          style={{
            padding: "0 30px",
            width: "auto",
            height: "50px",
            borderRadius: "30px",
            fontWeight: "600",
            fontSize: "1.15rem",
            backgroundColor: "rgb(54, 255, 88)",
            color: "black",
            transition: "background-color 0.2s ease-in-out",
          }}
        >
          Read More
        </button>
      </Card.Body>
    </Card>
  );
}

export default Card;
