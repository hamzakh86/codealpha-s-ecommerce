import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex' style={{ width: '100%' }}>
      <div style={{ display: 'flex', width: '100%', borderRadius: '9999px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search products...'
          style={{
            background: 'transparent',
            border: 'none',
            color: '#f0f0f8',
            padding: '0.5rem 1.2rem',
            fontSize: '0.88rem',
            boxShadow: 'none',
            outline: 'none',
            flex: 1,
          }}
        />
        <Button
          type='submit'
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            border: 'none',
            padding: '0.5rem 1.3rem',
            fontWeight: 600,
            fontSize: '0.85rem',
            borderRadius: '0 9999px 9999px 0',
            color: '#fff',
          }}
        >
          <i className="fas fa-search me-1"></i>
          <span className="d-none d-md-inline">Search</span>
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
