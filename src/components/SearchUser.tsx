import React from 'react';
import AsyncSelect from 'react-select/async';
import api from '@/lib/api'
import { useState, useCallback, useRef } from 'react';

export default function SearchUser() {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([{}]);

  const getOptions = () => {
    //console.log(option)
    return options
  };

  const searchUser = (inputValue: string) => {
    if (!inputValue) return
    console.log('---------------- filterColors3 ----------------')

    api.request({
      url: `/search/users?q=${inputValue}`,
    }).then(resp => {
      const data = resp.data.items.map(user => ({
        value: user.login,
        label: user.login,
      }))

      console.log(data)
      options.length = 0
      options.push(data[0])
      options.push(data[1])
      console.log(options)
    })
  }

  const loadOptions = (inputValue, callback) => {
    searchUser(inputValue)
    setTimeout(() => {
      callback(getOptions());
    }, 1000);
  };

  return (<AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />)
}