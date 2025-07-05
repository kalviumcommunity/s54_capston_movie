import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Typography variant="h6" fontWeight="bold" fontSize="1.7rem">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{ color: '#ff1744' }}>Movie</span>
        <span style={{ color: '#ffeb3b' }}>-flex</span>
      </Link>
    </Typography>
  );
};

export default Logo;
