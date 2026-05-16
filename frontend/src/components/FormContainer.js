import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center' style={{ marginTop: '3rem' }}>
        <Col xs={12} md={7} lg={5}>
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '22px',
              padding: '2.5rem 2rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.1)',
            }}
          >
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
