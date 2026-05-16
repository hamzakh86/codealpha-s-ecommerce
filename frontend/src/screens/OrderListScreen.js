import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const statusBadge = (active, trueVal, falseVal) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
    padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700,
    background: active ? 'rgba(78,205,196,0.1)' : 'rgba(255,107,107,0.1)',
    border: `1px solid ${active ? 'rgba(78,205,196,0.25)' : 'rgba(255,107,107,0.2)'}`,
    color: active ? '#4ecdc4' : '#ff6b81',
  }}>
    <i className={active ? 'fas fa-check' : 'fas fa-times'}></i>
    {active ? trueVal : falseVal}
  </span>
);

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 18px rgba(255,107,107,0.3)',
        }}>
          <i className="fas fa-receipt" style={{ color: '#fff', fontSize: '1rem' }}></i>
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem' }}>All Orders</h1>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            Manage and track customer orders
          </p>
        </div>
      </div>

      {loading ? <Loader /> : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px', overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Order ID', 'Customer', 'Date', 'Total', 'Paid', 'Delivered', ''].map((h) => (
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
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '0.85rem 1.1rem', color: '#4ecdc4', fontFamily: 'monospace', fontSize: '0.77rem' }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td style={{ padding: '0.85rem 1.1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.7rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>
                          {order.user && order.user.name ? order.user.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <span style={{ color: '#fff', fontWeight: 500 }}>{order.user && order.user.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1.1rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td style={{ padding: '0.85rem 1.1rem', color: '#ff6b6b', fontWeight: 700 }}>
                      ${order.totalPrice}
                    </td>
                    <td style={{ padding: '0.85rem 1.1rem' }}>
                      {order.isPaid ? statusBadge(true, order.paidAt.substring(0, 10), '') : statusBadge(false, '', 'Unpaid')}
                    </td>
                    <td style={{ padding: '0.85rem 1.1rem' }}>
                      {order.isDelivered ? statusBadge(true, order.deliveredAt.substring(0, 10), '') : statusBadge(false, '', 'Pending')}
                    </td>
                    <td style={{ padding: '0.85rem 1.1rem' }}>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px', color: '#fff',
                          fontSize: '0.77rem', padding: '0.3rem 0.75rem',
                        }}>
                          <i className="fas fa-eye me-1"></i> View
                        </Button>
                      </LinkContainer>
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

export default OrderListScreen;
