import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { XCircle } from 'lucide-react'; // Lucide wrong icon

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login to continue', {
        position: 'top-center', // 📌 Middle display
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: false,
        icon: <XCircle className="text-red-500" />, // ❌ Custom wrong icon
        style: {
          background: '#1f1f1f',
          color: '#fff',
          fontSize: '16px',
          borderRadius: '10px',
        },
      });
    }
    //pushed
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;