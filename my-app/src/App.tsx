import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {
  selectUserLoginInfo
} from './features/login/loginSlice';
import { Login } from './features/login/Login';
import { Movie } from './features/movie/Movie';
import { useAppSelector } from './hooks/hooks';
function App() {
  const userLoginStore = useAppSelector(selectUserLoginInfo);
  return (
    <div className="App">
      {userLoginStore?.loginInfo?.email === '' ?
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Login />

        </header> :
        <Movie />}

    </div>
  );
}

export default App;
