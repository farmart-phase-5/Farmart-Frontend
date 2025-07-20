import React from 'react';
import cows from '../assets/cows.jpeg';
import goats from '../assets/goats.jpeg';
import sheeps from '../assets/sheeps.jpeg';
import Footer from '../components/Footer';


const About = () => {
  return (
    <div className='about-container'>
      <h1>What we do?</h1>
      <p>
        At Farmart, we make it easy for you to buy and sell healthy, well-cared-for farm animals directly from trusted farmers and breeders. By removing middlemen, we ensure fair prices, transparent dealings, and peace of mind for both sellers and buyers. Whether you're looking for livestock to grow your farm or start a new venture, Farmart connects you to a community built on trust, quality, and genuine value. Real farmers. Real animals. Real deals.
      </p>

      <h1>Our Promise</h1>
      <p>
        Healthy, Well-Cared-For Animals - We work only with farmers who prioritize animal health, proper feeding, and humane care.

        Fair & Transparent Pricing - No hidden fees or inflated costs — just honest deals that benefit both farmers and buyers.

        Trusted Connections - Every seller on Farmart is verified, so you can buy with confidence and build long-term relationships.

        Hassle-Free Transactions - From listing to delivery, we make the buying and selling process smooth, secure, and stress-free.

        Support for Local Farmers - Every purchase helps hardworking farmers grow their businesses and improve their livelihoods.
      </p>

      <h1>Quality of Our Livestock</h1>
      <img src={cows} alt="Cows" className='imageone' />
      <p>
        At Farmart, quality is at the heart of everything we offer. Our livestock comes from experienced, responsible farmers who prioritize animal health, proper nutrition, and ethical rearing practices. Each animal is carefully inspected for good health, strong build, and suitability for breeding, dairy, or meat production. We ensure that the animals listed on Farmart are disease-free, well-fed, and raised in clean, stress-free environments. When you buy from us, you're choosing livestock you can trust — strong, healthy, and ready to thrive on your farm.
      </p>

      <h1>Farmart Business Establishment</h1>
      <img src={goats} alt="Goats" className='imagetwo' />
      <p>
        Farmart was born out of a simple idea — to bring fairness, transparency, and trust back into the livestock market. Founded by a team passionate about agriculture and community, we saw the challenges farmers faced when dealing with middlemen and unfair pricing. So we created a platform that puts control back in the hands of farmers and gives buyers direct access to quality livestock. What started as a small network has grown into a trusted marketplace where relationships are built, not just deals. Farmart is more than a business — it's a movement to uplift farmers and deliver genuine value to customers.
      </p>

     <div className='about-highlight'>
  <h1>Special Offers</h1>
  <div className='offer-grid'>
    <div className='offer-card horizontal'>
      <img src={sheeps} alt="Free Delivery" />
      <div className="offer-content">
        <h2>Free Deliveries</h2>
        <p>
          We offer <strong>free delivery</strong> on select livestock orders — bringing trusted animals right to your farm with no extra cost.
        </p>
      </div>
    </div>

    <div className='offer-card horizontal'>
      <img src={goats} alt="Exclusive Discounts" />
      <div className="offer-content">
        <h2>Exclusive Discounts</h2>
        <p>
          Enjoy <strong>seasonal sales</strong> and bulk order discounts, ensuring you get top-quality livestock at unbeatable prices.
        </p>
      </div>
    </div>

    <div className='offer-card horizontal'>
      <img src={cows} alt="Buyer Protection" />
      <div className="offer-content">
        <h2>Buyer Protection</h2>
        <p>
          Every transaction on Farmart is <strong>secure and verified</strong>, giving you peace of mind from purchase to delivery.
        </p>
      </div>
    </div>
  </div>
</div>

<Footer />

    </div>
  );
};

export default About;
