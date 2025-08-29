import React from 'react'
import Navbarr from './Navbarr'

function Home() {
  return (
  <div className="parentHome">
      <div className="home">
        {/* Video */}
        <video autoPlay muted loop className="background-video">
          <source
            src="/vidéo.mp4"
            type="video/mp4"
          />
        </video>
        <Navbarr />
        <div className="hero">
          <div className="hero-content">
            <h1>No need to go to the library <br/>It comes to you!</h1>
          </div>
        </div>
      </div>


      <section>
        hello
      </section>
  </div>
  );
};


export default Home