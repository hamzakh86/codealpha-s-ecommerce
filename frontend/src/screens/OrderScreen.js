import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, deliverOrder } from '../actions/orderActions';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';

/* ── Small helpers ──────────────────────────────────────── */
const InfoBlock = ({ icon, color, bg, title, children }) => (
  <div style={{
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '1.4rem',
    marginBottom: '1rem',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 12px ${color}44`,
      }}>
        <i className={icon} style={{ color, fontSize: '0.9rem' }}></i>
      </div>
      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{title}</h3>
    </div>
    {children}
  </div>
);

const SummaryRow = ({ label, value, highlight }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0.65rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  }}>
    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>{label}</span>
    <span style={{ fontWeight: highlight ? 700 : 500, fontSize: highlight ? '1.1rem' : '0.9rem', color: highlight ? '#ff6b6b' : '#fff' }}>
      {value}
    </span>
  </div>
);

const OrderScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && order) {
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) navigate('/login');
    if (!order || successDeliver || order._id !== id) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, successDeliver, order, userInfo, navigate]);

  const deliverHandler = () => dispatch(deliverOrder(order));

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {/* Order ID header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(78,205,196,0.3)',
        }}>
          <i className="fas fa-receipt" style={{ color: '#0a0a1a', fontSize: '1.15rem' }}></i>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Order ID</p>
          <h2 style={{ margin: 0, fontSize: '1rem', fontFamily: 'monospace', letterSpacing: '0.05em', color: '#4ecdc4' }}>{order._id}</h2>
        </div>
        {order.isPaid && (
          <span style={{
            marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(78,205,196,0.12)', border: '1px solid rgba(78,205,196,0.3)',
            borderRadius: '9999px', padding: '0.3rem 0.9rem',
            color: '#4ecdc4', fontSize: '0.8rem', fontWeight: 700,
          }}>
            <i className="fas fa-check-circle"></i> Paid
          </span>
        )}
      </div>

      <Row className="g-4">
        {/* LEFT */}
        <Col xs={12} md={8}>
          {/* Delivery */}
          <InfoBlock icon="fas fa-truck" color="#fff" bg="linear-gradient(135deg, #a855f7, #7c3aed)" title="Delivery">
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
              <strong style={{ color: '#fff' }}>{order.user.name}</strong> —{' '}
              <a href={`mailto:${order.user.email}`} style={{ color: '#4ecdc4' }}>{order.user.email}</a>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                <i className="fas fa-check me-1"></i> Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
              </Message>
            ) : (
              <Message variant='warning'>
                <i className="fas fa-clock me-1"></i> Not yet delivered
              </Message>
            )}
          </InfoBlock>

          {/* Payment */}
          <InfoBlock icon="fas fa-credit-card" color="#0a0a1a" bg="linear-gradient(135deg, #ffe66d, #f9ca24)" title="Payment">
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              Method: <strong style={{ color: '#ffe66d' }}>{order.paymentMethod}</strong>
            </p>
            {order.isPaid ? (
              <Message variant='success'>
                <i className="fas fa-check me-1"></i> Paid on {new Date(order.paidAt).toLocaleDateString()}
              </Message>
            ) : (
              <Message variant='info'>
                <i className="fas fa-hourglass-half me-1"></i> Awaiting payment
              </Message>
            )}
          </InfoBlock>

          {/* Items */}
          <InfoBlock icon="fas fa-box" color="#0a0a1a" bg="linear-gradient(135deg, #4ecdc4, #2c9e98)" title="Order Items">
            {order.orderItems.length === 0 ? (
              <Message>No items</Message>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.7rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <Image
                      src={item.image} alt={item.name} fluid rounded
                      style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px' }}
                    />
                    <Link to={`/product/${item.product}`} style={{ flex: 1, color: '#fff', fontSize: '0.87rem', fontWeight: 500 }}>
                      {item.name}
                    </Link>
                    <span style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                      {item.qty} × ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </InfoBlock>
        </Col>

        {/* RIGHT: Summary */}
        <Col xs={12} md={4}>
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px', padding: '1.5rem', position: 'sticky', top: '90px',
          }}>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.05rem' }}>
              <i className="fas fa-receipt me-2" style={{ color: '#4ecdc4' }}></i> Summary
            </h3>

            <SummaryRow label="Items" value={`$${order.itemsPrice}`} />
            <SummaryRow label="Shipping" value={order.shippingPrice === '0.00' ? 'Free' : `$${order.shippingPrice}`} />
            <SummaryRow label="Tax" value={`$${order.taxPrice}`} />
            <div style={{ borderTop: '2px solid rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />
            <SummaryRow label="Total" value={`$${order.totalPrice}`} highlight />

            {!order.isPaid && (
              <Message variant='info' style={{ marginTop: '1rem' }}>
                <i className="fas fa-info-circle me-1"></i> Payment on delivery available
              </Message>
            )}

            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <Button
                type='button'
                className='w-100 py-2 mt-3'
                onClick={deliverHandler}
                disabled={loadingDeliver}
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
                  border: 'none', borderRadius: '10px',
                  fontWeight: 700, color: '#0a0a1a',
                  boxShadow: '0 8px 24px rgba(78,205,196,0.3)',
                }}
              >
                {loadingDeliver
                  ? <><i className="fas fa-spinner fa-spin me-2"></i> Processing...</>
                  : <><i className="fas fa-truck me-2"></i> Mark As Delivered</>
                }
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;