import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useMutateUser from '../Hooks/useMutateUser';
import constants from '../config/constants';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import validator from 'validator';
import { useEffect } from 'react';
import useGetUser from '../Hooks/useGetUser';

type RegisterInputs = {
  name: string,
  email: string,
  password: string,
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();

  useEffect(() => {
    if (user) navigate('/');
  })

  const { mutate, isPending } = useMutateUser({
    endpoint: constants.REGISTER_API,
    options: {
      onSuccess: () => {
        toast('Successfully registered! you can login now', {
          onClose() {
            navigate('/login');
          },
          type: 'success',
        })
      },
      onError: (err: ErrorQuery) => {
        const message = err.response.data.message;
        toast(Array.isArray(message) ? message.join('\n') : message, { type: 'error' })
      }
    }
  })

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
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
        <Typography variant='h5'>Register</Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
                error={!!errors.name}
                {...register('name', {
                  required: 'Name is required',
                  maxLength: { value: 100, message: 'Name should be less than 100 characters' }
                })}
                helperText={errors?.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                error={!!errors.email}
                {...register('email', {
                  required: 'Email is required',
                  validate: (val) => validator.isEmail(val)
                })}
                helperText={errors?.email?.message || (errors.email?.type === 'validate' && 'Invalid email address')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Password'
                type='password'
                id='password'
                error={!!errors.password}
                {...register('password', {
                  required: 'Password is required',
                  validate: (val) => validator.isStrongPassword(val, { minLowercase: 0, minUppercase: 0 })
                })}
                helperText={
                  errors?.password?.message
                  || (errors.password?.type === 'validate' && 'Password should have at least 8 characters including 1 letter, 1 number, and 1 symbol')}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Register
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link style={{ color: constants.PRIMARY_COLOR, textDecoration: 'none' }} to='/login'>Already have an account? Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;