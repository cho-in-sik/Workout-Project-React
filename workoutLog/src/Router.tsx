import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './routes/home';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        // element:
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
