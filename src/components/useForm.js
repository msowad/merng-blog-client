import { Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import LoadingIcon from './LoadingIcon';

export const useForm = initialFormData => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => setFormData(initialFormData);

  return { handleChange, formData, error, resetForm, setError };
};

export const Form = ({ className, onSubmit, children }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form noValidate className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export const SubmitButton = ({
  loading,
  submit,
  text,
  type,
  small,
  full,
  color,
  onClick,
  children,
  className,
}) => {
  const buttonType = type || 'filled';
  const buttonColor = color || 'primary';

  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      className={`${loading ? 'bg-gray-300 cursor-default' : buttonColor} ${
        small ? 'py-1 text-xs' : 'py-2'
      } group ${
        full ? 'w-full' : ''
      } btn ${buttonType} justify-center relative ${
        className ? className : ''
      }`}
      disabled={loading}
    >
      {loading && <LoadingIcon className='absolute animate-spin w-5' />}
      <span
        className={`${loading ? 'opacity-0' : ''} ${small ? 'text-xs' : ''}`}
      >
        {text}
        {children}
      </span>
    </button>
  );
};

export const FormError = ({ error }) => {
  return (
    <Transition
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-90'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-90'
      show={error?.length > 0}
    >
      <div className='bg-red-100 shadow-md flex items-center border-red-500 px-4 py-2 border rounded text-red-500'>
        <ExclamationCircleIcon className='w-8 mr-2' />
        {error}
      </div>
    </Transition>
  );
};
