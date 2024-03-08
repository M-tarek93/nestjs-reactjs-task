import React, { useEffect } from 'react';
import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useGetUser from '../Hooks/useGetUser';
import appQueryClient from '../config/appQueryClient';
import Loading from './Loading';
import { Box } from '@mui/system';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: user, isPending, error } = useGetUser();
  console.log({ user, isPending, error });

  const handleLogout = async () => {
    localStorage.removeItem('token');
    appQueryClient.removeQueries({ queryKey: ['user'] })
    navigate('/login');
  };

  useEffect(() => {
    if ((!user && !isPending) || error) navigate('/login')
  })

  return isPending || !user || error
    ? <Loading />
    : (
      <div className={styles.homeContainer}>
        <Container maxWidth='sm' sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant='h4' gutterBottom>
              Hi {user.name}!
            </Typography>

            <Divider />

            <Typography variant='h5' className='my-3'>
              Profile Data
            </Typography>

            <Box className='px-4'>
              <Box sx={{ mb: 3 }}>
                <Typography variant='h6'>Name:</Typography>
                <Typography variant='body1'>{user?.name}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant='h6'>Email:</Typography>
                <Typography variant='body1'>{user?.email}</Typography>
              </Box>
            </Box>

            <Button
              variant='contained'
              color='primary'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Paper>
        </Container>
      </div>
    );
};

export default Home;