import React from 'react';
import css from './RegisterPage.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/auth/operations';

const RegisterPage = () => {
  const nameInputId = nanoid(10);
  const emailInputId = nanoid(10);
  const passwordInputId = nanoid(10);
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();

    const name = evt.currentTarget.elements.name.value;
    const email = evt.currentTarget.elements.email.value;
    const password = evt.currentTarget.elements.password.value;

    const dataUser = {
      name,
      email,
      password,
    };
    dispatch(registerUser(dataUser));
  };

  return (
    <div className={css.wrapForm}>
      <h1 className={css.heading}>Registration</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label htmlFor={nameInputId} className={css.label}>
          Name
        </label>
        <input
          className={css.input}
          id={nameInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={emailInputId} className={css.label}>
          Email
        </label>
        <input
          className={css.input}
          id={emailInputId}
          type="email"
          name="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
