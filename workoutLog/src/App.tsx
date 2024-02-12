import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { useEffect, useState } from 'react';
import LoadingScreen from './components/loading-screen';
import router from './Router';
import { auth } from './firebase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  ::-webkit-scrollbar {
    display:none;
  }
`;

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    //파이어베이스 기다리기
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
