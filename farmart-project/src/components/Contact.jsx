import React from 'react'

const Contact = () => {
  return (
    <div className='contactpage'>
      <h1>Contact us</h1>
      <p>Got a question? Send us a message. We would love to hear from you and we will respond as soon as possible.</p>
      <div className='google-maps'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7903518826697!2d36.78452607543875!3d-1.3006495356429433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109b8af13d0b%3A0xbdeb9a77aa4d971d!2sPrestige%20Plaza%20Shopping%20Mall!5e0!3m2!1sen!2ske!4v1745070692058!5m2!1sen!2ske" width="600" height="450" style={{border: '0'}} allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div>
        <div className='contactform'>
          <h2>Drop Us Message</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type='text' placeholder='Enter your name'/>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter your email address'/>
            <label htmlFor="message">Message</label>
            <textarea name="message" placeholder='Your message here...'/>
            <button>Submit <FontAwesomeIcon icon={faArrowRight} /></button>
          </form>
        </div>
        <div className='contactinfo'>
          <h2>Get in touch</h2>
          <p>Feel free to contact us on any of the listed contact methods below</p>
          <div className='address'>
          <FontAwesomeIcon icon={faMapLocationDot} />
            <div className='inneraddress'>
              <h3>Address</h3>
              <p>Ngong Road P O 45425 Nairobi KE</p>

            </div>
          </div>
          <div className='phone'>
          <FontAwesomeIcon icon={faPhone} />
            <div className='innerphone'>
              <h3>Phone</h3>
              <p>+254708444961</p>

            </div>
          </div>
          <div className='email'>
          <FontAwesomeIcon icon={faEnvelope} />
            <div className='inneremail'>
              <h3>Email</h3>
              <p>farmart@gmail.co.ke</p>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Contact