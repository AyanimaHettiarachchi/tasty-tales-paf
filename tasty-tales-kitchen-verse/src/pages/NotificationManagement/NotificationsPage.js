import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './notification.css'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineMarkChatRead } from "react-icons/md";
import PageLayout from '../../Components/Layout/PageLayout';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userID');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) {
        setError('User ID is not available');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8080/notifications/${userId}`);
        setNotifications(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    // Set up auto-refresh interval
    const refreshInterval = setInterval(fetchNotifications, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:8080/notifications/${id}/markAsRead`);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true, justMarked: true } : n)
      );
      // Remove "just marked" indicator after animation
      setTimeout(() => {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, justMarked: false } : n)
        );
      }, 1000);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      alert('Failed to mark notification as read');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/notifications/${id}`);
      setNotifications(prev => {
        const updated = prev.filter(n => n.id !== id);
        if (updated.length === 0) {
          // Trigger immediate UI update for empty state
          return [];
        }
        return updated;
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('Failed to delete notification');
    }
  };

  return (
    <PageLayout>
      <div className='continSection'>
        <div className='post_card_continer'>
          {isLoading ? (
            <div className='loading_box'>
              <p>Loading notifications...</p>
            </div>
          ) : error ? (
            <div className='error_box'>
              <p>{error}</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className='not_found_box'>
              <div className='not_found_img'></div>
              <p className='not_found_msg'>No notifications found.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`post_card ${notification.read ? 'read' : 'unread'} ${notification.justMarked ? 'just-marked' : ''}`}
                style={{ 
                  opacity: notification.read ? 0.8 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                <div className='continer_set'>
                  <p className='noty_topic'>{notification.message}</p>
                  <p className='noty_time'>{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
                <div className='noty_action_btn_con'>
                  {!notification.read && (
                    <MdOutlineMarkChatRead 
                      onClick={() => handleMarkAsRead(notification.id)}
                      className='action_btn_icon'
                      style={{ color: '#047857' }}
                    />
                  )}
                  <RiDeleteBin6Fill
                    onClick={() => handleDelete(notification.id)}
                    className='action_btn_icon'
                    style={{ color: '#ff4444' }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default NotificationsPage;
