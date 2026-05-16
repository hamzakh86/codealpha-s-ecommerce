import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      {/* Header */}
      <div className="text-center mb-4">
        <div style={{
          width: '56px', height: '56px',
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
          boxShadow: '0 8px 24px rgba(255,107,107,0.35)',
        }}>
          <i className="fas fa-lock" style={{ color: '#fff', fontSize: '1.3rem' }}></i>
        </div>
        <h2 style={{ margin: 0 }}>Welcome Back</h2>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
          Sign in to your HK Shop account
        </p>
      </div>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-envelope" style={{
              position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
            }}></i>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='password' className="mb-4">
          <Form.Label>Password</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-key" style={{
              position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
            }}></i>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Button
          type='submit'
          className="w-100 py-2"
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.95rem',
            boxShadow: '0 8px 24px rgba(255,107,107,0.35)',
            letterSpacing: '0.02em',
          }}
        >
          <i className="fas fa-sign-in-alt me-2"></i> Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col className="text-center" style={{ fontSize: '0.88rem', color: 'var(--clr-text-muted)' }}>
          New customer?{' '}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            style={{ color: '#4ecdc4', fontWeight: 600 }}
          >
            Create an account
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
