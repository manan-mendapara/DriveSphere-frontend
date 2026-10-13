
import React, { useState } from 'react';
import './EngineExplorer.css';

const EngineExplorer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const branches = [
    {
      id: 'engine',
      label: 'Engine',
      icon: 'engine',
      description:
        'The heart of the vehicle, converting fuel into mechanical power to drive the wheels.',
    },
    {
      id: 'coolingFan',
      label: 'Cooling Fan',
      icon: 'fan',
      description:
        'Helps regulate engine temperature by drawing air through the radiator.',
    },
    {
      id: 'exhaustSystem',
      label: 'Exhaust System',
      icon: 'exhaust',
      description:
        'Channels combustion gases away from the engine and reduces noise and emissions.',
    },
    {
      id: 'radiator',
      label: 'Radiator',
      icon: 'radiator',
      description:
        'Cools the engine coolant by transferring heat to the outside air.',
    },
    {
      id: 'engineOil',
      label: 'Engine Oil',
      icon: 'oil',
      description:
        'Lubricates moving parts, reduces friction, and helps cool the engine.',
    },
    {
      id: 'transmission',
      label: 'Transmission',
      icon: 'transmission',
      description:
        'Transfers power from the engine to the wheels, allowing different speed ratios.',
    },
  ];

  const toggleExplorer = () => {
    setIsOpen((prev) => !prev);
    setSelectedBranch(null);
  };

  const selectBranch = (branchId) => {
    setSelectedBranch((prev) =>
      prev === branchId ? null : branchId
    );
  };

  const getBranchIcon = (iconName) => {
    switch (iconName) {
      case 'engine':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="4" y="7" width="13" height="11" rx="2" />
            <path d="M7 7V4h7v3M17 10h3v5h-3M8 11h5M8 14h5M2 10v5" />
          </svg>
        );

      case 'fan':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="2" />
            <path d="M12 10c-2-6 1-8 3-7 3 2 0 6-1 8M14 12c6-2 8 1 7 3-2 3-6 0-8-1M12 14c2 6-1 8-3 7-3-2 0-6 1-8M10 12c-6 2-8-1-7-3 2-3 6 0 8 1" />
          </svg>
        );

      case 'exhaust':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 9h10a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H9" />
            <path d="M4 6v6a3 3 0 0 0 3 3h2M17 10h3v5h-3M3 18h6" />
          </svg>
        );

      case 'radiator':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 7v10M12 7v10M16 7v10M2 8h2M2 16h2M20 8h2M20 16h2" />
          </svg>
        );

      case 'oil':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 3c-2 3-6 7-6 11a6 6 0 0 0 12 0c0-4-4-8-6-11Z" />
            <path d="M9 15a3 3 0 0 0 3 3" />
          </svg>
        );

      case 'transmission':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="12" r="8" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section className="engine-explorer">
      {/* Explorer Header */}
      <div className="engine-explorer-header">
        <h2 className="engine-explorer-title">
          Interactive Engine Explorer
        </h2>

        <p className="engine-explorer-subtitle">
          Click on any component to learn more about how it works.
        </p>

        <button
          type="button"
          onClick={toggleExplorer}
          className="engine-explorer-toggle"
          aria-expanded={isOpen}
        >
          {isOpen ? 'Close Explorer' : 'Explore Engine'}
          <span
            className={`engine-explorer-toggle-icon ${
              isOpen ? 'engine-explorer-toggle-icon-open' : ''
            }`}
            aria-hidden="true"
          >
            ↓
          </span>
        </button>
      </div>

      {/* Explorer Content */}
      {isOpen && (
        <div className="engine-explorer-content">
          {/* Central Engine Icon */}
          <div className="engine-explorer-center">
            <div className="engine-explorer-center-icon">
              {getBranchIcon('engine')}
            </div>

            <h3>Engine System</h3>

            <p>
              Explore the key components that keep a vehicle running.
            </p>
          </div>

          {/* Component Branches */}
          <div className="engine-explorer-branches">
            {branches.map((branch) => {
              const isSelected = selectedBranch === branch.id;

              return (
                <button
                  type="button"
                  key={branch.id}
                  className={`engine-branch ${
                    isSelected ? 'engine-branch-selected' : ''
                  }`}
                  onClick={() => selectBranch(branch.id)}
                  aria-expanded={isSelected}
                >
                  <span className="engine-branch-icon">
                    {getBranchIcon(branch.icon)}
                  </span>

                  <span className="engine-branch-label">
                    {branch.label}
                  </span>

                  <span
                    className="engine-branch-chevron"
                    aria-hidden="true"
                  >
                    {isSelected ? '−' : '+'}
                  </span>

                  {isSelected && (
                    <span className="engine-branch-description">
                      {branch.description}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default EngineExplorer;
