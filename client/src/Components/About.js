import React from 'react';
import { FaBook, FaHandshake, FaStar } from 'react-icons/fa';

function About() {
  return (
    <div className="about-container">
      {/* Title */}
      <h1 className="about-title">About us</h1>

      {/* Quote */}
      <p className="about-quote">
        "Sharing knowledge is the most fundamental act of friendship. Because it is a way you can give something without losing something." – Richard Bach
      </p>

      {/* About section: text + video */}
      <div className="about-content">
        <div className="about-text">
          <p>
            <strong>Welcome to our platform!</strong> <br/> We believe in the power of reading to inspire, educate, and connect people from 
            all walks of life. Here, you can explore, share, and discover new worlds through books. 
            Whether you're looking for your next adventure, a classic to revisit, or a hidden gem recommended by fellow 
            readers, our community makes it easy to find, borrow, and exchange books. Join us in spreading knowledge, fostering 
            friendships, and celebrating the joy of reading together!
          </p>
        </div>

        <div className="about-video">
          <video width="100%" autoPlay muted loop>
            <source src="/about1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="mission-container">
        <div className="mission-text">
          <h1>How do we achieve our mission and vision?</h1>
        </div>

        <div className="mission-points">
          <ul>
            <li>
              <strong>1.Providing 24/7 book access.</strong> <br/>Our Book Exchange platform allows users to explore, share, and borrow books anytime, anywhere. There are no limits—books are always accessible digitally or through our partner drop-off points.
            </li>
            <li>
              <strong>2.Encouraging community book-sharing.</strong><br/> Book Exchange empowers users to create local book-sharing spots and organize exchanges, connecting readers within neighborhoods and communities.
            </li>
            <li>
              <strong>3.Supporting underserved areas.</strong><br/> Through our programs, Book Exchange donates books and facilitates exchanges in schools, libraries, and communities with limited access to literature.
            </li>
            <li>
              <strong>4.Promoting diverse reading.</strong><br/> We provide books that celebrate diverse voices, including different cultures, languages, and perspectives, encouraging empathy, understanding, and inclusivity.
            </li>
            <li>
              <strong>5.Collaborating with community partners.</strong><br/> Book Exchange partners with schools, libraries, bookstores, and local organizations to expand the reach of book-sharing initiatives and make reading accessible to everyone.
            </li>
          </ul>
        </div>
      </div>

      {/* Be Part of the Journey Section */}
      <div className="journey-container">
        <h1 className="journey-title">Be Part of the Journey</h1>

        <div className="journey-boxes">
          <div className="journey-box">
            <FaBook size={40} />
            <h3>Impact on users</h3>
            <p>“By connecting readers and communities, we aim to foster a love of reading, encourage sharing, and make books accessible to everyone, everywhere.”</p>
          </div>
          <div className="journey-box">
            <FaHandshake size={40} />
            <h3>Join the community</h3>
            <p>“Join our community today and start sharing, reading, and making a difference in your neighborhood!”</p>
          </div>
          <div className="journey-box">
            <FaStar size={40} />
            <h3>Inspiring vision</h3>
            <p>“Together, we can create a world where books are never out of reach and knowledge is shared freely.”</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
