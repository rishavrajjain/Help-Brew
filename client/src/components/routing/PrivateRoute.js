import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  

  const token= localStorage.getItem('helpbrew-token')
  return (
    <Route
      {...rest}
      render={props =>
        !token ? (
          <Redirect to='/' {...props} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute