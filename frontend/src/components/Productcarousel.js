import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads'))
    return `https://codealpha-s-ecommerce.onrender.com${imagePath}`;
  return imagePath;
};

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => { dispatch(listTopProducts()); }, [dispatch]);

  return loading ? <Loader /> : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      style={{
        background: '#111118',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        height: '100%',
        minHeight: '220px',
      }}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} style={{ display: 'flex', textDecoration: 'none' }}>
            {/* Image half */}
            <div style={{
              flex: '0 0 45%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#1a1a24',
              padding: '1.5rem',
              minHeight: '220px',
            }}>
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                style={{
                  maxHeight: '180px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                }}
              />
            </div>

            {/* Info half */}
            <div style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '1.75rem 1.5rem',
              background: 'linear-gradient(135deg, #111118, #16161e)',
            }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: '#4ecdc4',
                marginBottom: '0.6rem',
              }}>
                <i className="fas fa-star"></i> Top Rated
              </span>
              <h3 style={{
                color: '#fff', fontWeight: 700,
                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                marginBottom: '0.6rem', lineHeight: 1.3,
              }}>
                {product.name}
              </h3>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: '#fff', fontWeight: 700,
                fontSize: '1.1rem',
                padding: '0.25rem 0.9rem',
                borderRadius: '9999px',
                width: 'fit-content',
                boxShadow: '0 4px 14px rgba(255,107,107,0.35)',
              }}>
                ${product.price}
              </span>
              <span style={{
                marginTop: '1rem', fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.4)',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <i className="fas fa-arrow-right" style={{ color: '#4ecdc4' }}></i>
                View Product
              </span>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
