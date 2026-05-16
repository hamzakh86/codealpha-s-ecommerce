import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <span style={{
                background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 800,
                fontSize: '1.5rem',
                letterSpacing: '-0.03em',
              }}>
                HK<span style={{ WebkitTextFillColor: 'rgba(255,255,255,0.6)' }}> Shop</span>
              </span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <div className="search-box-wrapper mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
              <SearchBox />
            </div>

            <Nav className='ms-auto align-items-center' style={{ gap: '0.25rem' }}>
              <LinkContainer to='/cart'>
                <Nav.Link style={{ position: 'relative' }}>
                  <i className='fas fa-shopping-bag me-1' style={{ color: '#ff6b6b' }}></i>
                  <span>Cart</span>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-user-circle me-1" style={{ color: '#4ecdc4' }}></i>
                      {userInfo.name}
                    </span>
                  }
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i className="fas fa-id-card me-2" style={{ color: '#4ecdc4' }}></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt me-2" style={{ color: '#ff6b6b' }}></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                      color: '#fff !important',
                      borderRadius: '8px',
                      padding: '0.4rem 1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(255,107,107,0.3)',
                    }}
                  >
                    <i className='fas fa-sign-in-alt me-1'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <span>
                      <i className="fas fa-shield-alt me-1" style={{ color: '#a855f7' }}></i>
                      Admin
                    </span>
                  }
                  id='adminmenu'
                >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>
                      <i className="fas fa-users me-2" style={{ color: '#a855f7' }}></i> Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>
                      <i className="fas fa-box me-2" style={{ color: '#4ecdc4' }}></i> Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>
                      <i className="fas fa-receipt me-2" style={{ color: '#ff6b6b' }}></i> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
