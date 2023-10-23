import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/app';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Todo from './routes/todo';
import ErrorPage from './error-page';

/*
Root of react site 
- Imports Helment provider for the page head
- And App which defines the content and navigation
*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      {
        path: 'todo/:id',
        element: <Todo />
      }
    ]
  }
]);

// Render the site https://reactjs.org/docs/react-dom.html#render
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://vitejs.dev/guide/api-hmr.html
// Was causing strange reloading behaviour in WSL.
// if (import.meta.hot) {
//   import.meta.hot.accept();
// }
