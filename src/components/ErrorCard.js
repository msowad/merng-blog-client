import { ExclamationCircleIcon, RefreshIcon } from '@heroicons/react/solid';
import React from 'react';

const ErrorCard = ({ refetch, text, children }) => {
  return (
    <div className='w-full'>
      <div className='max-w-md bg-white px-4 py-8 rounded-lg mx-auto text-center space-y-2'>
        <ExclamationCircleIcon className='mx-auto w-16 text-red-500' />
        <p className='text-xl font-semibold capitalize'>
          {text || 'An Error Occurred'}
        </p>
        {refetch && (
          <button
            onClick={() => refetch()}
            title='Reload'
            className='btn primary outline py-2'
          >
            <RefreshIcon className='w-5 mr-1' />
            Refresh
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ErrorCard;
