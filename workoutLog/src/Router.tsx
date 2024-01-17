import { createBrowserRouter } from 'react-router-dom';

import Home from './routes/home';
import ErrorComponent from './components/ErrorComponent';
import About from './routes/about';
import Login from './routes/login';
import Join from './routes/join';
import Layout from './components/Layout';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
    errorElement: <ErrorComponent />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorComponent />,
  },
  {
    path: '/join',
    element: <Join />,
    errorElement: <ErrorComponent />,
  },
]);

export default router;
