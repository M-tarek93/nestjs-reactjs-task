import React from 'react';
import { Box, Typography } from '@mui/material';
import constants from '../config/constants';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
      }}
    >
      <Typography variant='h1' style={{ color: constants.PRIMARY_COLOR }}>
        404
      </Typography>
    </Box>
  );
}

export default NotFound;