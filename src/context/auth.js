import { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = { user: null };

const localToken = localStorage.getItem('jwtToken');
if (localToken) {
  const decodedToken = jwtDecode(localToken);
  if (decodedToken.exp * 1000 < Date.now()) localStorage.removeItem('jwtToken');
  else initialState.user = decodedToken;
}

export const AuthContext = createContext(initialState);

const authReducer = (state, { payload: user, type }) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, user };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = user => {
    localStorage.setItem('jwtToken', user.token);
    dispatch({ type: 'LOGIN', payload: user });
  };
  const logout = () => {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
