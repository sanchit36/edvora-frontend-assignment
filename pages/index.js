import { useEffect, useState } from 'react';
import Card from '../components/Card';
// import Select from '../components/Select';
import Main from '../layout/Main';
import styles from '../styles/Home.module.css';
import { getCities, getNearestSortedArray, getStates } from '../utils';
import Select from 'react-select';

export default function Home({ data, user }) {
  const [activeTab, setActiveTab] = useState(0);
  const [sortedData, newSortedData] = useState([]);
  const [upComingRides, setUpComingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { station_code } = user;

  useEffect(() => {
    setAllCities(getCities(data).map((city) => ({ value: city, label: city })));
    setAllStates(
      getStates(data).map((state) => ({ value: state, label: state }))
    );
  }, [data]);

  useEffect(() => {
    const sortedData = getNearestSortedArray(data, station_code);
    newSortedData(sortedData);
    setUpComingRides(
      sortedData.filter((item) => new Date(item.date) >= new Date())
    );
    setPastRides(sortedData.filter((item) => new Date(item.date) < new Date()));
  }, [data, station_code]);

  const handleTabClick = (val) => {
    setActiveTab(val);
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
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
            Upcoming rides ({upComingRides.length})
          </div>
          <div
            className={`${styles.tab} ${activeTab === 2 ? styles.active : ''}`}
            onClick={() => handleTabClick(2)}
          >
            Past rides ({pastRides.length})
          </div>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filter} onClick={toggleFilter}>
            Filters
          </div>

          <div
            className={`${styles.filterWrapper} ${
              isFilterOpen ? styles.activeFilter : ''
            }`}
          >
            <h4>Filters</h4>
            <span></span>
            <Select
              name='State'
              onChange={(val) => {
                console.log(val);
              }}
              options={allStates}
              isClearable
              isSearchable
            />
            <br />
            <Select
              name='City'
              onChange={(val) => {
                console.log(val);
              }}
              options={allCities}
              isClearable
              isSearchable
            />
          </div>
        </div>
      </div>

      {(function () {
        switch (activeTab) {
          case 0:
            return sortedData.map((item) => {
              return <Card key={item.id} item={item} />;
            });
          case 1:
            return upComingRides.length > 0 ? (
              upComingRides.map((item) => {
                return <Card key={item.id} item={item} />;
              })
            ) : (
              <h3>No Upcoming Rides :(</h3>
            );
          case 2:
            return pastRides.length > 0 ? (
              pastRides.map((item) => {
                return <Card key={item.id} item={item} />;
              })
            ) : (
              <h3>No Past Rides :(</h3>
            );
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
