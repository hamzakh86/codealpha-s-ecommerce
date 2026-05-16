import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="align-items-center py-2">
          <Col xs={12} md={4} className="text-center text-md-start mb-2 mb-md-0">
            <span style={{
              background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 800,
              fontSize: '1.1rem',
            }}>
              HK Shop
            </span>
          </Col>
          <Col xs={12} md={4} className="text-center mb-2 mb-md-0">
            <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.82rem' }}>
              © {new Date().getFullYear()} HK Shop. All rights reserved.
            </span>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-end">
            <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-dim)' }}>
              Made with <span style={{ color: '#ff6b6b' }}>♥</span> for great shopping
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
