import { useReducer } from 'react';

import { AppRouter } from './app/router/AppRouter';

import { AuthContext } from './app/views/store/context/AuthContext';
import { authReducer } from './app/views/store/reducers/authReducer';

import './App.css';


const init = () => {
  let sessionUser: any = sessionStorage.getItem('user');
  let user: any;
  if (!sessionUser) {
    user = sessionUser;
  } else {
    user = JSON.parse(sessionUser);
  }
}
function App() {
  const [user, dispathUser] = useReducer(authReducer, {}, init);
  return (

    <AuthContext.Provider value={{ user, dispathUser }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
