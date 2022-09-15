import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { loginAsync } from './loginSlice';
import styles from './Login.module.css';

export function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const dispatch = useAppDispatch();

  return (

    <div>
      <div className={styles.column}>
        <label >Username</label>
        <input className={styles.textInput} type="text" value={loginInfo.email} onChange={e => setLoginInfo({ ...loginInfo, email: e.target.value })} />
        <label >Password</label>
        <input className={styles.textInput} type="password" value={loginInfo.password} onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })} />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Login"
          onClick={() => {
            dispatch(loginAsync(loginInfo))
          }
          }
        >
          Login
        </button>

      </div>

    </div >
  );
}
