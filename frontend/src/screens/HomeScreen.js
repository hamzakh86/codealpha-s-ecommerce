import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/Productcarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

      {!keyword ? (
        /* ── Top bar: mini hero (compact) + carousel side by side on desktop ── */
        <div style={{ marginBottom: '2rem' }}>
          <Row className="g-3 align-items-stretch">
            {/* Left: mini hero */}
            <Col xs={12} md={4}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.1), rgba(168,85,247,0.12))',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '18px',
                padding: '2rem 1.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: '#4ecdc4',
                  background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.2)',
                  borderRadius: '9999px', padding: '0.25rem 0.75rem',
                  marginBottom: '0.85rem', width: 'fit-content',
                }}>
                  <i className="fas fa-fire"></i> New Arrivals
                </span>
                <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.6rem', lineHeight: 1.2 }}>
                  Premium
                  <span style={{
                    display: 'block',
                    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>Products</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Shop the latest trends with unbeatable prices and fast delivery.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['Electronics', 'Fashion', 'Home'].map((cat) => (
                    <span key={cat} style={{
                      padding: '0.3rem 0.75rem', borderRadius: '9999px',
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                    }}>{cat}</span>
                  ))}
                </div>
              </div>
            </Col>

            {/* Right: carousel */}
            <Col xs={12} md={8}>
              <div style={{ borderRadius: '18px', overflow: 'hidden', height: '100%' }}>
                <ProductCarousel />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Link to='/' className='btn btn-light'>
            <i className="fas fa-arrow-left me-2"></i> Back
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            Results for: <strong style={{ color: '#4ecdc4' }}>"{keyword}"</strong>
          </span>
        </div>
      )}

      {/* ── Products section ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Latest Products</h2>
          {products && (
            <span style={{
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.2rem 0.65rem', borderRadius: '9999px',
            }}>
              {products.length} items
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {[
            { icon: 'fas fa-th-large', label: 'Grid' },
          ].map(({ icon, label }) => (
            <span key={label} title={label} style={{
              width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
              background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className={icon} style={{ color: '#ff6b6b', fontSize: '0.8rem' }}></i>
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='g-3'>
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
