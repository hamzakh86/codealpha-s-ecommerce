import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  // Fonction pour obtenir l'URL complète de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    // Si l'image a déjà une URL complète (http:// ou https://)
    if (imagePath.startsWith('http')) return imagePath;
    // Si c'est un chemin relatif, ajoute l'URL du backend
    if (imagePath.startsWith('/uploads')) {
      return `https://codealpha-s-ecommerce.onrender.com${imagePath}`;
    }
    return imagePath;
  };

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={getImageUrl(product.image)} variant='top' />
      </Link>

      <Card.Body>
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

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
