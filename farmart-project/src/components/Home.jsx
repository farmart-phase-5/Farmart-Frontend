import React from 'react';
import LoadPageimg from './LoadPageimg';

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
      </section>
    </div>
  );
};

export default Home;


