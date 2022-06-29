import { useEffect, useState } from 'react';
import Card from '../components/Card';
// import Select from '../components/Select';
import Main from '../layout/Main';
import styles from '../styles/Home.module.css';
import {
  getCities,
  getFilteredData,
  getNearestSortedArray,
  getStates,
} from '../utils';
import Select from 'react-select';

export default function Home({ data, user }) {
  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [sortedData, newSortedData] = useState([]);
  const [upComingRides, setUpComingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const { station_code } = user;

  // Needed City and State from Whole data
  useEffect(() => {
    setAllCities(
      getCities(data, selectedState).map((city) => ({
        value: city,
        label: city,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  useEffect(() => {
    setAllStates(
      getStates(data).map((state) => ({ value: state, label: state }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Needed SortedData from just the filtered data
  useEffect(() => {
    const sortedData = getNearestSortedArray(filteredData, station_code);
    newSortedData(sortedData);
    setUpComingRides(
      sortedData.filter((item) => new Date(item.date) >= new Date())
    );
    setPastRides(sortedData.filter((item) => new Date(item.date) < new Date()));
  }, [filteredData, station_code]);

  useEffect(() => {
    const filteredData = getFilteredData(data, selectedState, selectedCity);
    setFilteredData(filteredData);
  }, [data, selectedState, selectedCity]);

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
            <p>State</p>
            <Select
              name='State'
              onChange={(val) =>
                val === null
                  ? setSelectedState('')
                  : setSelectedState(val.value)
              }
              options={allStates}
              isClearable
              isSearchable
            />
            <p>City</p>
            <Select
              name='City'
              onChange={(val) =>
                val === null ? setSelectedCity('') : setSelectedCity(val.value)
              }
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
            return sortedData.length > 0 ? (
              sortedData.map((item) => {
                return <Card key={item.id} item={item} />;
              })
            ) : (
              <h3 className={styles.msg}>No Rides To Show :(</h3>
            );
          case 1:
            return upComingRides.length > 0 ? (
              upComingRides.map((item) => {
                return <Card key={item.id} item={item} />;
              })
            ) : (
              <h3 className={styles.msg}>No Upcoming Rides :(</h3>
            );
          case 2:
            return pastRides.length > 0 ? (
              pastRides.map((item) => {
                return <Card key={item.id} item={item} />;
              })
            ) : (
              <h3 className={styles.msg}>No Past Rides :(</h3>
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
