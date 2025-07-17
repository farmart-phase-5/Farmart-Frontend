import React from 'react';
import LoadPageimg from './LoadPageimg';

const Home = () => {
  return (
    <div className="home-container">
      <LoadPageimg />

      <section className="home-content">
        <h1>Welcome to Taste Town</h1>
        <p>
          Taste Town is your one-stop solution for high-quality groceries delivered straight to your door. We
          believe in fresh, local produce and a joyful customer experience.
        </p>

        <p>
          From farm to table, our mission is to simplify your grocery shopping through innovation, convenience,
          and care. Whether you're looking for farm-fresh fruits, vegetables, dairy, or pantry essentials — we
          have you covered.
        </p>
      </section>
    </div>
  );
};

export default Home;


