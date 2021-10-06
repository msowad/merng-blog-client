import React, { useContext } from 'react';
import {
  Form,
  FormError,
  SubmitButton,
  useForm,
} from '../../components/useForm';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../context/auth';
import { REGISTER_USER } from '../../graphql/auth';

const initialFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = ({ history }) => {
  const { handleChange, formData, error, setError } = useForm(initialFormData);
  const { login } = useContext(AuthContext);

  const handleSubmit = () => {
    setError(null);
    addUser();
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      login(result.data?.register);
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
            Create new account
          </h2>
        </div>
        <Form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm space-y-4'>
            <input
              name='username'
              className='mt-1 input'
              placeholder='Username'
              onChange={handleChange}
            />
            <input
              name='email'
              className='mt-1 input'
              placeholder='Email address'
              onChange={handleChange}
            />
            <input
              name='password'
              type='password'
              className='mt-1 input'
              placeholder='Password'
              onChange={handleChange}
            />
            <input
              name='confirmPassword'
              type='password'
              className='mt-1 input'
              placeholder='Confirm  Password'
              onChange={handleChange}
            />
          </div>
          <FormError error={error} />
          <SubmitButton full submit loading={loading} text='register' />
        </Form>
      </div>
    </div>
  );
};

export default Register;
