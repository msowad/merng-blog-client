/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const navigation = [{ name: 'Home', href: '/' }];
const userNavigation = [];
const authNavigation = [
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const logoutAndClose = close => {
    logout();
    close();
  };

  const mobileNavigation = () => {
    const authNav = user ? [] : authNavigation;
    return [...navigation, ...authNav];
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open, close }) => (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                    alt='Workflow'
                  />
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map(item => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition'
                        activeClassName='bg-gray-900 text-white'
                        exact
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className='hidden md:block'>
                {user ? (
                  <div className='ml-4 flex items-center md:ml-6'>
                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-3 relative'>
                      <div>
                        <Menu.Button className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='h-8 w-8 rounded-full'
                            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                            alt=''
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {userNavigation.map(item => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <NavLink
                                  to={item.href}
                                  className='block px-4 py-2 text-sm text-gray-700'
                                  activeClassName='bg-gray-100'
                                  exact
                                >
                                  {item.name}
                                </NavLink>
                              )}
                            </Menu.Item>
                          ))}
                          <button
                            onClick={logout}
                            className='block w-full text-left px-4 py-2 text-sm text-gray-700'
                          >
                            Sign out
                          </button>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div className='space-x-4'>
                    {authNavigation.map(item => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition'
                        activeClassName='bg-gray-900 text-white'
                        exact
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <div className='md:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                {mobileNavigation().map(item => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition'
                    activeClassName='bg-gray-900 text-white'
                    exact
                    onClick={close}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              {user && (
                <div className='pt-4 pb-3 border-t border-gray-700'>
                  <div className='flex items-center px-5'>
                    <div className='flex-shrink-0'>
                      <img
                        className='h-10 w-10 rounded-full'
                        src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                        alt='Avatar'
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium leading-none text-white'>
                        {user.username}
                      </div>
                      <div className='text-sm font-medium leading-none text-gray-400'>
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className='mt-3 px-2 space-y-1'>
                    {userNavigation.map(item => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 transition'
                        activeClassName='bg-gray-900 text-white'
                        exact
                        onClick={close}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    <button
                      className='w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 transition'
                      onClick={() => logoutAndClose(close)}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
