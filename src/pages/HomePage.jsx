import React from 'react';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.home}>
      <div className={css.homeWrap}>
        <img src='https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-phone-book-icon-design-vector-png-image_1714562.jpg' alt="Phonebook" width={450} className={css.image} />
        <h1 className={css.homeText}>Phone book</h1>
      </div>
    </div>
  );
};

export default HomePage;
