import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) {
      return `https://codealpha-s-ecommerce.onrender.com${imagePath}`;
    }
    return imagePath;
  };

  return (
    <Card className='my-3'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={getImageUrl(product.image)} variant='top' />
      </Link>

      <Card.Body className='d-flex flex-column' style={{ gap: '0.5rem' }}>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='div' className='mt-auto'>
          <span
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '0.25rem 0.9rem',
              borderRadius: '9999px',
              boxShadow: '0 4px 15px rgba(255,107,107,0.35)',
            }}
          >
            ${product.price}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
