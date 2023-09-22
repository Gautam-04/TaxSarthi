import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/mis/Carousel/Carousel";
import Marquee from 'react-fast-marquee'
import FaqSec from "../../components/mis/FaqSec";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section id="home" style={{ margin: "0" }}>
        <div className="main">
          <div className="front">
            <hi className="front-title">TaxSarthi</hi>
            <p className="subtitle">Your One Stop Tax Solution</p>
            <button
              className="product"
              onClick={() => {
                navigate("/login");
              }}
            >
              Try Our Product
            </button>
          </div>
        </div>
      </section>
      <div className="home-div">
        <section id="home-tutorial">
          <p class="home-tutorial-text">
            Watch this short tutorial to learn how to use TaxSarthi
          </p>
          <iframe
            class="home-tutorial-embed"
            src="https://www.youtube.com/embed/GRq_tC7qbaE?si=t22-L-jLYQn4QUdm"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </section>
        <section id="home-stats">
          <div class="stats-title">Loved by over 1 million tax payers</div>
          <div className="main-stats">
          <div className="stats-group">
            <div class="stats-amount">₹20 Cr+</div>
            <div class="stats-heading">assets managed</div>
          </div>
          <div className="stats-group">
            <div class="stats-amount">₹50 Cr+</div>
            <div class="stats-heading">worth taxes filed</div>
          </div>
          <div className="stats-group">
            <div class="stats-amount">₹30 Cr+</div>
            <div class="stats-heading">worth taxes saved</div>
          </div>
          </div>
        </section>
        <section id="carousel">
        <Marquee speed={25} pauseOnClick={true} gradient gradientWidth={50} delay={30}>
          <Carousel />
        </Marquee>
        </section>
        <section className="faq">
          <FaqSec />
        </section>
      </div>
    </>
  );
}

export default Home;
