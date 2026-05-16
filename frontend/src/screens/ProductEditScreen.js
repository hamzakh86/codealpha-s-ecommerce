import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, id, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: id, name, price, image, brand, category, description, countInStock,
    }));
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3' style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
        <i className="fas fa-arrow-left me-2"></i> Go Back
      </Link>
      
      <FormContainer>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4ecdc4, #2c9e98)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem', boxShadow: '0 8px 24px rgba(78,205,196,0.3)',
          }}>
            <i className="fas fa-edit" style={{ color: '#0a0a1a', fontSize: '1.2rem' }}></i>
          </div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>Edit Product</h1>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Update product details and inventory
          </p>
        </div>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        
        {loading ? <Loader /> : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId='price' className="mb-3">
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId='countInStock' className="mb-3">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>

            <Form.Group controlId='image' className="mb-3">
              <Form.Label>Image URL or Upload</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mb-2"
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId='brand' className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId='category' className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>

            <Form.Group controlId='description' className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="w-100 py-2">
              <i className="fas fa-save me-2"></i> Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
