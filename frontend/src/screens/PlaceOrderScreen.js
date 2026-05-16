import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/checkoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const summaryRow = (label, value, highlight = false) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0.7rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  }}>
    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>{label}</span>
    <span style={{
      fontWeight: highlight ? 700 : 500,
      fontSize: highlight ? '1.15rem' : '0.9rem',
      color: highlight ? '#ff6b6b' : '#fff',
    }}>{value}</span>
  </div>
);

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) navigate('/shipping');
  else if (!cart.paymentMethod) navigate('/payment');

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row className="g-4">
        {/* LEFT: Details */}
        <Col xs={12} md={8}>

          {/* Shipping */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fas fa-truck" style={{ color: '#fff', fontSize: '0.9rem' }}></i>
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Shipping Address</h3>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: 0 }}>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #ffe66d, #f9ca24)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fas fa-credit-card" style={{ color: '#0a0a1a', fontSize: '0.9rem' }}></i>
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Payment Method</h3>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(255,230,109,0.1)', border: '1px solid rgba(255,230,109,0.2)',
              borderRadius: '9999px', padding: '0.25rem 0.9rem',
              color: '#ffe66d', fontSize: '0.85rem', fontWeight: 600,
            }}>
              <i className="fab fa-paypal"></i> {cart.paymentMethod}
            </span>
          </div>

          {/* Order Items */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fas fa-box" style={{ color: '#0a0a1a', fontSize: '0.9rem' }}></i>
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Order Items</h3>
            </div>

            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cart.cartItems.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <Image
                      src={item.image} alt={item.name} fluid rounded
                      style={{ width: '52px', height: '52px', objectFit: 'contain', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px' }}
                    />
                    <Link to={`/product/${item.product}`} style={{ flex: 1, fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>
                      {item.name}
                    </Link>
                    <span style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '0.88rem', flexShrink: 0 }}>
                      {item.qty} × ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>

        {/* RIGHT: Order Summary */}
        <Col xs={12} md={4}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
            padding: '1.5rem',
            position: 'sticky',
            top: '90px',
          }}>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.05rem' }}>
              <i className="fas fa-receipt me-2" style={{ color: '#4ecdc4' }}></i>
              Order Summary
            </h3>

            {summaryRow('Items', `$${cart.itemsPrice}`)}
            {summaryRow('Shipping', cart.shippingPrice === '0.00'
              ? <span style={{ color: '#4ecdc4' }}>Free</span>
              : `$${cart.shippingPrice}`
            )}
            {summaryRow('Tax (15%)', `$${cart.taxPrice}`)}

            <div style={{ margin: '0.5rem 0', borderTop: '2px solid rgba(255,255,255,0.1)' }} />
            {summaryRow('Total', `$${cart.totalPrice}`, true)}

            {error && <Message variant='danger'>{error}</Message>}

            <Button
              type='button'
              className='w-100 py-2 mt-3'
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 8px 24px rgba(255,107,107,0.35)',
              }}
            >
              <i className="fas fa-check-circle me-2"></i> Place Order
            </Button>

            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '0.85rem' }}>
              <i className="fas fa-lock me-1"></i> Secured by SSL encryption
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
