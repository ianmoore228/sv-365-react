import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteSupport = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);


  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token'); 
      const role = localStorage.getItem('urole');

      if (!token || !role) {
        setIsAuthorized(false); 
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/check-auth', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        if (response.ok) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false); 
        }
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
        setIsAuthorized(true);
      }
    };

    checkAuthorization();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>; 
  }

if (!isAuthorized) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRouteSupport;
