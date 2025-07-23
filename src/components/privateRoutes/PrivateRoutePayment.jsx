import React, { useEffect, useState, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const PrivateRoutePayment = ({ element }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasTariff, setHasTariff] = useState(false);
  const [hasPayed, setHasPayed] = useState(false); 
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const fetchUserData = async () => {

      if (!token) {
        setIsAuthorized(false); 
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:3000/me', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthorized(true);
            const userData = await response.json();
            setHasTariff(!!userData.tariff);
            setHasPayed(userData.hasPayed); 
            setIsAuthorized(true);
            setIsLoading(false);
            console.log(isLoading)
          } else {
            setIsAuthorized(false); 
            console.error('Не удалось получить данные пользователя');
          }
        }
      } catch (error) {
        setIsAuthorized(false); 
        console.error('Ошибка при получении данных пользователя:', error);
      } 
    };

    fetchUserData();
  }, []);

  const authenticated = isAuthenticated();

  if (isLoading) {
    return <div>Loading...</div>; 
  }
    if (!isAuthorized) {
      localStorage.clear();
      return <Navigate to="/" replace />;
    }

  if (authenticated && hasTariff && !hasPayed) {
    if (location.pathname === '/payment') {
      return element;
    }
    return <Navigate to="/payment" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoutePayment;
