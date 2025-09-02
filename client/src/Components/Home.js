import React from 'react';
import Navbarr from './Navbarr';
import background from '../assets/about.png';
import { FaSmile } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="parentHome">
      <div className="home">
        {/* Video */}
        <video autoPlay muted loop className="background-video">
          <source src="/vidéo.mp4" type="video/mp4" />
        </video>
        <Navbarr />
        <div className="hero">
          <div className="hero-content">
            <h1>No need to go to the library <br />It comes to you!</h1>
          </div>
        </div>
      </div>

      {/* BookCrossing Section */}
      <section
        className="bookcrossing-section"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="description">
          <h1>ReadLoop, what is it ?</h1>
          <div className="quotes-container">
            <div className="quote">
              <p className="quote-text">Books have the power to connect strangers across the world.</p>
              <p className="quote-author">- BookExchange Community</p>
            </div>
            <div className="quote">
              <p className="quote-text">Every book book you share is a journey someone else else can take.</p>
              <p className="quote-author">- Anonymous</p>
            </div>
            <div className="quote">
              <p className="quote-text">A shared book is a shared story, a shared adventure, a shared life.</p>
              <p className="quote-author">- BookLovers United</p>
            </div>
          </div>
          <p>
            ReadLoop is a platform where book lovers can exchange books seamlessly and keep track of their reading journey. 
            Users can share their books with others, receive new ones, and follow their progress through reviews and comments. 
            Our community of passionate readers connects, shares knowledge, and spreads the joy of reading, one book at a time.
            <br/>Join us and be part of the loop!
          </p>
          <div className="buttons">
            <Link to="/about">
              <button>About Us</button>
            </Link>
            <Link to="/register">
              <button> Sign up <FaSmile style={{ marginLeft: '5px' }} /> </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
