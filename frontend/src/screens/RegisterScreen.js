import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const iconInput = (icon, color = 'rgba(255,255,255,0.3)') => ({
  position: 'absolute', left: '1rem', top: '50%',
  transform: 'translateY(-50%)', color, pointerEvents: 'none',
});

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      {/* Header */}
      <div className="text-center mb-4">
        <div style={{
          width: '56px', height: '56px',
          background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
          boxShadow: '0 8px 24px rgba(78,205,196,0.35)',
        }}>
          <i className="fas fa-user-plus" style={{ color: '#0a0a1a', fontSize: '1.3rem' }}></i>
        </div>
        <h2 style={{ margin: 0 }}>Create Account</h2>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
          Join HK Shop today — it's free!
        </p>
      </div>

      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-user" style={iconInput('rgba(255,255,255,0.3)')}></i>
            <Form.Control
              type='text'
              placeholder='Enter your full name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='email' className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-envelope" style={iconInput('rgba(255,255,255,0.3)')}></i>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='password' className="mb-3">
          <Form.Label>Password</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-lock" style={iconInput('rgba(255,255,255,0.3)')}></i>
            <Form.Control
              type='password'
              placeholder='Create a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <div style={{ position: 'relative' }}>
            <i className="fas fa-shield-alt" style={iconInput('rgba(255,255,255,0.3)')}></i>
            <Form.Control
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ paddingLeft: '2.6rem' }}
            />
          </div>
        </Form.Group>

        <Button
          type='submit'
          className="w-100 py-2"
          style={{
            background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#0a0a1a',
            boxShadow: '0 8px 24px rgba(78,205,196,0.35)',
          }}
        >
          <i className="fas fa-user-plus me-2"></i> Create Account
        </Button>
      </Form>

      <Row className='py-3'>
        <Col className="text-center" style={{ fontSize: '0.88rem', color: 'var(--clr-text-muted)' }}>
          Already have an account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            style={{ color: '#ff6b6b', fontWeight: 600 }}
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
