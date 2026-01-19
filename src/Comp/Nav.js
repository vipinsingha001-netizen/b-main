import React from 'react';

const Nav = () => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center' }}
      className="px-4 py-2 border-b border-gray-200"
    >
      <img src="/logo.png" alt="Logo" style={{ height: '30px', marginRight: '16px' }} />
    </div>
  );
}

export default Nav;