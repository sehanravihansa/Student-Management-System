import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Student Management System</h1>
      <nav>
        <ul style={navStyle}>
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/view-students" style={linkStyle}>View All Students</Link></li>
          <li><Link to="/add" style={linkStyle}>Add Student</Link></li>
        </ul>
      </nav>
    </header>
  );
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  padding: 0
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '0.5rem 1rem'
};

export default Header;