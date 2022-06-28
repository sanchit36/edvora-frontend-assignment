import Image from 'next/image';
import React from 'react';
import styles from '../styles/components/Avatar.module.css';

const Avatar = ({ url }) => {
  return (
    <div className={styles.Avatar}>
      <Image src={url} alt='avatar' height='45' width='45' />{' '}
    </div>
  );
};

export default Avatar;
