import React from 'react';
import Image from 'next/image';

import styles from '../styles/components/Card.module.css';

const Card = ({ item }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={item.map_url}
          alt='map'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <p className={styles.infoLabel}>Ride Id : </p>{' '}
          <p className={styles.infoData}>{item.id}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoLabel}>Original Station : </p>{' '}
          <p className={styles.infoData}>{item.origin_station_code}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoLabel}>Station Path : </p>{' '}
          <p className={styles.infoData}>{item.station_path}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoLabel}>Date : </p>{' '}
          <p className={styles.infoData}>{item.date}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoLabel}>Distance : </p>{' '}
          <p className={styles.infoData}>{item.distance}</p>
        </div>
      </div>

      <div className={styles.badgeContainer}>
        <div className={styles.infoBadge} title={item.state}>
          {item.state}
        </div>
        <div className={styles.infoBadge} title={item.city}>
          {item.city}
        </div>
      </div>
    </div>
  );
};

export default Card;
