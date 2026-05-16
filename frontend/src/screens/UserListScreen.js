import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 18px rgba(168,85,247,0.35)',
        }}>
          <i className="fas fa-users" style={{ color: '#fff', fontSize: '1rem' }}></i>
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Users</h1>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            Manage all registered users
          </p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px', overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['User', 'Email', 'Role', 'Actions'].map((h) => (
                    <th key={h} style={{
                      padding: '0.9rem 1.2rem',
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: '0.72rem', textTransform: 'uppercase',
                      letterSpacing: '0.08em', fontWeight: 600, textAlign: 'left',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    transition: 'background 0.2s ease',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* User */}
                    <td style={{ padding: '0.85rem 1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.85rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 500, color: '#fff' }}>{user.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td style={{ padding: '0.85rem 1.2rem' }}>
                      <a href={`mailto:${user.email}`} style={{ color: '#4ecdc4', fontSize: '0.83rem' }}>
                        {user.email}
                      </a>
                    </td>

                    {/* Role */}
                    <td style={{ padding: '0.85rem 1.2rem' }}>
                      {user.isAdmin ? (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.2rem 0.75rem', borderRadius: '9999px',
                          background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.3)',
                          color: '#a855f7', fontSize: '0.75rem', fontWeight: 700,
                        }}>
                          <i className="fas fa-shield-alt"></i> Admin
                        </span>
                      ) : (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.2rem 0.75rem', borderRadius: '9999px',
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600,
                        }}>
                          <i className="fas fa-user"></i> User
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.85rem 1.2rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button style={{
                            background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.25)',
                            borderRadius: '8px', color: '#4ecdc4', fontSize: '0.78rem', padding: '0.3rem 0.75rem',
                          }}>
                            <i className="fas fa-edit me-1"></i> Edit
                          </Button>
                        </LinkContainer>
                        <Button
                          onClick={() => deleteHandler(user._id)}
                          style={{
                            background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.25)',
                            borderRadius: '8px', color: '#ff6b81', fontSize: '0.78rem', padding: '0.3rem 0.75rem',
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
      )}
    </>
  );
};

export default UserListScreen;
