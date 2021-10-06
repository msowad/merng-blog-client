import React, { useContext, useState } from 'react';
import {
  Form,
  FormError,
  SubmitButton,
  useForm,
} from '../../components/useForm';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../context/auth';
import { LOGIN_USER } from '../../graphql/auth';

const initialFormData = {
  email: '',
  password: '',
};

const Login = ({ history }) => {
  const { handleChange, formData } = useForm(initialFormData);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = () => {
    setError(null);
    loginUser();
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      login(result.data?.login);
      history.push('/');
    },
    onError(err) {
      setError(err.message);
    },
    variables: formData,
  });

  return (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 shadow-md bg-gray-100 px-8 py-16 rounded-md'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <Form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm space-y-4'>
            <input
              name='email'
              type='email'
              className='input'
              placeholder='Email address'
              onChange={handleChange}
            />
            <input
              name='password'
              type='password'
              className='input'
              placeholder='Password'
              onChange={handleChange}
            />
          </div>
          <FormError error={error} />
          <SubmitButton full submit loading={loading} text='Sign in' />
        </Form>
      </div>
    </div>
  );
};

export default Login;
