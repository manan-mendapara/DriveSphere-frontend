
import React from 'react';
import { Link } from 'react-router-dom';
import { CarFront, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const exploreLinks = [
  { to: '/home', label: 'Home' },
  { to: '/cars', label: 'Explore Cars' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/compare', label: 'Compare Cars' },
  { to: '/about', label: 'About DriveSphere' },
];

export default function Footer() {
  return (
    <footer className="ds-footer">
      <div className="ds-footer-container">
        {/* Brand Section */}
        <div className="ds-footer-brand">
          <Link to="/home" className="ds-footer-logo">
            <CarFront className="ds-footer-logo-icon" />
            <span>DriveSphere</span>
          </Link>

          <p className="ds-footer-description">
            Discover. Compare. Drive. Explore vehicle details,
            shortlist your favourites, and compare specifications
            in one place.
          </p>
        </div>

        {/* Explore Links */}
        <div className="ds-footer-explore">
          <h2 className="ds-footer-heading">Explore</h2>

          <ul className="ds-footer-links">
            {exploreLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Information */}
        <div className="ds-footer-info">
          <h2 className="ds-footer-heading">
            Built for car enthusiasts
          </h2>

          <p className="ds-footer-description">
            Browse the local demo catalogue, use filters, save
            a wishlist, and compare up to two vehicles. Your
            selections stay in this browser.
          </p>

          <Link to="/cars" className="ds-footer-browse-link">
            <span>Browse cars</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="ds-footer-bottom">
        <div className="ds-footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} DriveSphere.
            {' '}Frontend demonstration using local sample data.
          </p>
        </div>
      </div>
    </footer>
  );
}