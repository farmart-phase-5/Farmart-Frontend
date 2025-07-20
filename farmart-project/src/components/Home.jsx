import React from 'react';
import LoadPageimg from './LoadPageimg';
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="home-container">
      <LoadPageimg />

      <section className="home-content">
        <h1>Welcome to Farmart</h1>
        <p>
          Your trusted marketplace for healthy, high-quality farm animals — delivered straight from the farm to your doorstep. Whether you're a seasoned farmer, a first-time buyer, or a livestock trader, Farmart connects you directly with reliable farmers and unbeatable deals. No middlemen, no hidden costs — just honest trade, healthy animals, and a community you can count on.
          Start exploring today and experience the smarter way to buy and sell livestock!
        </p>


        <p>
          At Farmart, our mission is to transform the livestock market by empowering farmers, connecting communities, and delivering quality farm animals through a transparent and trustworthy platform. 
          We aim to create a fair and accessible space where buyers and sellers can thrive — built on integrity, affordability, and genuine care for animals and people alike.
        </p>

        <h1>Section heading</h1>
      </section>

      <div className='row'>
        <section>
        <h3>For Livestock Listings</h3>
        <h4>"Available Livestock"</h4>
        <p>Explore healthy, farm-raised animals ready for your farm.</p>
      </section>

      <section>
        <h3>For Delivery & Services</h3>
        <h4>"Our Services"</h4>
        <p>Direct livestock delivery, trusted sellers, and hassle-free transactions.</p>
      </section>

      <section>
        <h3>For Offers & Deals</h3>
        <h4>"Special Deals & Discounts"</h4>
        <p>Enjoy free delivery and exclusive livestock offers.</p>
      </section>

      <section>
        <h3>For Farmer Community</h3>
        <h4>"Meet Our Farmers"</h4>
        <p>Get to know the people behind the livestock.</p>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;


