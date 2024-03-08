import { LockOutlined } from '@mui/icons-material';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useMutateUser from '../Hooks/useMutateUser';
import { toast } from 'react-toastify';
import constants from '../config/constants';
import validator from 'validator';
import useGetUser from '../Hooks/useGetUser';
import { useEffect } from 'react';

type LoginInputs = {
  email: string,
  password: string,
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();

  useEffect(() => {
    if (user) navigate('/');
  })

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();

  const { mutate, isPending: loginIsPending } = useMutateUser({
    endpoint: constants.LOGIN_API,
    options: {
      onSuccess: async ({ data }: any) => {
        const token = data?.access_token;
        localStorage.setItem('token', token);

        toast('Successfully logged in!', {
          onClose() {
            navigate('/');
          },
          type: 'success',
          autoClose: 500
        });
      },
      onError: (err: ErrorQuery) => {
        const errorsMapByCode = {
          401: 'Invalid credentials',
          429: 'Too many trials. Please try again shortly'
        }
        const code = err.response?.data?.statusCode
        const message = errorsMapByCode[code] || err.response?.data?.message;
        toast(Array.isArray(message) ? message.join('\n') : message, { type: 'error' })
      }
    }
  })

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    mutate(data);
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5'>Login</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoFocus
            error={!!errors.email}
            {...register('email', {
              required: 'Email is required',
              validate: (val) => validator.isEmail(val)
            })}
            helperText={errors?.email?.message || (errors.email?.type === 'validate' && 'Invalid email address')}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            type='password'
            {...register('password', {
              required: 'Password is required',
            })}
          />

          <Button
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
            disabled={loginIsPending}
          >
            Login
          </Button>
          <Grid container justifyContent={'center'}>
            <Grid item>
              <Link style={{ color: constants.PRIMARY_COLOR, textDecoration: 'none' }} to='/register'>Don't have an account? Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;