import React, { useRef } from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1gi72yd",   
        "template_2o3gab4",  
        form.current,
        "jNHkN1hlDE2DTCwVn"   
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send, please try again!");
        }
      );
  };

  return (
    <div className="contact-page">
      {/* Left side */}
      <div className="contact-left">
        <div className="contact-left-overlay">
          <h2>Get In Touch</h2>
          <p>Be part of our ReadLoop community Reach out to us!</p>

          <div className="contact-info">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Our Address</h4>
                <p>123 Main Street, Tunis, Tunisia</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h4>Our Email</h4>
                <p>admin@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="contact-right">
        <h3>Contact Us</h3>
        <h2>Get In Touch With Us</h2>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="from_name" placeholder="Full Name" required />
          <input type="email" name="from_email" placeholder="Email Address" required />
          <input type="text" name="phone" placeholder="Phone No." />
          <textarea name="message" placeholder="Message" required></textarea>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
