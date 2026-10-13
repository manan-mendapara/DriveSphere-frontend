
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, CarFront } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCompare } from '../../context/CompareContext.jsx';
import './Navbar.css';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/cars', label: 'Explore Cars' },
  { to: '/wishlist', label: 'Wishlist', count: 'wishlist' },
  { to: '/compare', label: 'Compare', count: 'compare' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { comparisonCount } = useCompare();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    updateScroll();

    window.addEventListener('scroll', updateScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const countFor = (key) => {
    if (key === 'wishlist') return wishlistCount;
    if (key === 'compare') return comparisonCount;
    return 0;
  };

  const linkClass = ({ isActive }) =>
    `navbar-link ${isActive ? 'navbar-link-active' : ''}`;

  return (
    <nav
      aria-label="Main navigation"
      className={`ds-navbar ${scrolled ? 'ds-navbar-scrolled' : ''}`}
    >
      <div className="navbar-container">
        {/* Brand */}
        <Link
          to="/home"
          className="navbar-brand"
          aria-label="DriveSphere home"
        >
          <CarFront className="navbar-brand-icon" />
          <span>DriveSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-desktop-links">
          {links.map(({ to, label, count }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
            >
              <span>{label}</span>

              {count && (
                <span className="navbar-count">
                  {countFor(count)}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="navbar-mobile-menu"
        className={`navbar-mobile-menu ${
          menuOpen ? 'navbar-mobile-menu-open' : ''
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="navbar-mobile-links">
          {links.map(({ to, label, count }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `navbar-mobile-link ${
                  isActive ? 'navbar-mobile-link-active' : ''
                }`
              }
            >
              <span>{label}</span>

              {count && (
                <span className="navbar-count">
                  {countFor(count)}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}