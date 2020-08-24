import React, { useState, useEffect } from 'react'
import Client from '../../Contentful'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    Client.getEntries()
      .then(response => setData(response.items))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>Home</h1>
      {data.map(item => (
        <p key={item.fields.name}>{item.fields.name} <b>{item.fields.number}!</b></p>
      ))}
    </div>
  )
}

export default Home

// https://www.couteaux-ceccaldi.com/fr/