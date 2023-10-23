import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  const title = 'Unexpected Error';
  let h1 = 'Oops! Unexpected Error!';
  let explain = 'Something went wrong.';
  let message = '';

  if (isRouteErrorResponse(error)) {
    h1 = `Oops! ${error.status}!`;
    explain = error.statusText;
    if (error.data?.message != null) {
      message = error.data.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div id="error-page">
        <h1>{h1}</h1>
        <p>{explain}</p>
        {message !== '' && (
          <p>
            <i>{message}</i>
          </p>
        )}
        <Link to="/">Return Home</Link>
      </div>
    </HelmetProvider>
  );
}
