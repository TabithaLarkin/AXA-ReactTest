import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <header className="header-nav">
        <h1>
          <Link to="/">Todos</Link>
        </h1>
      </header>
      <main id="detail">
        <Outlet />
      </main>
    </>
  );
}
