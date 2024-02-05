import { createBrowserRouter } from 'react-router-dom';

import Home from './routes/home';
import ErrorComponent from './components/ErrorComponent';
import About from './routes/about';
import Login from './routes/login';
import Join from './routes/join';
import Layout from './components/Layout';
import ProtectedRoute from './components/protected-route';
import Profile from './routes/profile';
import Record from './routes/record';
import Community from './routes/community';
import WorkoutBox from './components/Community/workoutBox';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'record',
        element: (
          <ProtectedRoute>
            <Record />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'community',
        element: <Community />,
      },
      {
        path: 'community/:recordId',
        element: (
          <ProtectedRoute>
            <WorkoutBox />
          </ProtectedRoute>
        ),
        errorElement: <ErrorComponent />,
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
