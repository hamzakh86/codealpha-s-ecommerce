import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const steps = [
  { key: 'step1', label: 'Sign In', icon: 'fas fa-sign-in-alt', path: '/login' },
  { key: 'step2', label: 'Shipping', icon: 'fas fa-truck', path: '/shipping' },
  { key: 'step3', label: 'Payment', icon: 'fas fa-credit-card', path: '/payment' },
  { key: 'step4', label: 'Place Order', icon: 'fas fa-check-circle', path: '/placeorder' },
];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const activeMap = { step1, step2, step3, step4 };

  // Find index of last active step
  const lastActiveIdx = steps.reduce(
    (acc, s, i) => (activeMap[s.key] ? i : acc), -1
  );

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Progress bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '0.5rem',
      }}>
        {steps.map((step, i) => {
          const isActive = activeMap[step.key];
          const isCompleted = i < lastActiveIdx;
          const isCurrent = i === lastActiveIdx;

          return (
            <React.Fragment key={step.key}>
              {/* Step circle */}
              {isActive ? (
                <LinkContainer to={step.path} style={{ cursor: 'pointer' }}>
                  <div
                    title={step.label}
                    style={{
                      width: '38px', height: '38px',
                      borderRadius: '50%',
                      background: isCurrent
                        ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
                        : isCompleted
                        ? 'linear-gradient(135deg, #4ecdc4, #2c9e98)'
                        : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${isCurrent ? '#ff6b6b' : isCompleted ? '#4ecdc4' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: isCurrent
                        ? '0 0 20px rgba(255,107,107,0.4)'
                        : isCompleted
                        ? '0 0 15px rgba(78,205,196,0.3)'
                        : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <i className={isCompleted ? 'fas fa-check' : step.icon}
                      style={{ fontSize: '0.85rem', color: isCompleted ? '#0a0a1a' : '#fff' }}
                    />
                  </div>
                </LinkContainer>
              ) : (
                <div
                  style={{
                    width: '38px', height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '2px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    opacity: 0.4,
                  }}
                >
                  <i className={step.icon} style={{ fontSize: '0.85rem', color: '#fff' }} />
                </div>
              )}

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: isCompleted
                    ? 'linear-gradient(90deg, #4ecdc4, #4ecdc4)'
                    : 'rgba(255,255,255,0.07)',
                  transition: 'background 0.3s ease',
                  margin: '0 4px',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((step, i) => {
          const isActive = activeMap[step.key];
          const isCurrent = i === lastActiveIdx;
          return (
            <span key={step.key} style={{
              fontSize: '0.72rem',
              fontWeight: isCurrent ? 700 : 500,
              color: isCurrent ? '#ff6b6b' : isActive ? '#4ecdc4' : 'rgba(255,255,255,0.25)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              width: '38px',
              textAlign: 'center',
            }}>
              {step.label.split(' ')[0]}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
