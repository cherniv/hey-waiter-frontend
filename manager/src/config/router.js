import React from 'react';

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
    path: "/shoelaces",
    main: () => <h2>Shoelaces</h2>
  }
];

