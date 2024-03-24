import React, { useState, useEffect } from 'react';
import Link from '../src/theme/mui-base-components/Link';
import Button from '@mui/material/Button';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      // Hide header on scroll down, show on scroll up
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);

      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      style={{
        position: 'fixed',
        top: showHeader ? '0' : '-100px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#333333',
        color: 'white',
        transition: 'top 0.3s',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>The Movie DB</h1>
      </div>
      <div>
        <Link href='/ui/landing'>
          <Button style={{ color: 'white', borderColor: 'white' }}>
            Landing
          </Button>
        </Link>
        <Link href='/ui/sign-in' color='secondary'>
          <Button style={{ color: 'white', borderColor: 'white' }}>
            Sign In
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
