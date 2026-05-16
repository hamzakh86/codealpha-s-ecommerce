import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads'))
    return `https://codealpha-s-ecommerce.onrender.com${imagePath}`;
  return imagePath;
};

const ProductListScreen = () => {
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) navigate('/login');
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => dispatch(createProduct());

  return (
    <>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(78,205,196,0.25)',
          }}>
            <i className="fas fa-box" style={{ color: '#0d0d0d', fontSize: '1rem' }}></i>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Products</h1>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
              Manage your product catalog
            </p>
          </div>
        </div>

        <Button
          onClick={createProductHandler}
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            border: 'none', borderRadius: '10px', fontWeight: 700,
            padding: '0.55rem 1.2rem', fontSize: '0.88rem',
            boxShadow: '0 6px 18px rgba(255,107,107,0.3)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <i className="fas fa-plus"></i> Create Product
        </Button>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? <Loader /> : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px', overflow: 'hidden', marginBottom: '1.5rem',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Product', 'Price', 'Category', 'Brand', 'Stock', 'Actions'].map((h) => (
                      <th key={h} style={{
                        padding: '0.9rem 1.1rem',
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: '0.71rem', textTransform: 'uppercase',
                        letterSpacing: '0.08em', fontWeight: 600, textAlign: 'left',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Product */}
                      <td style={{ padding: '0.85rem 1.1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            style={{
                              width: '44px', height: '44px', objectFit: 'contain',
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '10px', padding: '4px', flexShrink: 0,
                            }}
                          />
                          <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.85rem' }}>
                            {product.name}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td style={{ padding: '0.85rem 1.1rem', color: '#ff6b6b', fontWeight: 700 }}>
                        ${product.price}
                      </td>

                      {/* Category */}
                      <td style={{ padding: '0.85rem 1.1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.73rem',
                          background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
                          color: '#a855f7', fontWeight: 600,
                        }}>
                          {product.category}
                        </span>
                      </td>

                      {/* Brand */}
                      <td style={{ padding: '0.85rem 1.1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem' }}>
                        {product.brand}
                      </td>

                      {/* Stock */}
                      <td style={{ padding: '0.85rem 1.1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.73rem', fontWeight: 700,
                          background: product.countInStock > 0 ? 'rgba(78,205,196,0.1)' : 'rgba(255,107,107,0.1)',
                          border: `1px solid ${product.countInStock > 0 ? 'rgba(78,205,196,0.25)' : 'rgba(255,107,107,0.2)'}`,
                          color: product.countInStock > 0 ? '#4ecdc4' : '#ff6b81',
                        }}>
                          {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '0.85rem 1.1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button style={{
                              background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.25)',
                              borderRadius: '8px', color: '#4ecdc4', fontSize: '0.77rem', padding: '0.3rem 0.7rem',
                            }}>
                              <i className="fas fa-edit me-1"></i> Edit
                            </Button>
                          </LinkContainer>
                          <Button
                            onClick={() => deleteHandler(product._id)}
                            style={{
                              background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)',
                              borderRadius: '8px', color: '#ff6b81', fontSize: '0.77rem', padding: '0.3rem 0.7rem',
                            }}
                          >
                            <i className="fas fa-trash me-1"></i> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
