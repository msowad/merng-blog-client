import React from 'react';
import Posts from './components/post/Posts';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './context/auth';
import GuestRoute from './components/GuestRoute';
import Login from './components/login/Login';
import Register from './components/register/Register';
import SinglePostPage from './components/post/SinglePostPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <main>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
              <Route exact path='/' component={Posts} />
              <Route exact path='/posts/:postId' component={SinglePostPage} />
              <GuestRoute exact path='/login' component={Login} />
              <GuestRoute exact path='/register' component={Register} />
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
