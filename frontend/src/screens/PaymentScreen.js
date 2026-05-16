import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/checkoutSteps';
import { savePaymentMethod } from '../actions/cartAction';

const paymentOptions = [
  {
    id: 'PayPal',
    label: 'PayPal or Credit Card',
    icon: 'fab fa-paypal',
    color: '#0070ba',
    bg: 'rgba(0, 112, 186, 0.1)',
    border: 'rgba(0, 112, 186, 0.3)',
  },
  {
    id: 'Stripe',
    label: 'Stripe',
    icon: 'fas fa-credit-card',
    color: '#635bff',
    bg: 'rgba(99, 91, 255, 0.1)',
    border: 'rgba(99, 91, 255, 0.3)',
  },
];

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  if (!shippingAddress.address) navigate('/shipping');

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      {/* Header */}
      <div className="text-center mb-4">
        <div style={{
          width: '56px', height: '56px',
          background: 'linear-gradient(135deg, #ffe66d, #f9ca24)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
          boxShadow: '0 8px 24px rgba(255,230,109,0.3)',
        }}>
          <i className="fas fa-credit-card" style={{ color: '#0a0a1a', fontSize: '1.3rem' }}></i>
        </div>
        <h2 style={{ margin: 0 }}>Payment Method</h2>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
          Choose how you'd like to pay
        </p>
      </div>

      <Form onSubmit={submitHandler}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {paymentOptions.map((opt) => {
            const isSelected = paymentMethod === opt.id;
            return (
              <label
                key={opt.id}
                htmlFor={opt.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.2rem',
                  borderRadius: '12px',
                  border: `2px solid ${isSelected ? opt.color : 'rgba(255,255,255,0.07)'}`,
                  background: isSelected ? opt.bg : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? `0 4px 20px ${opt.border}` : 'none',
                }}
              >
                <input
                  type="radio"
                  id={opt.id}
                  name="paymentMethod"
                  value={opt.id}
                  checked={isSelected}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '10px',
                  background: isSelected ? opt.color : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i className={opt.icon} style={{ color: isSelected ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}></i>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? '#fff' : 'rgba(255,255,255,0.7)' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
                    Secure & encrypted payment
                  </div>
                </div>
                {isSelected && (
                  <i className="fas fa-check-circle ms-auto" style={{ color: opt.color, fontSize: '1.1rem' }}></i>
                )}
              </label>
            );
          })}
        </div>

        <Button
          type='submit'
          className="w-100 py-2"
          style={{
            background: 'linear-gradient(135deg, #ffe66d, #f9ca24)',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#0a0a1a',
            boxShadow: '0 8px 24px rgba(255,230,109,0.3)',
          }}
        >
          <i className="fas fa-arrow-right me-2"></i> Continue to Review
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
