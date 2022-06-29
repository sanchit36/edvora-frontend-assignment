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

export const getCities = (data) => {
  const cities = [...new Set(data.map((item) => item.city))];
  cities.sort();
  return cities;
};

export const getStates = (data) => {
  const state = [...new Set(data.map((item) => item.state))];
  state.sort();
  return state;
};

/*
api url: https://assessment.api.vweb.app/rides

Ride: [
  {
    id: 001,
    origin_station_code: 23,
    station_path: [23, 42, 45, 48, 56, 60, 77, 81, 93],
    destination_station_code: 93,
    date: 1644924365,
    map_url: "url",
    state: Maharashtra,
    city: Panvel
  },
  {
    id: 002,
    origin_station_code: 20,
    station_path: [20, 39, 40, 42, 54, 63, 72, 88, 98],
    destination_station_code: 98,
    date: 1644924365,
    map_url: "url",
    state: Maharashtra,
    city: Panvel
  },
  {
    id: 003,
    origin_station_code: 13,
    station_path: [13, 25, 41, 48, 59, 64, 75, 81, 91],
    destination_station_code: 91,
    date: 1644924365,
    map_url: "url",
    state: Maharashtra,
    city: Panvel
  },
]

https://assessment.api.vweb.app/user
user:  {
    station_code: 40,
    name: "Dhruv Singh",
    profile_key: “url”,
 }
Nearest ride: A nearest ride is a ride that includes your station code or a number closest to your station code in the station_path array.For example, your station code is 40. So any ride that has your station code as nearest number in station_path array.

That would be  id 002 the most nearest as it has your station code 40 in the station_path array.
Then id 003 has 41 from station_path array is nearest to your station code 40.

Then id 001 has 42 from station_path array nearest to your station code 40. Hence it would be 002 > 003 > 001.
Please note: You cannot use the same ride twiceDistance : Nearest station for your ride is your station code.
Example:For id 002, your station code is 40 and your ride also stops at your station so the distance is 40-40 = 0for id 001, your station code is 40 and your ride stops at station 42, so the distance is 42-40 = 2

*/
