import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuthenticated, selectUserData } from 'redux/selectors';
import { logOutUser } from 'redux/auth/operations';
import { Suspense } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './SharedLayout.module.css';

const SharedLayout = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectUserAuthenticated);
  const userData = useSelector(selectUserData);

  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <>
      <header>
        <nav className={css.navHeader}>
          <NavLink to="/" className={css.navText}>
            Home
          </NavLink>

          {authenticated ? (
            <div className={css.wrapAuth}>
              <NavLink to="/contacts" className={css.navText}>
                Contacts
              </NavLink>
              <span className={css.navText}>Hi, {userData.name}</span>
              <button onClick={handleLogOut} className={css.navBtn}>
                Log Out
              </button>
            </div>
          ) : (
            <div className={css.wrapAuth}>
              <NavLink to="/register" className={css.navText}>
                Sign up
              </NavLink>
              <NavLink to="/login" className={css.navText}>
                Log In
              </NavLink>
            </div>
          )}
        </nav>
      </header>
      <Suspense fallback={<ThreeDots color="#4a346b" />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
