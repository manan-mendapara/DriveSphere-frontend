
import React from 'react';
import {
  Compass,
  GitCompareArrows,
  Route,
  Database,
  Search,
  Heart,
  MapPin,
  Smartphone,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';

import './About.css';

const howItWorks = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Explore our local demo catalogue of vehicles across multiple brands and categories, complete with specifications and image galleries.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Compare',
    description:
      'Compare up to two vehicles side by side and export your comparison as a CSV file to support your research.',
    icon: GitCompareArrows,
  },
  {
    number: '03',
    title: 'Drive',
    description:
      'Use your shortlist and vehicle research to narrow down your options before taking the next step with a dealer.',
    icon: Route,
  },
];

const features = [
  {
    title: 'Vehicle Catalogue',
    description:
      'Browse the sample vehicle catalogue and explore the available specifications, images, and details for each car.',
    icon: Database,
  },
  {
    title: 'Search & Filtering',
    description:
      'Find vehicles by brand, model, or variant. Filter results by price, year, body type, fuel type, transmission, and seating capacity.',
    icon: Search,
  },
  {
    title: 'Vehicle Comparison',
    description:
      'Compare two vehicles with clearly organised specifications, features, and performance details.',
    icon: GitCompareArrows,
  },
  {
    title: 'Personal Wishlist',
    description:
      'Save your favourite vehicles in a browser-based wishlist and return to your shortlisted options whenever you need them.',
    icon: Heart,
  },
  {
    title: 'Showroom Locator',
    description:
      'Explore the sample showroom directory by city and open directions through Google Maps.',
    icon: MapPin,
  },
  {
    title: 'Responsive Experience',
    description:
      'Browse DriveSphere on smartphones, tablets, laptops, and desktops with a layout designed to adapt to your screen.',
    icon: Smartphone,
  },
];

const About = () => {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <div className="about-container">
          {/* Hero */}
          <section className="about-hero">
            <div className="about-hero-decoration about-decoration-one" />
            <div className="about-hero-decoration about-decoration-two" />

            <span className="about-eyebrow">
              GET TO KNOW US
            </span>

            <h1>
              About <span>DriveSphere</span>
            </h1>

            <p className="about-hero-tagline">
              Discover. Compare. Drive.
            </p>

            <p className="about-hero-description">
              Your destination for exploring vehicles, comparing
              specifications, and making more informed automotive
              decisions.
            </p>

            <Link
              to="/cars"
              className="about-primary-link"
            >
              Explore vehicles
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>

            <div className="about-hero-bottom">
              <span className="about-hero-line" />
              <span>Find the car that fits your journey</span>
            </div>
          </section>

          {/* Mission */}
          <section className="about-mission">
            <div className="about-section-label">
              <span />
              OUR PURPOSE
            </div>

            <h2>
              Helping you choose your
              <span> next drive.</span>
            </h2>

            <p>
              At DriveSphere, we are passionate about helping
              automotive enthusiasts and car buyers make informed
              decisions. Our mission is to present clear, useful
              vehicle information that helps you discover cars for
              your needs, compare your options confidently, and
              organise your automotive research in one place.
            </p>
          </section>

          {/* How It Works */}
          <section className="about-section">
            <div className="about-section-heading">
              <div>
                <div className="about-section-label">
                  <span />
                  THE EXPERIENCE
                </div>

                <h2>How DriveSphere works</h2>
              </div>

              <p>
                Three simple steps to make your vehicle research
                easier.
              </p>
            </div>

            <div className="about-process-grid">
              {howItWorks.map((step) => {
                const StepIcon = step.icon;

                return (
                  <article
                    className="about-process-card"
                    key={step.number}
                  >
                    <div className="about-process-top">
                      <span className="about-step-number">
                        {step.number}
                      </span>

                      <div className="about-icon-box">
                        <StepIcon
                          size={23}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Key Features */}
          <section className="about-section about-features-section">
            <div className="about-section-heading">
              <div>
                <div className="about-section-label">
                  <span />
                  BUILT FOR YOUR JOURNEY
                </div>

                <h2>Features that make a difference</h2>
              </div>

              <p>
                Useful tools to help you explore and organise
                your vehicle research.
              </p>
            </div>

            <div className="about-features-grid">
              {features.map((feature, index) => {
                const FeatureIcon = feature.icon;

                return (
                  <article
                    className="about-feature-card"
                    key={feature.title}
                  >
                    <div className="about-feature-card-top">
                      <div className="about-icon-box">
                        <FeatureIcon
                          size={22}
                          aria-hidden="true"
                        />
                      </div>

                      <span className="about-feature-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Call to Action */}
          <section className="about-cta">
            <div className="about-cta-content">
              <span className="about-cta-eyebrow">
                YOUR NEXT JOURNEY STARTS HERE
              </span>

              <h2>
                Ready to find your
                <span> next car?</span>
              </h2>

              <p>
                Explore vehicles, discover their features, and
                compare your favourites with DriveSphere.
              </p>

              <Link
                to="/cars"
                className="about-cta-link"
              >
                Start exploring
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div
              className="about-cta-decoration"
              aria-hidden="true"
            >
              <Compass size={130} strokeWidth={0.8} />
            </div>
          </section>

          {/* Project Disclaimer */}
          <p className="about-disclaimer">
            <span>Note:</span> DriveSphere currently uses local
            demonstration data. Vehicle listings, specifications,
            wishlist storage, and showroom information may not
            represent live commercial data. Verify vehicle details
            with the manufacturer or dealer before making a purchase.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;