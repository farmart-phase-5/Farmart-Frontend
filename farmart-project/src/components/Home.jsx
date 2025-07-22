import React from 'react';
import LoadPageimg from './LoadPageimg';
import Footer from '../components/Footer';
import Sales from '../assets/sales.avif';
import Daily from '../assets/Daily.png';
import deliveries from '../assets/deliveries.avif';
import cattle from '../assets/cattle.jpg';
import online from '../assets/online.png'


const Home = () => {
  return (
    <div className="home-container">
      <section className="home-content">
        <h1>Welcome to Farmart</h1>
        <p>
          Your trusted marketplace for healthy, high-quality farm animals — delivered straight from the farm to your doorstep. Whether you're a seasoned farmer, a first-time buyer, or a livestock trader, Farmart connects you directly with reliable farmers and unbeatable deals. No middlemen, no hidden costs — just honest trade, healthy animals, and a community you can count on. Start exploring today and experience the smarter way to buy and sell livestock!
        </p>
        <p>
          At Farmart, our mission is to transform the livestock market by empowering farmers, connecting communities, and delivering quality farm animals through a transparent and trustworthy platform. We aim to create a fair and accessible space where buyers and sellers can thrive — built on integrity, affordability, and genuine care for animals and people alike.
        </p>
      </section>


      <div className="image-wrapper">
        <LoadPageimg />
      </div>


      <section className="section horizontal-section">
        <div className="card horizontal">
          <img src={cattle} alt="Livestock Listing" />
          <div className="card-content">
            <h3>Livestock Listing</h3>
            <p>Connect to farmers. Find your ideal livestock.</p>
          </div>
        </div>
        <div className="card horizontal">
          <img src={deliveries} alt="Services" />
          <div className="card-content">
            <h3>Overview and Services</h3>
            <p>Trusted delivery and detailed livestock service.</p>
          </div>
        </div>
        <div className="card horizontal">
          <img src={Daily} alt="Offers" />
          <div className="card-content">
            <h3>Offers and Deals</h3>
            <p>Free delivery & great discounts.</p>
          </div>
        </div>
      </section>


      <section className="section horizontal-section">
        <div className="card horizontal">
          <img src={Sales} alt="SalesReady" />
          <div className="card-content">
            <h3>SalesReady</h3>
            <p>See what's available to bid & buy, and more.</p>
          </div>
        </div>
        <div className="card horizontal">
          <img src={online} alt="SalesWeekly" />
          <div className="card-content">
            <h3>SalesWeekly</h3>
            <p>Join every major sale and never miss out.</p>
          </div>
        </div>
      </section>


      <section className="section horizontal-section">
        <div className="card horizontal">
          
          <div className="card-content">
            <p>"A trusted place of peace"</p>
            <p><strong>— Muriuki</strong></p>
          </div>
        </div>
        <div className="card horizontal">
          
          <div className="card-content">
            <p>"Farmart is our lifeline for livestock."</p>
            <p><strong>— Kariuki</strong></p>
          </div>
        </div>
        <div className="card horizontal">
          
          <div className="card-content">
            <p>"A genuinely growing space."</p>
            <p><strong>— Achieng</strong></p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
