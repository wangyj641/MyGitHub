import React from 'react'
import AsyncSelect from 'react-select/async'
import api from '@/lib/api'
import { useState, useCallback, useRef } from 'react'
import debounce from 'lodash/debounce'

export default function SearchUser({ onChange, value }) {
  console.log('---------------- SearchUser ----------------')
  console.log(value)

  const lastFetchIdRef = useRef(0)
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])

  const getOptions = () => {
    //console.log(option)
    return options
  };

  const fetchUser = useCallback(debounce((inputValue: string) => {
    console.log('---------------- fetchUser ----------------')
    lastFetchIdRef.current += 1
    const fetchId = lastFetchIdRef.current

    api.request({
      url: `/search/users?q=${inputValue}`,
    }).then(resp => {

      if (fetchId !== lastFetchIdRef.current) {
        // for fetch callback order
        return
      }

      const data = resp.data.items.map(user => ({
        value: user.login,
        label: user.login,
      }))

      console.log(data)
      options.length = 0
      //setOptions([])
      options.push(data[0])
      options.push(data[1])
      setOptions([...options])
      console.log(options)
    })
  }, 500), [])

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) return
    console.log('---------------- loadOptions ----------------', inputValue)
    fetchUser(inputValue)
    setTimeout(() => {
      callback(getOptions())
    }, 1000);
  }

  const handleChange = (newValue, actionMeta) => {
    console.log('---------------- handleChange ----------------')
    console.log(newValue)
    console.log(actionMeta)
    switch (actionMeta.action) {
      case 'select-option':
        //Todo:
        onChange(newValue.value)
        break
      default:
        console.log('default')
        break
    }
  }

  return (
    <AsyncSelect
      className='w-[200px]'
      cacheOptions

      loadOptions={loadOptions}
      onChange={handleChange}
      defaultOptions
    />)
}