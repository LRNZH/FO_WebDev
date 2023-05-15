import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags`
      axios
        .get(url)
        .then(response => {
          const data = response.data[0]
          const found = response.status === 200 ? true : false
          setCountry({ found, data })
        })
        .catch(error => {
          console.log(error)
          setCountry({ found: false, data: null })
        })
    }
  }, [name])

  return country
}


const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const { name, capital, population, flags } = country.data;

  return (
    <div>
      <h3>{name.common}</h3>
      <div>capital {capital[0]}</div>
      <div>population {population.toLocaleString()}</div>
      <img src={flags.svg} height='100' alt={`flag of ${name.common}`} />
    </div>
  )
}


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App