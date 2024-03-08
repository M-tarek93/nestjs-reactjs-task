import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import constants from '../config/constants';

const Loading: React.FC = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: constants.PRIMARY_COLOR, zIndex: (theme) => theme.zIndex.drawer + 1, background: '#ffff' }}
        open={true}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default Loading;
