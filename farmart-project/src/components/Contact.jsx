import React from 'react';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className='contactpage'>
      <h1>Contact us</h1>
      <p>Got a question? Send us a message. We would love to hear from you and we will respond as soon as possible.</p>

      {/* Map and Form side-by-side */}
      <div className="contact-container">
        <div className='google-maps'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7903518826697!2d36.78452607543875!3d-1.3006495356429433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109b8af13d0b%3A0xbdeb9a77aa4d971d!2sPrestige%20Plaza%20Shopping%20Mall!5e0!3m2!1sen!2ske!4v1745070692058!5m2!1sen!2ske"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className='contactform'>
          <h2>Drop Us a Message</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type='text' placeholder='Enter your name' />
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter your email address' />
            <label htmlFor="message">Message</label>
            <textarea name="message" placeholder='Your message here...'></textarea>
            <button type="submit">Submit <FontAwesomeIcon icon={faArrowRight} /></button>
          </form>
        </div>
      </div>

      {/* Contact Info */}
      <div className='contactinfo'>
        <h2>Get in Touch</h2>
        <p>Feel free to contact us through any of the methods below:</p>

        <div className='info-item'>
          <FontAwesomeIcon icon={faMapLocationDot} className='icon' />
          <div>
            <h3>Address</h3>
            <p>Ngong Road, P.O. Box 45425, Nairobi KE</p>
          </div>
        </div>

        <div className='info-item'>
          <FontAwesomeIcon icon={faPhone} className='icon' />
          <div>
            <h3>Phone</h3>
            <p>+254 708 444 961</p>
          </div>
        </div>

        <div className='info-item'>
          <FontAwesomeIcon icon={faEnvelope} className='icon' />
          <div>
            <h3>Email</h3>
            <p>farmart@gmail.co.ke</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
