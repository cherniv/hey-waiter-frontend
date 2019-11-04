import Account from '../components/Account'
import Home from '../components/Home'

export const ROUTES = [
  {
    path: "/manager/",
    exact: true,
    main: Home,
  },
  {
    path: "/manager/account",
    main: Account,
    exact: true,
  }
];

