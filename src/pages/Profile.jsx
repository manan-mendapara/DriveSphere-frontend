
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  UserRound,
  Save,
  X,
  Pencil,
  Heart,
  GitCompareArrows,
  Mail,
  Phone,
  CalendarDays,
  User,
} from 'lucide-react';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCompare } from '../context/CompareContext.jsx';

import './Profile.css';

const DEFAULT_PROFILE = {
  username: 'DriveEnthusiast',
  fullName: 'Car Enthusiast',
  email: '',
  phone: '',
  age: '',
};

const loadProfile = () => {
  try {
    return {
      ...DEFAULT_PROFILE,
      ...JSON.parse(
        localStorage.getItem('drivesphere-profile') || '{}'
      ),
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
};

const PROFILE_FIELDS = [
  {
    key: 'fullName',
    label: 'Full name',
    type: 'text',
    icon: User,
    required: true,
    autoComplete: 'name',
  },
  {
    key: 'username',
    label: 'Display name',
    type: 'text',
    icon: UserRound,
    autoComplete: 'nickname',
  },
  {
    key: 'email',
    label: 'Email (optional)',
    type: 'email',
    icon: Mail,
    autoComplete: 'email',
  },
  {
    key: 'phone',
    label: 'Phone (optional)',
    type: 'tel',
    icon: Phone,
    autoComplete: 'tel',
  },
  {
    key: 'age',
    label: 'Age (optional)',
    type: 'number',
    icon: CalendarDays,
  },
];

export default function Profile() {
  const [profile, setProfile] = useState(loadProfile);
  const [draft, setDraft] = useState(loadProfile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const { wishlistCount } = useWishlist();
  const { comparisonCount } = useCompare();

  const save = (event) => {
    event.preventDefault();

    const fullName = String(draft.fullName ?? '').trim();
    const username = String(draft.username ?? '').trim();
    const email = String(draft.email ?? '').trim();
    const phone = String(draft.phone ?? '').trim();
    const age = String(draft.age ?? '').trim();

    if (!fullName) {
      setMessageType('error');
      setMessage('Please enter your full name.');
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setMessageType('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (age && (!Number.isInteger(Number(age)) ||
      Number(age) < 1 || Number(age) > 120)) {
      setMessageType('error');
      setMessage('Please enter an age between 1 and 120.');
      return;
    }

    const next = {
      ...draft,
      fullName,
      username: username || 'DriveEnthusiast',
      email,
      phone,
      age,
    };

    try {
      localStorage.setItem(
        'drivesphere-profile',
        JSON.stringify(next)
      );

      setProfile(next);
      setDraft(next);
      setEditing(false);
      setMessageType('success');
      setMessage('Profile saved in this browser.');
    } catch {
      setMessageType('error');
      setMessage(
        'Unable to save your profile in this browser. Please check your browser storage settings.'
      );
    }
  };

  const cancel = () => {
    setDraft({ ...profile });
    setEditing(false);
    setMessage('');
  };

  const startEditing = () => {
    setDraft({ ...profile });
    setEditing(true);
    setMessage('');
  };

  const profileDetails = [
    {
      label: 'Full name',
      value: profile.fullName,
      icon: User,
    },
    {
      label: 'Display name',
      value: profile.username,
      icon: UserRound,
    },
    {
      label: 'Email',
      value: profile.email || 'Not provided',
      icon: Mail,
    },
    {
      label: 'Phone',
      value: profile.phone || 'Not provided',
      icon: Phone,
    },
    {
      label: 'Age',
      value: profile.age || 'Not provided',
      icon: CalendarDays,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">
          {/* Back Navigation */}
          <Link to="/home" className="profile-back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back home</span>
          </Link>

          {/* Page Header */}
          <header className="profile-header">
            <div className="profile-header-icon">
              <UserRound size={32} aria-hidden="true" />
            </div>

            <div className="profile-header-content">
              <p className="profile-eyebrow">LOCAL PROFILE</p>

              <h1 className="profile-title">
                Your profile
              </h1>

              <p className="profile-subtitle">
                Manage your details and track your favorite cars.
              </p>
            </div>
          </header>

          {/* Feedback Message */}
          {message && (
            <p
              role="status"
              aria-live="polite"
              className={`profile-message profile-message-${messageType}`}
            >
              {message}
            </p>
          )}

          {/* Profile Card */}
          <section className="profile-card">
            <div className="profile-card-heading">
              <div>
                <h2 className="profile-card-title">
                  Personal information
                </h2>

                <p className="profile-card-description">
                  Your profile details stay in this browser.
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={startEditing}
                  className="profile-edit-button"
                >
                  <Pencil size={15} aria-hidden="true" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {editing ? (
              <form
                onSubmit={save}
                className="profile-form"
              >
                <div className="profile-form-grid">
                  {PROFILE_FIELDS.map((field) => {
                    const FieldIcon = field.icon;

                    return (
                      <label
                        key={field.key}
                        className="profile-field"
                      >
                        <span className="profile-field-label">
                          {field.label}
                        </span>

                        <span className="profile-input-wrapper">
                          <FieldIcon
                            size={17}
                            className="profile-input-icon"
                            aria-hidden="true"
                          />

                          <input
                            type={field.type}
                            name={field.key}
                            value={draft[field.key] ?? ''}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                [field.key]: event.target.value,
                              }))
                            }
                            className="profile-input"
                            placeholder={`Enter ${field.label
                              .replace(' (optional)', '')
                              .toLowerCase()}`}
                            autoComplete={field.autoComplete}
                            required={field.required}
                            min={field.type === 'number' ? 1 : undefined}
                            max={field.type === 'number' ? 120 : undefined}
                          />
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="profile-form-actions">
                  <button
                    type="submit"
                    className="profile-button profile-save-button"
                  >
                    <Save size={16} aria-hidden="true" />
                    <span>Save profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={cancel}
                    className="profile-button profile-cancel-button"
                  >
                    <X size={16} aria-hidden="true" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* Personal Details */}
                <div className="profile-details-grid">
                  {profileDetails.map((item) => {
                    const ItemIcon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="profile-detail-item"
                      >
                        <div className="profile-detail-icon">
                          <ItemIcon
                            size={17}
                            aria-hidden="true"
                          />
                        </div>

                        <div className="profile-detail-content">
                          <p className="profile-detail-label">
                            {item.label}
                          </p>

                          <p className="profile-detail-value">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Wishlist & Comparison Summary */}
                <div className="profile-stats">
                  <Link
                    to="/wishlist"
                    className="profile-stat-card"
                  >
                    <div className="profile-stat-icon">
                      <Heart size={20} aria-hidden="true" />
                    </div>

                    <div>
                      <p className="profile-stat-label">
                        Wishlist
                      </p>

                      <p className="profile-stat-value">
                        {wishlistCount}{' '}
                        {wishlistCount === 1
                          ? 'vehicle saved'
                          : 'vehicles saved'}
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/compare"
                    className="profile-stat-card"
                  >
                    <div className="profile-stat-icon">
                      <GitCompareArrows
                        size={20}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="profile-stat-label">
                        Comparison
                      </p>

                      <p className="profile-stat-value">
                        {comparisonCount} of 2 vehicles selected
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="profile-footer-note">
                  <span className="profile-note-dot" />
                  <p>
                    Changes are stored locally and are not synced
                    across browsers or devices.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}