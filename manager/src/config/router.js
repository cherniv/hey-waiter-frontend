import React from 'react';
import Account from '../components/Account'
import Home from '../components/Home'

export const ROUTES = [
  {
    path: "/",
    exact: true,
    main: Home,
  },
  {
    path: "/account",
    main: Account
  }
];

