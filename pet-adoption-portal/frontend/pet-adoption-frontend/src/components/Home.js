import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAvailablePets, getImageUrl } from '../services/api';
import { PLACEHOLDER } from '../assets/images';
import './Home.css';

const HERO_PET = 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=700&q=80';

const petPlaceholder = (pet) => {
  if (pet.imageUrl) return getImageUrl(pet.imageUrl);
  const cat = (pet.category || '').toLowerCase();
  return PLACEHOLDER[cat] || PLACEHOLDER.other;
};

function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailablePets()
      .then((data) => setPets((data || []).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="paw-print p1">🐾</div>
        <div className="paw-print p2">🐾</div>
        <div className="paw-print p3">🐾</div>
        <div className="paw-print p4">🐾</div>
        <div className="paw-print p5">🐾</div>
        <div className="hero-content">
          <span className="hero-badge">🐾 Welcome to Pawfect Adopt</span>
          <h1>Every Pet Deserves<br />a <span>Loving Home</span></h1>
          <p>Join thousands of happy pet parents. Find your perfect companion and give a shelter pet a second chance at happiness.</p>
          <div className="hero-buttons">
            <Link to="/pets" className="btn btn-primary btn-lg">Find a Pet</Link>
            <Link to="/pets" className="btn btn-light btn-lg">Adopt Now</Link>
          </div>
          <div className="hero-stats">
            <div><strong>500+</strong> <span>Pets Adopted</span></div>
            <div><strong>50+</strong> <span>Available</span></div>
            <div><strong>98%</strong> <span>Happy Matches</span></div>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={HERO_PET} alt="Happy dog" />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section how-section">
        <h2 className="section-title">How Adoption Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon terracotta">🐕</div>
            <h3>Browse Pets</h3>
            <p>Explore our list of adorable pets waiting for a forever home.</p>
          </div>
          <div className="step-card">
            <div className="step-icon sage">📋</div>
            <h3>Submit Request</h3>
            <p>Fill out a simple adoption application for your chosen pet.</p>
          </div>
          <div className="step-card">
            <div className="step-icon gold">🏡</div>
            <h3>Meet & Adopt</h3>
            <p>Get approved and bring your new best friend home!</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PETS ===== */}
      <section className="section featured-section">
        <h2 className="section-title">Featured Pets</h2>
        {loading ? (
          <p className="loading-text">Loading pets...</p>
        ) : pets.length === 0 ? (
          <p className="loading-text">No pets available yet.</p>
        ) : (
          <div className="featured-grid">
            {pets.map((pet) => (
              <Link to={`/pets/${pet.petId}`} className="featured-card" key={pet.petId}>
                <div className="featured-card-img">
                  <img src={petPlaceholder(pet)} alt={pet.name} />
                </div>
                <div className="featured-card-body">
                  <h3>{pet.name}</h3>
                  <p>{pet.breed || 'Pet'} &middot; {pet.age} yrs</p>
                  <span className="featured-card-location">{pet.location || 'Unknown'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="featured-cta">
          <Link to="/pets" className="btn btn-light btn-lg">View All Pets &rarr;</Link>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section why-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon bg-terracotta-light">🛡️</div>
            <h3>Verified Listings</h3>
            <p>Every pet is vet-checked and verified before being listed on our platform.</p>
          </div>
          <div className="why-card">
            <div className="why-icon bg-sage-light">❤️</div>
            <h3>Lifetime Support</h3>
            <p>We provide guidance even after adoption to ensure a smooth transition.</p>
          </div>
          <div className="why-card">
            <div className="why-icon bg-gold-light">🤝</div>
            <h3>Easy Process</h3>
            <p>Simple three-step adoption process designed for your convenience.</p>
          </div>
          <div className="why-card">
            <div className="why-icon bg-lavender-light">🏠</div>
            <h3>Home Delivery</h3>
            <p>We help coordinate safe transportation for your new family member.</p>
          </div>
        </div>
      </section>

      {/* ===== HAPPY STORIES ===== */}
      <section className="section stories-section">
        <h2 className="section-title">Happy Adoption Stories</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">👩</div>
            <p className="story-quote">"Adopting Buddy was the best decision we ever made. He brought so much joy to our family!"</p>
            <p className="story-author">— Sarah M.</p>
            <span className="story-pet">Adopted Buddy, 2024</span>
          </div>
          <div className="story-card">
            <div className="story-avatar">👨</div>
            <p className="story-quote">"The adoption process was so smooth. Within a week, Luna became part of our family!"</p>
            <p className="story-author">— Raj K.</p>
            <span className="story-pet">Adopted Luna, 2024</span>
          </div>
          <div className="story-card">
            <div className="story-avatar">👩‍🦰</div>
            <p className="story-quote">"I was nervous at first, but the team guided me through everything. Couldn't be happier!"</p>
            <p className="story-author">— Priya S.</p>
            <span className="story-pet">Adopted Milo, 2025</span>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-section">
        <div className="cta-card">
          <h2>Ready to Change a Life?</h2>
          <p>Start your adoption journey today and give a loving home to a pet in need.</p>
          <Link to="/pets" className="btn btn-light btn-lg">Get Started</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
