import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Main from '../layout/Main';
import styles from '../styles/Home.module.css';
import { getNearestSortedArray } from '../utils';

export default function Home({ data, user }) {
  const [activeTab, setActiveTab] = useState(0);
  const [sortedData, newSortedData] = useState([]);
  const { station_code } = user;
  useEffect(() => {
    newSortedData(getNearestSortedArray(data, station_code));
  }, [data, station_code]);

  const handleTabClick = (val) => {
    setActiveTab(val);
  };

  return (
    <Main user={user}>
      <div className={styles.filterContainer}>
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}
            onClick={() => handleTabClick(0)}
          >
            Nearest rides
          </div>
          <div
            className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}
            onClick={() => handleTabClick(1)}
          >
            Upcoming rides
          </div>
          <div
            className={`${styles.tab} ${activeTab === 2 ? styles.active : ''}`}
            onClick={() => handleTabClick(2)}
          >
            Past rides
          </div>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filter}>Filters</div>
        </div>
      </div>

      {(function () {
        switch (activeTab) {
          case 0:
            return sortedData.map((item) => {
              return <Card key={item.id} item={item} />;
            });
          case 1:
            return sortedData.map((item) => {
              return <Card key={item.id} item={item} />;
            });
          case 2:
            return sortedData.map((item) => {
              return <Card key={item.id} item={item} />;
            });
        }
      })()}
    </Main>
  );
}

export async function getServerSideProps() {
  const resUser = await fetch('https://assessment.api.vweb.app/user');
  const user = await resUser.json();
  const res = await fetch('https://assessment.api.vweb.app/rides');
  const data = await res.json();
  return { props: { user, data } };
}
