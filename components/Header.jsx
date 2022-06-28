import React from 'react';
import styles from '../styles/components/Header.module.css';
import Avatar from './Avatar';

const Header = ({ user }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Edvora</h1>
        <div className={styles.userContainer}>
          <h3 className={styles.username}>{user.name}</h3>
          <Avatar url={user.url} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
