import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <section id="home">
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
        <div class="stats-title">TaxSarthi's Statistics</div>
        <div className="stats-group">
          <div class="stats-heading">Clients Satisfied: </div>
          <div class="stats-amount">200 +</div>
        </div>
        <div className="stats-group">
          <div class="stats-heading">Tax Savings Acheived: </div>
          <div class="stats-amount">$500 +</div>
        </div>
        <div className="stats-group">
          <div class="stats-heading">Success Rate: </div>
          <div class="stats-amount">100%</div>
        </div>
      </section>
      <section id="carousel">
        <Carousel>
          <Carousel.Item>
            {/* <ExampleCarouselImage text="First slide" /> */}
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1694618237208-728651429710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {/* <ExampleCarouselImage text="Second slide" /> */}
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1682685794761-c8e7b2347702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {/* <ExampleCarouselImage text="Third slide" /> */}
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1682685797088-283404e24b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  );
}

export default Home;
