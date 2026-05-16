import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, id, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3' style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
        <i className="fas fa-arrow-left me-2"></i> Go Back
      </Link>

      <FormContainer>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem', boxShadow: '0 8px 24px rgba(168,85,247,0.3)',
          }}>
            <i className="fas fa-user-edit" style={{ color: '#fff', fontSize: '1.2rem' }}></i>
          </div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>Edit User</h1>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Modify user details and privileges
          </p>
        </div>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        
        {loading ? <Loader /> : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className="mb-4">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--clr-border)',
              borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem',
            }}>
              <Form.Group controlId='isadmin' className="d-flex alignItems-center m-0">
                <Form.Check
                  type='switch'
                  id='custom-switch'
                  label='Grant Administrator Privileges'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  style={{ color: isAdmin ? '#4ecdc4' : 'var(--clr-text)', fontWeight: 600, fontSize: '0.95rem' }}
                />
              </Form.Group>
              <p style={{ color: 'var(--clr-text-dim)', fontSize: '0.8rem', margin: '0.5rem 0 0 2.5rem' }}>
                Admin users have full access to product and order management.
              </p>
            </div>

            <Button type='submit' variant='primary' className="w-100 py-2">
              <i className="fas fa-save me-2"></i> Update User
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
