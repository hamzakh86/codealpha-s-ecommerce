import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartAction';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads'))
    return `https://codealpha-s-ecommerce.onrender.com${imagePath}`;
  return imagePath;
};

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));
  const checkoutHandler = () => navigate('/login?redirect=/shipping');

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 18px rgba(255,107,107,0.3)',
        }}>
          <i className="fas fa-shopping-cart" style={{ color: '#fff', fontSize: '1.1rem' }}></i>
        </div>
        <h1 style={{ margin: 0, fontSize: '1.6rem' }}>Shopping Cart</h1>
      </div>

      <Row className="g-4">
        {/* LEFT: Cart Items */}
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to='/' style={{ marginLeft: '10px', textDecoration: 'underline' }}>Go Back</Link>
            </Message>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <div key={item.product} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--clr-border)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  display: 'flex', alignItems: 'center', gap: '1.5rem',
                  flexWrap: 'wrap', transition: 'all 0.25s',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                >
                  {/* Image */}
                  <img
                    src={getImageUrl(item.image)} alt={item.name}
                    style={{
                      width: '80px', height: '80px', objectFit: 'contain',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px', padding: '8px', flexShrink: 0,
                    }}
                  />

                  {/* Name */}
                  <div style={{ flex: '1 1 200px' }}>
                    <Link to={`/product/${item.product}`} style={{
                      color: '#fff', fontSize: '1rem', fontWeight: 600,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {item.name}
                    </Link>
                    <div style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginTop: '0.3rem' }}>
                      Price: <span style={{ color: '#ff6b6b', fontWeight: 700 }}>${item.price}</span>
                    </div>
                  </div>

                  {/* Qty Selector */}
                  <div style={{ width: '90px' }}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      style={{ paddingLeft: '0.75rem', paddingRight: '2rem', cursor: 'pointer' }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>Qty: {x + 1}</option>
                      ))}
                    </Form.Control>
                  </div>

                  {/* Delete Btn */}
                  <Button
                    onClick={() => removeFromCartHandler(item.product)}
                    style={{
                      background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)',
                      borderRadius: '10px', color: '#ff6b81', padding: '0.6rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px',
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Col>

        {/* RIGHT: Checkout Summary */}
        <Col md={4}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--clr-border)',
            borderRadius: '18px',
            padding: '1.5rem',
            position: 'sticky', top: '90px',
          }}>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>
              <i className="fas fa-receipt me-2" style={{ color: '#4ecdc4' }}></i> Cart Summary
            </h3>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
                Total Items
              </span>
              <span style={{ fontWeight: 600, color: '#fff' }}>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
              </span>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1rem 0',
            }}>
              <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem' }}>
                Subtotal
              </span>
              <span style={{ fontWeight: 700, fontSize: '1.4rem', color: '#ff6b6b' }}>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>
            </div>

            <Button
              type='button'
              className='w-100 py-2 mt-2'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              style={{
                background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
                border: 'none', borderRadius: '10px',
                fontWeight: 700, fontSize: '0.95rem', color: '#0a0a1a',
                boxShadow: '0 8px 24px rgba(78,205,196,0.3)',
              }}
            >
              Proceed To Checkout <i className="fas fa-arrow-right ms-2"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
