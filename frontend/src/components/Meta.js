import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To HK Shop',
  description: 'Shop the best sportswear and accessories for your active lifestyle.',
  keywords: 'sportswear, clothing, shoes, fitness, running, training, HK Shop',
};

export default Meta;