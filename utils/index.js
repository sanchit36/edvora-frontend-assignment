const getNearestDistance = (arr, val) => {
  arr.sort((a, b) => a - b);
  let minIndex, maxIndex;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= val <= arr[i + 1]) {
      minIndex = i;
      maxIndex = i + 1;
      break;
    }
  }

  let d1 = Math.abs(arr[minIndex] - val);
  let d2 = Math.abs(arr[maxIndex] - val);
  return Math.min(d1, d2);
};

export const getNearestSortedArray = (data, val) => {
  const newData = data.map((item) => ({
    ...item,
    distance: getNearestDistance(item.station_path, val),
  }));
  newData.sort((a, b) => a.distance - b.distance);
  return newData;
};

export const getCities = (data, selectedState = '') => {
  let cities = [];
  if (selectedState === '') {
    cities = [...new Set(data.map((item) => item.city))];
    cities.sort();
  } else {
    cities = [
      ...new Set(
        data
          .filter((item) => item.state === selectedState)
          .map((item) => item.city)
      ),
    ];
  }
  return cities;
};

export const getStates = (data) => {
  const state = [...new Set(data.map((item) => item.state))];
  state.sort();
  return state;
};

export const getFilteredData = (data, state, city) => {
  let filteredData;
  if (state != '' && city != '') {
    // both state and city
    filteredData = data.filter(
      (item) => item.state === state && item.city === city
    );
  } else if (state != '') {
    // only state
    filteredData = data.filter((item) => item.state === state);
  } else if (city != '') {
    // only city
    filteredData = data.filter((item) => item.city === city);
  } else {
    filteredData = data;
  }
  return filteredData;
};
