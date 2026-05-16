import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const iconStyle = {
  position: 'absolute', left: '1rem', top: '50%',
  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
};

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  const statusBadge = (active, trueLabel, falseLabel) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: '0.2rem 0.7rem', borderRadius: '9999px',
      fontSize: '0.75rem', fontWeight: 700,
      background: active ? 'rgba(78,205,196,0.12)' : 'rgba(255,107,107,0.1)',
      border: `1px solid ${active ? 'rgba(78,205,196,0.3)' : 'rgba(255,107,107,0.25)'}`,
      color: active ? '#4ecdc4' : '#ff6b81',
    }}>
      <i className={active ? 'fas fa-check-circle' : 'fas fa-times-circle'}></i>
      {active ? trueLabel : falseLabel}
    </span>
  );

  return (
    <Row className="g-4">
      {/* LEFT: Profile Form */}
      <Col xs={12} md={4} lg={3}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px', padding: '1.75rem',
        }}>
          {/* Avatar */}
          <div className="text-center mb-4">
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 0.85rem',
              boxShadow: '0 8px 24px rgba(255,107,107,0.3)',
              fontSize: '1.8rem',
            }}>
              <i className="fas fa-user" style={{ color: '#fff' }}></i>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{user?.name || 'My Profile'}</h3>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{user?.email}</span>
          </div>

          {message && <Message variant='danger'>{message}</Message>}
          {success && <Message variant='success'>Profile updated!</Message>}
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name' className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-user" style={iconStyle}></i>
                  <Form.Control type='text' placeholder='Name' value={name}
                    onChange={(e) => setName(e.target.value)} style={{ paddingLeft: '2.6rem' }} />
                </div>
              </Form.Group>

              <Form.Group controlId='email' className="mb-3">
                <Form.Label>Email</Form.Label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-envelope" style={iconStyle}></i>
                  <Form.Control type='email' placeholder='Email' value={email}
                    onChange={(e) => setEmail(e.target.value)} style={{ paddingLeft: '2.6rem' }} />
                </div>
              </Form.Group>

              <Form.Group controlId='password' className="mb-3">
                <Form.Label>New Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-lock" style={iconStyle}></i>
                  <Form.Control type='password' placeholder='Leave blank to keep' value={password}
                    onChange={(e) => setPassword(e.target.value)} style={{ paddingLeft: '2.6rem' }} />
                </div>
              </Form.Group>

              <Form.Group controlId='confirmPassword' className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-shield-alt" style={iconStyle}></i>
                  <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} style={{ paddingLeft: '2.6rem' }} />
                </div>
              </Form.Group>

              <Button type='submit' className="w-100 py-2" style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                border: 'none', borderRadius: '10px', fontWeight: 700,
                boxShadow: '0 8px 24px rgba(255,107,107,0.3)',
              }}>
                <i className="fas fa-save me-2"></i> Update Profile
              </Button>
            </Form>
          )}
        </div>
      </Col>

      {/* RIGHT: My Orders */}
      <Col xs={12} md={8} lg={9}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px', padding: '1.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="fas fa-shopping-bag" style={{ color: '#0a0a1a', fontSize: '0.9rem' }}></i>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.1rem' }}>My Orders</h2>
          </div>

          {loadingOrders ? <Loader /> : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : orders.length === 0 ? (
            <Message variant='info'>You have no orders yet.</Message>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    {['Order ID', 'Date', 'Total', 'Paid', 'Delivered', ''].map((h) => (
                      <th key={h} style={{
                        padding: '0.6rem 0.8rem',
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: '0.72rem', textTransform: 'uppercase',
                        letterSpacing: '0.08em', textAlign: 'left',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.7rem 0.8rem', color: '#4ecdc4', fontFamily: 'monospace', fontSize: '0.78rem' }}>
                        {order._id.slice(-8).toUpperCase()}
                      </td>
                      <td style={{ padding: '0.7rem 0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td style={{ padding: '0.7rem 0.8rem', color: '#ff6b6b', fontWeight: 700 }}>
                        ${order.totalPrice}
                      </td>
                      <td style={{ padding: '0.7rem 0.8rem' }}>
                        {order.isPaid ? statusBadge(true, order.paidAt.substring(0,10), '') : statusBadge(false, '', 'Unpaid')}
                      </td>
                      <td style={{ padding: '0.7rem 0.8rem' }}>
                        {order.isDelivered ? statusBadge(true, order.deliveredAt.substring(0,10), '') : statusBadge(false, '', 'Pending')}
                      </td>
                      <td style={{ padding: '0.7rem 0.8rem' }}>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button style={{
                            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px', color: '#fff', fontSize: '0.78rem', padding: '0.3rem 0.75rem',
                          }}>
                            <i className="fas fa-eye me-1"></i> View
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
