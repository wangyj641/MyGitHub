import React from 'react';
import AsyncSelect from 'react-select/async';
import api from '@/lib/api'

const filterColors = (inputValue: string) => {
  return [
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
  ]
};

const filterColors2 = (inputValue: string) => {
  if (!inputValue) return []
  console.log('---------------- filterColors2 ----------------')
  let res = []

  api.request({
    url: `/search/users?q=${inputValue}`,
  }).then(resp => {

    const data = resp.data.items.map(user => ({
      value: user.login,
      label: user.login,
    }));
    console.log(data)
    res.push(data[0])
    res.push(data[1])
  })
  console.log(res)
  return res
};

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors2(inputValue));
  }, 5000);
};

export default function SearchUser() {
  return (<AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />)
}