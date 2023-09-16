import React from 'react';
import css from './RegisterPage.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/auth/operations';

const LoginPage = () => {

  const emailInputId = nanoid(10);
  const passwordInputId = nanoid(10);

  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();

    const email = evt.currentTarget.elements.email.value;
    const password = evt.currentTarget.elements.password.value;

    const dataUser = {
      email,
      password,
    };
    
    dispatch(loginUser(dataUser));
  };

  return (
    <div className={css.wrapForm}>
      <h1 className={css.heading}>Login</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label htmlFor={emailInputId} className={css.label}>
          Email
        </label>
        <input
          className={css.input}
          id={emailInputId}
          type="email"
          name="email"
          pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
          title="Email must contain letters, numbers, special symbols and necessarily @-symbol"
          required
        />
        <label htmlFor={passwordInputId} className={css.label}>
          Password
        </label>
        <input
          className={css.input}
          id={passwordInputId}
          type="password"
          name="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{9,16}$"
          title="Password must contain at least one lowercase letter, at least one uppercase letter, at least one numeric value. Can not contain dash and spaces and another special symbols."
          required
        />
        <button type="submit" className={css.btn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
