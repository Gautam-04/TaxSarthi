import React from "react";
import "./AboutTaxes.css";
// import testimg from "../../../assets/blog-images/Tax8.jpg";

function AboutTaxes() {
  return (
    <section className="blog-container">
      <div className="blog-header">
        <div className="blog-author">
          <div className="blog-author-profile">
            <img
              src="https://imgflip.com/s/meme/Cute-Cat.jpg"
              alt="goofy aah cat"
            />
          </div>
          <div className="blog-author-name">ChinmayDesai</div>
        </div>
        <div className="blog-date">12 July, 2023</div>
      </div>
      <hr />
      <div className="blog-title">About Taxes</div>
      <hr />
      <div className="blog-content">
        <div className="content-heading">What are taxes ?</div>
        <div className="content-paragraph">
          Taxes are financial charges imposed by the government on individuals,
          businesses, and other entities to raise revenue for funding public
          services, infrastructure development, and various government
          functions. Taxes are a crucial part of a country's economic system and
          are used to redistribute wealth, regulate economic activity, and
          achieve social and economic goals. Here's a detailed explanation of
          taxes:
        </div>
        <div className="content-subheading">1. Purpose of Taxes:</div>
        <div className="content-paragraph">
          Revenue Generation: The primary purpose of taxes is to generate
          revenue for the government. This revenue is used to finance government
          programs, public services (such as education, healthcare, and
          defense), and infrastructure development (like roads, bridges, and
          public transportation). Redistribution of Wealth: Taxes can be
          progressive, meaning that individuals with higher incomes pay a larger
          percentage of their income in taxes. This helps redistribute wealth
          from the affluent to the less affluent and can address income
          inequality. Economic Stabilization: Taxes can be used as a tool for
          economic stabilization. During economic downturns, governments may cut
          taxes or increase public spending to stimulate economic growth.
          Conversely, they may raise taxes during periods of inflation to
          control excessive spending. Regulation: Taxes can influence economic
          behavior. For example, taxes on cigarettes and alcohol can discourage
          consumption, while tax incentives for green energy can encourage
          environmentally friendly practices.
        </div>
        <div className="content-image">
          <img
            src="https://images.unsplash.com/photo-1682686580003-22d3d65399a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
            alt=""
          />
          <div className="image-caption">
            Nabataean Necropolis of Magha’ir Shu‘aib – NEOM, Saudi Arabia | This
            impressive site features around 30 Nabatean monumental tombs carved
            into the sheer rocky cliff.
          </div>
        </div>
        <div className="content-paragraph">
          I went through Mrs Shears’ gate, closing it behind me. I walked onto
          her lawn and knelt beside the dog. I put my hand on the muzzle of the
          dog. It was still warm. The dog was called Wellington. It belonged to
          Mrs Shears who was our friend. She lived on the opposite side of the
          road, two houses to the left. Wellington was a poodle. Not one of the
          small poodles that have hairstyles but a big poodle. It had curly
          black fur, but when you got close you could see that the skin
          underneath the fur was a very pale yellow, like chicken. I stroked
          Wellington and wondered who had killed him, and why. 3 My name is
          Christopher John Francis Boone. I know all the countries of the world
          and their capital cities and every prime number up to 7,057. Eight
          years ago, when I first met Siobhan, she showed me this picture [sad
          face] and I knew that it meant ‘sad,’ which is what I felt when I
          found the dead dog. Then she showed me this picture [smiley face] and
          I knew that it meant ‘happy’, like when I’m reading about the Apollo
          space missions, or when I am still awake at 3 am or 4 am in the
          morning and I can walk up and down the street and pretend that I am
          the only person in the whole world.
        </div>
        <div className="content-image">
          {/* <img src={testimg} alt="" /> */}
          <div className="image-caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae totam,
            hic nulla minima autem eius et ducimus enim cum necessitatibus error
            dicta fuga inventore perspiciatis nemo magni vitae, voluptatum esse.
          </div>
        </div>
        <div className="content-heading">THis is a heading</div>
      </div>
      <hr />
      <div className="blog-footer">
        <div className="blog-author">
          <div className="blog-author-profile">
            <img
              src="https://imgflip.com/s/meme/Cute-Cat.jpg"
              alt="goofy aah cat"
            />
          </div>
          <div className="blog-author-name">ChinmayDesai</div>
        </div>
        <div className="next-button">
          <button>Next</button>
        </div>
      </div>
    </section>
  );
}

export default AboutTaxes;
