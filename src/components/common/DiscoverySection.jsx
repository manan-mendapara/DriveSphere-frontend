
import React from 'react';
import { Link } from 'react-router-dom';
import { CarFront, GitCompareArrows, Zap, ArrowUpRight } from 'lucide-react';
import './DiscoverySection.css';

const discoveryItems = [
  {
    title: 'Explore All Cars',
    description:
      'Browse our complete inventory of vehicles from all brands and categories.',
    link: '/cars',
    icon: CarFront,
  },
  {
    title: 'Compare Vehicles',
    description:
      'Compare specifications, features, and performance side by side.',
    link: '/compare',
    icon: GitCompareArrows,
  },
  {
    title: 'Electric Vehicles',
    description:
      'Discover electric vehicles and explore sustainable driving options.',
    link: '/cars?fuelType=Electric',
    icon: Zap,
  },
];

export default function DiscoverySection() {
  return (
    <section className="discovery-section">
      <header className="discovery-section__header">
        <p className="discovery-section__eyebrow">
          YOUR NEXT JOURNEY STARTS HERE
        </p>

        <h2 className="discovery-section__title">
          Discover More with DriveSphere
        </h2>

        <p className="discovery-section__description">
          Take your automotive journey further with our specialized
          discovery tools.
        </p>
      </header>

      <div className="discovery-section__grid">
        {discoveryItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.link}
              className="discovery-card"
            >
              <span className="discovery-card__icon">
                <Icon size={28} strokeWidth={1.8} />
              </span>

              <h3 className="discovery-card__title">
                {item.title}
              </h3>

              <p className="discovery-card__description">
                {item.description}
              </p>

              <span className="discovery-card__action">
                Explore now
                <ArrowUpRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}