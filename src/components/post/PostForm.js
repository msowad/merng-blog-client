import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Form, FormError, SubmitButton, useForm } from '../useForm';
import { useMutation } from '@apollo/client';
import { ADD_POST, GET_POSTS } from '../../graphql/post';

const initialState = { title: '', body: '' };

const PostForm = ({ open, setOpen }) => {
  const { formData, handleChange, error, setError } = useForm(initialState);
  const titleRef = useRef(null);

  const [addPost, { loading }] = useMutation(ADD_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({ query: GET_POSTS });
      const posts = [result.data.createPost, ...data.posts];
      proxy.writeQuery({ query: GET_POSTS, data: { posts } });
      setOpen(false);
    },
    onError(err) {
      setError(err.message);
    },
    variables: formData,
  });

  const handleSubmit = () => {
    addPost();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={setOpen}
        initialFocus={titleRef}
      >
        <div
          className='flex min-h-screen text-center md:block md:px-2 lg:px-4'
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden md:inline-block md:align-middle md:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            enterTo='opacity-100 translate-y-0 md:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 md:scale-100'
            leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
          >
            <div className='flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl'>
              <div className='w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-md'>
                <button
                  type='button'
                  className='absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
                  onClick={() => setOpen(false)}
                >
                  <span className='sr-only'>Close</span>
                  <XIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                <div className='w-full mt-5'>
                  <Form onSubmit={handleSubmit}>
                    <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                      <h5 className='text-2xl font-bold text-gray-800 capitalize'>
                        Add your post
                      </h5>
                      <div>
                        <label
                          htmlFor='title'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Title
                        </label>
                        <input
                          ref={titleRef}
                          name='title'
                          className='mt-1 input'
                          placeholder='Title'
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='body'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Body
                        </label>
                        <textarea
                          name='body'
                          className='mt-1 input'
                          placeholder='Body'
                          rows={4}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='px-4 py-3 bg-gray-50 text-right sm:px-6 space-y-4'>
                      <FormError error={error} />
                      <SubmitButton full submit loading={loading} text='Add' />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PostForm;
