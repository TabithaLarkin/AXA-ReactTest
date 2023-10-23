import React from 'react';

/**
 * Show a loading spinner
 *
 * CSS provided under CC2 Licence
 * https://loading.io/css/
 */
export default function Loading() {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
