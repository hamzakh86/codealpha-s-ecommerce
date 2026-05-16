import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/checkoutSteps';
import { saveShippingAddress } from '../actions/cartAction';

const iconStyle = {
  position: 'absolute', left: '1rem', top: '50%',
  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)',
  pointerEvents: 'none',
};

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      {/* Header */}
      <div className="text-center mb-4">
        <div style={{
          width: '56px', height: '56px',
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
          boxShadow: '0 8px 24px rgba(168,85,247,0.35)',
        }}>
          <i className="fas fa-truck" style={{ color: '#fff', fontSize: '1.3rem' }}></i>
        </div>
        <h2 style={{ margin: 0 }}>Shipping Address</h2>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
          Where should we deliver your order?
        </p>
      </div>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-map-marker-alt" style={iconStyle}></i>
            <Form.Control
              type='text'
              placeholder='Enter street address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='city' className="mb-3">
          <Form.Label>City</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-city" style={iconStyle}></i>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='postalCode' className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-mail-bulk" style={iconStyle}></i>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='country' className="mb-4">
          <Form.Label>Country</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-globe" style={iconStyle}></i>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Button
          type='submit'
          className="w-100 py-2"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.95rem',
            boxShadow: '0 8px 24px rgba(168,85,247,0.35)',
          }}
        >
          <i className="fas fa-arrow-right me-2"></i> Continue to Payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
