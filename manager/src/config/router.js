import React from 'react';
import Account from '../components/Account'

export const ROUTES = [
  {
    path: "/",
    exact: true,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/account",
    main: Account
  }
];

